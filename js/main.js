gsap.registerPlugin(ScrollTrigger);

// Main variables
const world = document.getElementById("world");
const scenes = document.querySelectorAll(".scene");
const progressBar = document.querySelector(".progress-bar");
const body = document.body;

// Calculate total Z depth based on the last scene's data-z
const lastScene = scenes[scenes.length - 1];
const maxZ = Math.abs(parseInt(lastScene.getAttribute('data-z')));
const viewportDepth = 2000; // arbitrary extra space at the end

// Configure scroll container height based on depth
// 1 pixel of scroll = 2 pixels of Z depth (adjust for speed)
const scrollMultiplier = 2;
const totalScrollHeight = maxZ / scrollMultiplier + viewportDepth;
document.querySelector(".scroll-container").style.height = `${totalScrollHeight}px`;

// Create the main timeline tied to the scroll proxy
const masterTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
            // Update progress bar
            progressBar.style.width = `${self.progress * 100}%`;
            
            // Check progress to update background colors for specific project worlds
            // Roughly mapping progress to sections
            if (self.progress > 0.25 && self.progress < 0.38) {
                body.style.backgroundColor = "var(--accent-clinic)";
                body.style.transition = "background-color 1s ease";
            } else if (self.progress > 0.40 && self.progress < 0.52) {
                body.style.backgroundColor = "var(--accent-boutique)";
            } else if (self.progress > 0.55 && self.progress < 0.68) {
                body.style.backgroundColor = "var(--accent-library)";
            } else {
                body.style.backgroundColor = "var(--bg-main)";
            }
        }
    }
});

// Setup initial positions for all scenes
scenes.forEach((scene) => {
    const z = parseInt(scene.getAttribute('data-z')) || 0;
    const x = parseInt(scene.getAttribute('data-x')) || 0;
    const y = parseInt(scene.getAttribute('data-y')) || 0;
    
    gsap.set(scene, {
        z: z,
        x: `calc(-50% + ${x}px)`,
        y: `calc(-50% + ${y}px)`
    });
});

// The core camera movement: move the 'world' container FORWARD along the Z axis
// To move "into" the world, the world moves towards the camera (positive Z)
masterTl.to(world, {
    z: maxZ + viewportDepth/2, // Move past the last item
    ease: "none"
}, 0);

// Add lateral camera movements (simulated by moving the world opposite to the scene's X/Y)
scenes.forEach((scene) => {
    const targetX = parseInt(scene.getAttribute('data-x')) || 0;
    const targetY = parseInt(scene.getAttribute('data-y')) || 0;
    const sceneZ = Math.abs(parseInt(scene.getAttribute('data-z'))) || 0;
    
    // If the scene is offset in X or Y, we want to shift the world to center it
    // when the camera is approaching that Z depth.
    if (targetX !== 0 || targetY !== 0) {
        // Calculate when in the timeline this happens based on Z position
        const timeRatio = sceneZ / (maxZ + viewportDepth/2);
        
        masterTl.to(world, {
            x: `calc(-50% - ${targetX}px)`,
            y: `calc(-50% - ${targetY}px)`,
            duration: 0.1, // length of lateral transition
            ease: "power1.inOut"
        }, timeRatio - 0.05); // start shifting slightly before arriving
    }
});

// Specific Scene Animations based on Scroll Position (Parallax & Depth Effects)

// 1. Hero Lottie Zoom
gsap.to("lottie-player", {
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "10% top",
        scrub: 1
    },
    scale: 15,
    opacity: 0,
    ease: "power1.in"
});

gsap.to(".float-el", {
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "10% top",
        scrub: 1
    },
    z: 500, // Move past the camera
    opacity: 0,
    stagger: 0.1
});

// 2. Skills Panels Parallax
gsap.to(".skill-panel", {
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "15% top",
        end: "25% top",
        scrub: 1
    },
    z: "+=400", // Panels float towards the camera
    rotateX: "random(-10, 10)",
    rotateY: "random(-10, 10)",
    stagger: 0.05
});

// 3. Deconstructed Website Layers
const layers = document.querySelectorAll(".layer");
layers.forEach((layer, index) => {
    gsap.to(layer, {
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "68% top",
            end: "75% top",
            scrub: true
        },
        z: index * 200, // Expand the layers on Z axis
        opacity: 1 - (index * 0.1), // slightly fade back layers
        ease: "none"
    });
});

// Add subtle continuous floating animation to elements in Hero and Skills
gsap.utils.toArray('.float-el, .skill-panel').forEach(el => {
    gsap.to(el, {
        y: "+=20",
        rotation: "+=2",
        duration: "random(2, 4)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
});
