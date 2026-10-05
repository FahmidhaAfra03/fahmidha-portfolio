// script.js — Cinematic Scroll Journey (GertiX Inspired Interaction)
gsap.registerPlugin(ScrollTrigger);

// --- INITIAL LOAD ANIMATION ---
const initTl = gsap.timeline();
initTl.fromTo("#hero-content", 
    { opacity: 0, x: -50 }, 
    { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
)
.fromTo("#portal-screen", 
    { opacity: 0, scale: 0.9, rotationY: 10 }, 
    { opacity: 1, scale: 1, rotationY: -5, duration: 2, ease: "power3.out" }, 
    "-=1"
);

// --- HERO PARALLAX ON MOUSEMOVE (Active only near the top) ---
const heroPortal = document.getElementById("hero-portal");
const portalScreen = document.getElementById("portal-screen");

if (heroPortal && portalScreen) {
    document.addEventListener("mousemove", (e) => {
        if (window.scrollY < 200) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to(portalScreen, {
                rotationY: -5 + (x * 8),
                rotationX: (y * -8),
                duration: 0.8,
                ease: "power2.out"
            });
        }
    });
}

// --- HUD HELPERS FOR SEQUENTIAL STORYTELLING ---
const hudDot1 = document.getElementById("hud-dot-1");
const hudDot2 = document.getElementById("hud-dot-2");
const hudDot3 = document.getElementById("hud-dot-3");
const hudLabel1 = document.getElementById("hud-label-1");
const hudLabel2 = document.getElementById("hud-label-2");
const hudLabel3 = document.getElementById("hud-label-3");

function setHudActive(activeNum) {
    const dots = [hudDot1, hudDot2, hudDot3];
    const labels = [hudLabel1, hudLabel2, hudLabel3];
    const colors = ["#2dd4bf", "#f43f5e", "#38bdf8"];
    
    dots.forEach((dot, idx) => {
        if (!dot) return;
        if (idx + 1 === activeNum) {
            dot.style.backgroundColor = colors[idx];
            dot.style.transform = "scale(1.4)";
            dot.style.boxShadow = `0 0 10px ${colors[idx]}`;
            if (labels[idx]) {
                labels[idx].classList.remove("text-muted");
                labels[idx].classList.add("text-white");
            }
        } else {
            dot.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = "none";
            if (labels[idx]) {
                labels[idx].classList.remove("text-white");
                labels[idx].classList.add("text-muted");
            }
        }
    });
}

// --- MASTER 3D CINEMATIC SCROLL TIMELINE ---
const scrollProxy = document.getElementById("scroll-proxy");

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#scroll-proxy",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4, // Agency-grade smooth floating scrub
        onUpdate: (self) => {
            const p = self.progress;
            
            // HUD visibility & active project state management
            const hud = document.getElementById("project-hud");
            if (hud) {
                if (p > 0.14 && p < 0.88) {
                    hud.classList.remove("opacity-0", "translate-y-4");
                    hud.classList.add("opacity-100", "translate-y-0");
                } else {
                    hud.classList.add("opacity-0", "translate-y-4");
                    hud.classList.remove("opacity-100", "translate-y-0");
                }
            }

            if (p >= 0.14 && p < 0.41) {
                setHudActive(1);
            } else if (p >= 0.41 && p < 0.66) {
                setHudActive(2);
            } else if (p >= 0.66 && p < 0.89) {
                setHudActive(3);
            } else {
                setHudActive(0);
            }
        }
    }
});

// Initial Setup
gsap.set(["#scene-proj-1", "#scene-proj-2", "#scene-proj-3", "#scene-contact"], { opacity: 0 });

// Responsive Timeline using matchMedia
const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // ==========================================
    // DESKTOP: FULL 3D CAMERA DEPTH EXPERIENCE
    // ==========================================

    // 1. HERO PORTAL PLUNGE (0 -> 5s)
    tl.to("#hero-content", { opacity: 0, x: -100, duration: 2, ease: "power2.inOut" }, 0)
      .to("#scene-hero", { 
          z: 1100, // Move into camera lens past perspective threshold
          x: () => {
              const portal = document.getElementById("portal-screen");
              if (!portal) return 0;
              const rect = portal.getBoundingClientRect();
              const targetX = rect.left + rect.width / 2;
              return (window.innerWidth / 2) - targetX;
          },
          y: () => {
              const portal = document.getElementById("portal-screen");
              if (!portal) return 0;
              const rect = portal.getBoundingClientRect();
              const targetY = rect.top + rect.height * 0.45;
              return (window.innerHeight / 2) - targetY;
          },
          rotationY: 5,
          duration: 4.5, 
          ease: "power2.in" 
      }, 0)
      .to("#scene-hero", { opacity: 0, duration: 0.8 }, 3.7)
      
      // Ambient glow transition to Teal
      .to("#bg-glow-teal", { opacity: 0.9, duration: 2 }, 3.5);

    // ----------------------------------------------------
    // 2. PROJECT 01 — PROACTIVE PHYSIOTHERAPY (4.5s -> 15s)
    // ----------------------------------------------------
    // Entry from depth
    tl.fromTo("#scene-proj-1", 
        { opacity: 0, z: -700, scale: 0.75 }, 
        { opacity: 1, z: 0, scale: 1.0, duration: 3, ease: "power2.out" }, 
        4.5
    )
    .fromTo("#proj-1-num", { opacity: 0, y: -40 }, { opacity: 0.04, y: 0, duration: 2 }, 5.2)
    .fromTo("#proj-1-text", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 2.2, ease: "power2.out" }, 5.5)
    
    // As user continues scrolling: camera moves closer, subtle scale/zoom, floating 3D drift
    .to("#proj-1-visual", { z: 120, scale: 1.08, duration: 3.5, ease: "none" }, 7.5)
    .fromTo("#proj-1-float-1", { z: 40, opacity: 0 }, { z: 180, opacity: 1, duration: 2.5, ease: "power2.out" }, 6.5)
    .fromTo("#proj-1-float-2", { z: 40, opacity: 0 }, { z: 140, opacity: 1, duration: 2.5, ease: "power2.out" }, 7.0)
    
    // Hold / Reading beat
    .to({}, { duration: 1.5 })

    // Zoom transition out: visual surges forward past camera
    .to("#proj-1-visual", { z: 1250, scale: 2.4, opacity: 0, duration: 3.5, ease: "power2.in" }, 12.0)
    .to("#proj-1-float-1", { z: 1400, opacity: 0, duration: 2.5, ease: "power2.in" }, 12.0)
    .to("#proj-1-float-2", { z: 1300, opacity: 0, duration: 2.5, ease: "power2.in" }, 12.2)
    .to("#proj-1-text", { opacity: 0, x: -80, duration: 2, ease: "power2.in" }, 12.2)
    .to("#scene-proj-1", { opacity: 0, duration: 0.5 }, 14.5)
    
    // Ambient color shift: Teal -> Crimson
    .to("#bg-glow-teal", { opacity: 0, duration: 2 }, 12.5)
    .to("#bg-glow-crimson", { opacity: 0.9, duration: 2 }, 13.0);

    // ----------------------------------------------------
    // 3. PROJECT 02 — NISSI STYLENEST (13.5s -> 24s)
    // ----------------------------------------------------
    // Emerges continuously from depth behind Project 01
    tl.fromTo("#scene-proj-2", 
        { opacity: 0, z: -700, scale: 0.75 }, 
        { opacity: 1, z: 0, scale: 1.0, duration: 3, ease: "power2.out" }, 
        13.5
    )
    .fromTo("#proj-2-num", { opacity: 0, y: -40 }, { opacity: 0.04, y: 0, duration: 2 }, 14.2)
    .fromTo("#proj-2-text", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 2.2, ease: "power2.out" }, 14.5)
    
    // Visual camera movement closer: emphasize backend architecture & schema
    .to("#proj-2-visual", { z: 120, scale: 1.08, duration: 3.5, ease: "none" }, 16.5)
    .fromTo("#proj-2-float-schema", { z: 40, opacity: 0 }, { z: 190, opacity: 1, duration: 2.5, ease: "power2.out" }, 15.5)
    .fromTo("#proj-2-float-store", { z: 40, opacity: 0 }, { z: 160, opacity: 1, duration: 2.5, ease: "power2.out" }, 16.0)

    // Hold / Reading beat
    .to({}, { duration: 1.5 })

    // Zoom transition out: surges forward past camera
    .to("#proj-2-visual", { z: 1250, scale: 2.4, opacity: 0, duration: 3.5, ease: "power2.in" }, 21.0)
    .to("#proj-2-float-schema", { z: 1400, opacity: 0, duration: 2.5, ease: "power2.in" }, 21.0)
    .to("#proj-2-float-store", { z: 1300, opacity: 0, duration: 2.5, ease: "power2.in" }, 21.2)
    .to("#proj-2-text", { opacity: 0, x: 80, duration: 2, ease: "power2.in" }, 21.2)
    .to("#scene-proj-2", { opacity: 0, duration: 0.5 }, 23.5)

    // Ambient color shift: Crimson -> Cyan/Amber
    .to("#bg-glow-crimson", { opacity: 0, duration: 2 }, 21.5)
    .to("#bg-glow-cyan", { opacity: 0.9, duration: 2 }, 22.0);

    // ----------------------------------------------------
    // 4. PROJECT 03 — SIDDHA CLINIC MANAGEMENT (22.5s -> 33s)
    // ----------------------------------------------------
    // Emerges continuously from depth
    tl.fromTo("#scene-proj-3", 
        { opacity: 0, z: -700, scale: 0.75 }, 
        { opacity: 1, z: 0, scale: 1.0, duration: 3, ease: "power2.out" }, 
        22.5
    )
    .fromTo("#proj-3-num", { opacity: 0, y: -40 }, { opacity: 0.04, y: 0, duration: 2 }, 23.2)
    .fromTo("#proj-3-text", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 2.2, ease: "power2.out" }, 23.5)
    
    // Visual camera movement closer
    .to("#proj-3-visual", { z: 120, scale: 1.08, duration: 3.5, ease: "none" }, 25.5)
    .fromTo("#proj-3-float-patient", { z: 40, opacity: 0 }, { z: 180, opacity: 1, duration: 2.5, ease: "power2.out" }, 24.5)
    .fromTo("#proj-3-float-smtp", { z: 40, opacity: 0 }, { z: 150, opacity: 1, duration: 2.5, ease: "power2.out" }, 25.0)

    // Hold / Reading beat
    .to({}, { duration: 1.5 })

    // Zoom transition out
    .to("#proj-3-visual", { z: 1250, scale: 2.4, opacity: 0, duration: 3.5, ease: "power2.in" }, 30.0)
    .to("#proj-3-float-patient", { z: 1400, opacity: 0, duration: 2.5, ease: "power2.in" }, 30.0)
    .to("#proj-3-float-smtp", { z: 1300, opacity: 0, duration: 2.5, ease: "power2.in" }, 30.2)
    .to("#proj-3-text", { opacity: 0, x: -80, duration: 2, ease: "power2.in" }, 30.2)
    .to("#scene-proj-3", { opacity: 0, duration: 0.5 }, 32.5)

    // Settle ambient lighting for Contact
    .to("#bg-glow-cyan", { opacity: 0.2, duration: 2 }, 31.0);

    // ----------------------------------------------------
    // 5. SCENE 5 — CONTACT & EXIT (31.5s -> 38s)
    // ----------------------------------------------------
    tl.fromTo("#scene-contact", 
        { opacity: 0, y: 80, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1.0, duration: 3, ease: "power2.out" }, 
        31.5
    )
    .to({}, { duration: 4 }); // End hold
});

// MOBILE / TABLET OPTIMIZED TIMELINE (Smooth 2D/Subtle Depth, zero lag)
mm.add("(max-width: 768px)", () => {
    // Hero Zoom
    tl.to("#hero-content", { opacity: 0, y: -50, duration: 2 }, 0)
      .to("#scene-hero", { opacity: 0, scale: 1.3, duration: 3.5 }, 0.5)
      .to("#bg-glow-teal", { opacity: 0.8, duration: 2 }, 2);

    // Project 01
    tl.fromTo("#scene-proj-1", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 3 }, 3)
      .to("#proj-1-visual", { scale: 1.05, duration: 3 }, 5)
      .to({}, { duration: 2 })
      .to("#scene-proj-1", { opacity: 0, scale: 1.25, duration: 3 }, 9)
      .to("#bg-glow-teal", { opacity: 0, duration: 2 }, 9)
      .to("#bg-glow-crimson", { opacity: 0.8, duration: 2 }, 9.5);

    // Project 02
    tl.fromTo("#scene-proj-2", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 3 }, 10)
      .to("#proj-2-visual", { scale: 1.05, duration: 3 }, 12)
      .to({}, { duration: 2 })
      .to("#scene-proj-2", { opacity: 0, scale: 1.25, duration: 3 }, 16)
      .to("#bg-glow-crimson", { opacity: 0, duration: 2 }, 16)
      .to("#bg-glow-cyan", { opacity: 0.8, duration: 2 }, 16.5);

    // Project 03
    tl.fromTo("#scene-proj-3", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 3 }, 17)
      .to("#proj-3-visual", { scale: 1.05, duration: 3 }, 19)
      .to({}, { duration: 2 })
      .to("#scene-proj-3", { opacity: 0, scale: 1.25, duration: 3 }, 23)
      .to("#bg-glow-cyan", { opacity: 0.2, duration: 2 }, 23);

    // Contact
    tl.fromTo("#scene-contact", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 3 }, 24)
      .to({}, { duration: 3 });
});

// --- INTERACTIVE NAVIGATION CLICK HANDLERS ---
function scrollToNormalized(targetRatio) {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
        top: totalScroll * targetRatio,
        behavior: "smooth"
    });
}

// Work / Projects links
const navWorkLink = document.getElementById("nav-work-link");
const heroWorkBtn = document.getElementById("hero-work-btn");
const heroContactBtn = document.getElementById("hero-contact-btn");

if (navWorkLink) {
    navWorkLink.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToNormalized(0.24); // Scrolls into Project 01 focus
    });
}

if (heroWorkBtn) {
    heroWorkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToNormalized(0.24); // Scrolls into Project 01 focus
    });
}

if (heroContactBtn) {
    heroContactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToNormalized(0.96); // Scrolls to Contact scene
    });
}

// HUD item click navigation
const hudBtn1 = document.getElementById("hud-btn-1");
const hudBtn2 = document.getElementById("hud-btn-2");
const hudBtn3 = document.getElementById("hud-btn-3");

if (hudBtn1) {
    hudBtn1.addEventListener("click", () => scrollToNormalized(0.24));
}
if (hudBtn2) {
    hudBtn2.addEventListener("click", () => scrollToNormalized(0.50));
}
if (hudBtn3) {
    hudBtn3.addEventListener("click", () => scrollToNormalized(0.76));
}
