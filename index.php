<!DOCTYPE html>
<html lang="en" class="bg-[#030305] text-gray-200 antialiased overflow-x-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fahmidha Afra J | Web Developer</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Font A: Inter (Technical, UI, Data). Font B: Playfair Display (Expressive, Elegant) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        bgdark: '#030305',
                        surface: '#0a0a0f',
                        surface2: '#12121a',
                        accent: '#ffffff',
                        muted: '#64748b',
                        highlight: '#38bdf8'
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-bgdark text-gray-200 overflow-x-hidden selection:bg-white selection:text-black">

    <!-- Film Grain Overlay for Cinematic Texture -->
    <div class="fixed inset-0 z-50 pointer-events-none film-grain opacity-40"></div>

    <!-- Fixed UI Overlay (Navbar) -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-300 pointer-events-none" id="navbar">
        <div class="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
            <a href="#" class="font-sans font-semibold tracking-[0.25em] text-xs text-white uppercase pointer-events-auto mix-blend-difference flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-highlight animate-pulse"></span>
                <span>Fahmidha</span>
            </a>
            
            <div class="flex items-center gap-6 pointer-events-auto">
                <a href="#work" id="nav-work-link" class="hidden sm:inline-block text-[11px] font-sans uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                    Selected Works
                </a>
                <a href="mailto:fahmidhaafra@gmail.com" class="flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Start a Project
                </a>
            </div>
        </div>
    </nav>

    <!-- Project Journey HUD / Navigator (Inspired by GertiX sequential storytelling) -->
    <div id="project-hud" class="fixed right-6 md:right-12 bottom-8 md:bottom-12 z-50 pointer-events-auto flex items-center gap-4 transition-all duration-500 opacity-0 translate-y-4">
        <div class="flex items-center gap-3 bg-surface/90 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-2xl">
            <button class="hud-item flex items-center gap-2 group cursor-pointer transition-all" data-target="proj-1" id="hud-btn-1">
                <span class="w-2 h-2 rounded-full bg-teal-400/40 group-hover:bg-teal-400 transition-all hud-dot" id="hud-dot-1"></span>
                <span class="font-mono text-[9px] uppercase tracking-wider text-muted group-hover:text-white transition-colors hud-label" id="hud-label-1">01 Physio</span>
            </button>
            <span class="text-white/20 text-xs font-mono">/</span>
            <button class="hud-item flex items-center gap-2 group cursor-pointer transition-all" data-target="proj-2" id="hud-btn-2">
                <span class="w-2 h-2 rounded-full bg-rose-500/40 group-hover:bg-rose-500 transition-all hud-dot" id="hud-dot-2"></span>
                <span class="font-mono text-[9px] uppercase tracking-wider text-muted group-hover:text-white transition-colors hud-label" id="hud-label-2">02 Stylenest</span>
            </button>
            <span class="text-white/20 text-xs font-mono">/</span>
            <button class="hud-item flex items-center gap-2 group cursor-pointer transition-all" data-target="proj-3" id="hud-btn-3">
                <span class="w-2 h-2 rounded-full bg-sky-400/40 group-hover:bg-sky-400 transition-all hud-dot" id="hud-dot-3"></span>
                <span class="font-mono text-[9px] uppercase tracking-wider text-muted group-hover:text-white transition-colors hud-label" id="hud-label-3">03 Siddha</span>
            </button>
        </div>
    </div>

    <!-- Scroll Proxy for GSAP ScrollTrigger (Controls timeline pacing) -->
    <div id="scroll-proxy" style="height: 3200vh;"></div>

    <!-- 3D Cinematic Viewport -->
    <main id="viewport" class="fixed inset-0 w-full h-full perspective-1000 overflow-hidden pointer-events-none">
        
        <!-- Dynamic Ambient Cinematic Background Glows -->
        <div id="bg-glow-base" class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,27,75,0.4),_transparent_70%)] opacity-70 mix-blend-screen pointer-events-none"></div>
        <div id="bg-glow-teal" class="absolute inset-0 z-0 glow-backdrop glow-teal opacity-0 mix-blend-screen pointer-events-none"></div>
        <div id="bg-glow-crimson" class="absolute inset-0 z-0 glow-backdrop glow-crimson opacity-0 mix-blend-screen pointer-events-none"></div>
        <div id="bg-glow-cyan" class="absolute inset-0 z-0 glow-backdrop glow-cyan opacity-0 mix-blend-screen pointer-events-none"></div>
        <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(15,23,42,0.6),_transparent_50%)] mix-blend-screen pointer-events-none"></div>

        <!-- The Transform World (3D Camera System) -->
        <div id="world" class="absolute inset-0 transform-style-3d w-full h-full flex items-center justify-center">
            
            <!-- SCENE 1: REAL WORLD (HERO) — Preserved with 3D Laptop Screen Portal -->
            <section id="scene-hero" class="absolute inset-0 w-full h-full flex items-center z-50">
                <div class="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    <!-- Hero Content -->
                    <div class="lg:col-span-6 flex flex-col justify-center" id="hero-content">
                        <div class="mb-8">
                            <div class="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-muted uppercase mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 font-medium">
                                <span class="text-white">Fahmidha Afra J</span>
                                <span class="hidden sm:block text-[#444]">/</span>
                                <span>Web Developer</span>
                            </div>
                        </div>
                        
                        <div class="mb-10">
                            <!-- Dual Typography System -->
                            <h1 class="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
                                <span class="font-sans font-light uppercase tracking-wide text-2xl md:text-3xl lg:text-4xl block mb-2 opacity-90">Websites that make</span>
                                <span class="font-serif italic font-medium text-highlight/90 block mb-2">your business ready</span>
                                <span class="font-sans font-light uppercase tracking-wide text-2xl md:text-3xl lg:text-4xl block opacity-90">for the digital world.</span>
                            </h1>
                        </div>
                        
                        <div class="mb-12">
                            <p class="font-sans text-sm md:text-base text-slate-400 leading-relaxed max-w-md font-light">
                                <span class="font-serif italic text-lg text-white pr-1">I create</span> modern, responsive websites for businesses that want to build a stronger online presence.
                            </p>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-6 items-start sm:items-center pointer-events-auto">
                            <a href="#contact" id="hero-contact-btn" class="bg-white text-black px-8 py-4 text-[10px] font-sans uppercase tracking-[0.2em] font-medium hover:bg-gray-200 transition-colors text-center w-full sm:w-auto">
                                Start a Project
                            </a>
                            <a href="#work" id="hero-work-btn" class="border border-white/20 text-white px-8 py-4 text-[10px] font-sans uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-sm transition-colors text-center w-full sm:w-auto">
                                View My Work
                            </a>
                        </div>
                    </div>

                    <!-- Hero UI Composition (The Laptop Portal) -->
                    <div class="lg:col-span-6 relative h-[50vh] lg:h-auto hidden md:block transform-style-3d" id="hero-portal">
                        <!-- Animated Girl Working on Laptop -->
                        <div class="absolute top-[10%] right-[10%] w-[450px] h-[450px] z-30 flex flex-col items-center justify-center pointer-events-auto" id="portal-screen">
                            <lottie-player 
                                src="https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json" 
                                background="transparent" 
                                speed="1" 
                                style="width: 100%; height: 100%; filter: drop-shadow(0 0 40px rgba(56,189,248,0.2));" 
                                loop 
                                autoplay>
                            </lottie-player>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SCENE 2: PROJECT 01 — PROACTIVE PHYSIOTHERAPY & REHABILITATION -->
            <section id="scene-proj-1" class="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transform-style-3d z-40 pointer-events-none">
                
                <!-- Giant Editorial Spatial Anchor Number -->
                <div id="proj-1-num" class="absolute -top-10 left-4 md:-top-16 md:left-12 lg:left-20 text-[11rem] md:text-[16rem] lg:text-[22rem] font-serif italic font-bold text-white/[0.04] pointer-events-none select-none z-0 tracking-tighter leading-none">
                    01
                </div>

                <div class="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 max-h-[92vh] overflow-y-auto lg:overflow-visible custom-scrollbar py-6 pointer-events-auto">
                    
                    <!-- Left: Editorial Storytelling Content -->
                    <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1" id="proj-1-text">
                        
                        <!-- Kicker / Category -->
                        <div class="text-[10px] font-sans tracking-[0.4em] text-teal-400 uppercase mb-3 flex items-center gap-3">
                            <span class="w-8 h-[1px] bg-teal-400/60"></span>
                            <span>01 &mdash; Full-Stack Web Application</span>
                        </div>
                        
                        <!-- Large Editorial Title -->
                        <h2 class="text-3xl md:text-5xl text-white mb-2 leading-[1.1]">
                            <span class="font-serif italic font-medium block">ProActive Physiotherapy</span>
                            <span class="font-sans font-light uppercase tracking-wide text-lg md:text-xl text-slate-300 block mt-1">&amp; Rehabilitation</span>
                        </h2>

                        <!-- Short Description -->
                        <p class="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light mt-4 mb-6">
                            A professional physiotherapy and rehabilitation website with frontend, backend, database, appointment/booking functionality and SMTP email communication.
                        </p>
                        
                        <!-- Structured Detail Blocks -->
                        <div class="space-y-5">
                            
                            <!-- Contribution -->
                            <div class="p-3.5 rounded-lg bg-teal-950/20 border border-teal-500/20">
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.25em] text-teal-400 font-semibold mb-2 flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                                    <span>My Contribution</span>
                                </h4>
                                <p class="font-sans text-xs text-slate-300 font-light leading-relaxed">
                                    Full-stack web development, frontend/backend integration, database functionality and booking/email functionality.
                                </p>
                            </div>
                            
                            <!-- Key Features -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Key Features</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400 font-light">
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>Physiotherapy & rehab services</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>Appointment/booking flow</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>Patient enquiry & contact</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>Backend data handling</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>MySQL database</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-teal-400">&bull;</span>
                                        <span>SMTP email functionality</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Architecture & Tech Stack -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Tech Stack</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-teal-300">React.js</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-teal-300">Vite</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-teal-300">PHP</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-teal-300">MySQL</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-teal-300">SMTP</span>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <div class="pt-2">
                                <a href="mailto:fahmidhaafra@gmail.com?subject=Inquiry%20regarding%20ProActive%20Physiotherapy%20Project" class="inline-flex items-center gap-2 border border-teal-500/40 text-teal-300 hover:text-white hover:bg-teal-500/20 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] transition-colors rounded-sm">
                                    <span>Inquire About System</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Large Immersive Project Visual (The Visual Hero) -->
                    <div class="lg:col-span-7 relative flex items-center justify-center transform-style-3d order-1 lg:order-2" id="proj-1-visual-wrap">
                        
                        <!-- Main Interactive Web Platform Mockup -->
                        <div class="relative w-full aspect-[16/10] editorial-glass rounded-xl shadow-2xl overflow-hidden flex flex-col transform-style-3d transform-gpu" id="proj-1-visual">
                            
                            <!-- Browser Chrome Bar -->
                            <div class="h-9 border-b border-white/10 bg-black/50 px-4 flex items-center justify-between z-20">
                                <div class="flex items-center gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                                    <svg class="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                    <span>proactive-rehab.clinic/portal/booking</span>
                                </div>
                                <div class="text-[9px] font-mono text-teal-400 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                                    <span>ONLINE</span>
                                </div>
                            </div>

                            <!-- Mockup Application Interior -->
                            <div class="flex-1 bg-gradient-to-br from-[#021815] via-[#05111b] to-[#030712] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                                
                                <!-- App Header -->
                                <div class="flex items-center justify-between pb-4 border-b border-white/5">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-serif italic text-lg font-bold">
                                            P
                                        </div>
                                        <div>
                                            <div class="text-xs font-sans font-semibold text-white tracking-wider">PROACTIVE REHAB</div>
                                            <div class="text-[9px] text-teal-400/80 font-mono">Clinical Appointment Engine</div>
                                        </div>
                                    </div>
                                    <div class="hidden sm:flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                                        <span class="text-white">Services</span>
                                        <span>Practitioners</span>
                                        <span>Intake Flow</span>
                                        <span class="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">Book Visit</span>
                                    </div>
                                </div>

                                <!-- App Main Grid -->
                                <div class="grid grid-cols-12 gap-4 my-auto py-2">
                                    
                                    <!-- Treatment Protocol Selection -->
                                    <div class="col-span-6 space-y-2">
                                        <div class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">1. Select Treatment</div>
                                        <div class="p-2.5 rounded bg-teal-500/10 border border-teal-500/40 text-left">
                                            <div class="text-xs text-white font-medium flex items-center justify-between">
                                                <span>Sports Rehabilitation</span>
                                                <span class="text-teal-400 text-[10px]">&check; Selected</span>
                                            </div>
                                            <div class="text-[10px] text-slate-400 mt-1">Manual therapy &amp; biomechanics recovery</div>
                                        </div>
                                        <div class="p-2 rounded bg-white/5 border border-white/5 text-left opacity-60">
                                            <div class="text-xs text-slate-300">Post-Op Orthopedic Care</div>
                                        </div>
                                        <div class="p-2 rounded bg-white/5 border border-white/5 text-left opacity-60">
                                            <div class="text-xs text-slate-300">Spinal Alignment Therapy</div>
                                        </div>
                                    </div>

                                    <!-- Schedule & Booking Details -->
                                    <div class="col-span-6 bg-black/40 border border-white/10 rounded-lg p-3 space-y-2.5">
                                        <div class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">2. Booking Schedule</div>
                                        
                                        <!-- Time slots -->
                                        <div class="grid grid-cols-3 gap-1.5">
                                            <span class="text-[10px] font-mono py-1 text-center rounded bg-white/5 text-slate-400">09:30 AM</span>
                                            <span class="text-[10px] font-mono py-1 text-center rounded bg-teal-500/20 text-teal-300 border border-teal-500/50 font-bold">11:00 AM</span>
                                            <span class="text-[10px] font-mono py-1 text-center rounded bg-white/5 text-slate-400">02:15 PM</span>
                                        </div>

                                        <!-- Patient Record Field -->
                                        <div class="bg-white/5 p-2 rounded border border-white/5">
                                            <div class="text-[9px] text-slate-400">Patient Details</div>
                                            <div class="text-[10px] text-white font-mono mt-0.5">Sarah Jenkins • +1 555-019-2831</div>
                                        </div>

                                        <!-- Submit button preview -->
                                        <div class="w-full py-2 rounded bg-teal-500 text-black font-sans text-[10px] font-semibold tracking-wider text-center uppercase shadow-[0_0_15px_rgba(20,184,166,0.4)]">
                                            Confirm &amp; Dispatch Email
                                        </div>
                                    </div>
                                </div>

                                <!-- App Telemetry Strip -->
                                <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                                    <div class="flex items-center gap-3">
                                        <span>MySQL: <span class="text-emerald-400">Connected (0.4ms)</span></span>
                                        <span>PHP REST: <span class="text-white">Active</span></span>
                                    </div>
                                    <div>SMTP Dispatcher: <span class="text-teal-400">Port 587 SSL OK</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating 3D Parallax Badge 1: SMTP Email Confirmation -->
                        <div id="proj-1-float-1" class="absolute -top-6 -right-4 sm:-right-8 p-3 rounded-lg editorial-glass float-shadow-teal max-w-[210px] z-30 transform-gpu pointer-events-none">
                            <div class="flex items-start gap-2.5">
                                <div class="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-300 text-xs shrink-0">
                                    &check;
                                </div>
                                <div>
                                    <div class="text-[10px] font-sans font-semibold text-white">Booking Confirmed</div>
                                    <div class="text-[9px] font-sans text-slate-400 mt-0.5 leading-snug">Automated confirmation email dispatched via SMTP with calendar invite.</div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating 3D Parallax Badge 2: Architecture Tag -->
                        <div id="proj-1-float-2" class="absolute -bottom-6 -left-4 sm:-left-8 p-3 rounded-lg editorial-glass float-shadow-teal max-w-[220px] z-30 transform-gpu pointer-events-none">
                            <div class="text-[9px] font-mono text-teal-400 uppercase tracking-widest mb-1">Architecture</div>
                            <div class="text-[10px] font-sans text-slate-200">React Frontend + PHP Backend + MySQL Database</div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- SCENE 3: PROJECT 02 — NISSI STYLENEST (BACKEND-FOCUSED DEVELOPMENT) -->
            <section id="scene-proj-2" class="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transform-style-3d z-30 pointer-events-none">
                
                <!-- Giant Editorial Spatial Anchor Number -->
                <div id="proj-2-num" class="absolute -top-10 left-4 md:-top-16 md:left-12 lg:left-20 text-[11rem] md:text-[16rem] lg:text-[22rem] font-serif italic font-bold text-white/[0.04] pointer-events-none select-none z-0 tracking-tighter leading-none">
                    02
                </div>

                <div class="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 max-h-[92vh] overflow-y-auto lg:overflow-visible custom-scrollbar py-6 pointer-events-auto">
                    
                    <!-- Left: Large Immersive Backend Architecture & Store Showcase (Visual Hero) -->
                    <div class="lg:col-span-7 relative flex items-center justify-center transform-style-3d order-1" id="proj-2-visual-wrap">
                        
                        <!-- Main Backend & Store Monitor Mockup -->
                        <div class="relative w-full aspect-[16/10] editorial-glass rounded-xl shadow-2xl overflow-hidden flex flex-col transform-style-3d transform-gpu" id="proj-2-visual">
                            
                            <!-- Browser / Terminal Chrome Bar -->
                            <div class="h-9 border-b border-white/10 bg-black/60 px-4 flex items-center justify-between z-20">
                                <div class="flex items-center gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                                    <span class="text-rose-400">NISSI STYLENEST</span>
                                    <span>//</span>
                                    <span>Admin Backend &amp; API Dashboard</span>
                                </div>
                                <div class="text-[9px] font-mono text-rose-400 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                    <span>ENGINE ACTIVE</span>
                                </div>
                            </div>

                            <!-- Backend Dashboard Interface (Using Real High-Resolution Asset) -->
                            <div class="flex-1 relative overflow-hidden bg-black/90">
                                <img src="assets/ecommerce_preview.png" alt="Nissi Stylenest Backend E-Commerce Dashboard" class="w-full h-full object-cover object-top opacity-90">
                                
                                <!-- Subtle Gradient Overlay to enhance contrast -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

                                <!-- Lower Status Bar Overlay -->
                                <div class="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between text-[10px] font-mono">
                                    <div class="flex items-center gap-4 text-slate-300">
                                        <span>PHP API: <span class="text-rose-400">POST /api/orders</span></span>
                                        <span class="hidden sm:inline">MySQL Transactions: <span class="text-emerald-400">ACID OK</span></span>
                                    </div>
                                    <div class="text-rose-400 font-semibold">Real-Time Inventory Engine</div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating 3D Depth Layer 1: MySQL Relational Schema Map -->
                        <div id="proj-2-float-schema" class="absolute -top-8 -left-4 sm:-left-8 w-[230px] sm:w-[280px] aspect-[4/3] rounded-lg editorial-glass float-shadow-crimson overflow-hidden border border-rose-500/30 z-30 transform-gpu pointer-events-none">
                            <div class="h-6 bg-black/70 border-b border-white/10 px-3 flex items-center justify-between text-[9px] font-mono text-slate-400">
                                <span>MySQL Relational Schema</span>
                                <span class="text-rose-400">Lat: 14ms</span>
                            </div>
                            <img src="assets/database_preview.png" alt="Relational Database Schema" class="w-full h-full object-cover">
                        </div>

                        <!-- Floating 3D Depth Layer 2: Store Fragment & Real-Time Variant/Stock Handler -->
                        <div id="proj-2-float-store" class="absolute -bottom-8 -right-4 sm:-right-8 p-3.5 rounded-lg editorial-glass float-shadow-crimson max-w-[240px] z-30 transform-gpu border border-rose-500/30 pointer-events-none">
                            <div class="text-[9px] font-mono text-rose-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                                <span>Product &amp; Stock Sync</span>
                                <span class="text-amber-400 font-bold">Low Stock (3)</span>
                            </div>
                            <div class="text-[11px] font-sans font-medium text-white">Handcrafted Silk Kurti</div>
                            <div class="text-[10px] text-slate-400 mt-0.5">Variant: Crimson / Size: M</div>
                            <div class="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono">
                                <span class="text-slate-400">Stock Decrement:</span>
                                <span class="text-emerald-400">&minus;1 [Auto DB Commit]</span>
                            </div>
                        </div>

                    </div>

                    <!-- Right: Editorial Storytelling Content (Explicit Backend Emphasis) -->
                    <div class="lg:col-span-5 flex flex-col justify-center order-2" id="proj-2-text">
                        
                        <!-- Kicker / Category -->
                        <div class="text-[10px] font-sans tracking-[0.4em] text-rose-400 uppercase mb-3 flex items-center gap-3">
                            <span class="w-8 h-[1px] bg-rose-500/60"></span>
                            <span>02 &mdash; E-Commerce Web Application</span>
                        </div>
                        
                        <!-- Large Editorial Title -->
                        <h2 class="text-3xl md:text-5xl text-white mb-2 leading-[1.1]">
                            <span class="font-serif italic font-medium block">Nissi Stylenest</span>
                        </h2>

                        <!-- Clear Explicit Backend-Focused Badge (As Requested) -->
                        <div class="my-3">
                            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-[10px] tracking-widest uppercase font-semibold">
                                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                                <span>Backend-Focused Development</span>
                            </div>
                        </div>

                        <!-- Project Scope Description -->
                        <p class="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light mb-5">
                            An ethnic-wear e-commerce web application with a customer-facing shopping interface and an administrative backend for managing products, categories, inventory, orders and store operations.
                        </p>
                        
                        <!-- Structured Detail Blocks -->
                        <div class="space-y-4">
                            
                            <!-- Contribution (Clear and Specific) -->
                            <div class="p-3.5 rounded-lg bg-rose-950/20 border border-rose-500/20">
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.25em] text-rose-400 font-semibold mb-2 flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                    <span>My Contribution &mdash; Backend Architecture &amp; Operations</span>
                                </h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300 font-light">
                                    <div>&bull; PHP backend &amp; API development</div>
                                    <div>&bull; MySQL database operations</div>
                                    <div>&bull; Product &amp; category management</div>
                                    <div>&bull; Product variant &amp; stock handling</div>
                                    <div>&bull; Order management logic</div>
                                    <div>&bull; Admin functionality</div>
                                    <div>&bull; Frontend/backend integration</div>
                                    <div>&bull; SMTP email dispatch</div>
                                </div>
                            </div>
                            
                            <!-- Key Features -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Key Features</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400 font-light">
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>Product &amp; category management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>Product variants &amp; stock</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>Order management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>Admin management interface</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>Database-driven operations</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-rose-400">&bull;</span>
                                        <span>SMTP order emails</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Architecture & Tech Stack -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Tech Stack</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-rose-300">React.js</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-rose-300">Vite</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-rose-300">PHP</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-rose-300">MySQL</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-rose-300">SMTP</span>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <div class="pt-2">
                                <a href="mailto:fahmidhaafra@gmail.com?subject=Inquiry%20regarding%20Nissi%20Stylenest%20Backend" class="inline-flex items-center gap-2 border border-rose-500/40 text-rose-300 hover:text-white hover:bg-rose-500/20 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] transition-colors rounded-sm">
                                    <span>Inquire About Backend</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <!-- SCENE 4: PROJECT 03 — SIDDHA CLINIC MANAGEMENT SYSTEM -->
            <section id="scene-proj-3" class="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transform-style-3d z-20 pointer-events-none">
                
                <!-- Giant Editorial Spatial Anchor Number -->
                <div id="proj-3-num" class="absolute -top-10 left-4 md:-top-16 md:left-12 lg:left-20 text-[11rem] md:text-[16rem] lg:text-[22rem] font-serif italic font-bold text-white/[0.04] pointer-events-none select-none z-0 tracking-tighter leading-none">
                    03
                </div>

                <div class="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 max-h-[92vh] overflow-y-auto lg:overflow-visible custom-scrollbar py-6 pointer-events-auto">
                    
                    <!-- Left: Editorial Storytelling Content -->
                    <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1" id="proj-3-text">
                        
                        <!-- Kicker / Category -->
                        <div class="text-[10px] font-sans tracking-[0.4em] text-sky-400 uppercase mb-3 flex items-center gap-3">
                            <span class="w-8 h-[1px] bg-sky-400/60"></span>
                            <span>03 &mdash; Full-Stack Web Application</span>
                        </div>
                        
                        <!-- Large Editorial Title -->
                        <h2 class="text-3xl md:text-5xl text-white mb-2 leading-[1.1]">
                            <span class="font-serif italic font-medium block">Siddha Clinic</span>
                            <span class="font-sans font-light uppercase tracking-wide text-lg md:text-xl text-slate-300 block mt-1">Management System</span>
                        </h2>

                        <!-- Short Description -->
                        <p class="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light mt-4 mb-6">
                            A clinic management web application designed to digitally organize patient and clinic-related operations using a React frontend, PHP backend and MySQL database.
                        </p>
                        
                        <!-- Structured Detail Blocks -->
                        <div class="space-y-5">
                            
                            <!-- Contribution -->
                            <div class="p-3.5 rounded-lg bg-sky-950/20 border border-sky-500/20">
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.25em] text-sky-400 font-semibold mb-2 flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                    <span>My Contribution</span>
                                </h4>
                                <p class="font-sans text-xs text-slate-300 font-light leading-relaxed">
                                    Full-stack web development, frontend/backend integration, database-driven functionality, clinic management functionality and SMTP integration.
                                </p>
                            </div>
                            
                            <!-- Key Features -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Key Features</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400 font-light">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Patient management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Patient registration/details</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Appointment management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Clinic &amp; service management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Backend data management</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>MySQL database</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>Admin management interface</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sky-400">&bull;</span>
                                        <span>SMTP email functionality</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Architecture & Tech Stack -->
                            <div>
                                <h4 class="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2">Tech Stack</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-sky-300">React.js</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-sky-300">Vite</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-sky-300">PHP</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-sky-300">MySQL</span>
                                    <span class="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-sky-300">SMTP</span>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <div class="pt-2">
                                <a href="mailto:fahmidhaafra@gmail.com?subject=Inquiry%20regarding%20Siddha%20Clinic%20Management%20System" class="inline-flex items-center gap-2 border border-sky-500/40 text-sky-300 hover:text-white hover:bg-sky-500/20 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.2em] transition-colors rounded-sm">
                                    <span>Inquire About Clinic Platform</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Large Immersive Project Visual (The Visual Hero) -->
                    <div class="lg:col-span-7 relative flex items-center justify-center transform-style-3d order-1 lg:order-2" id="proj-3-visual-wrap">
                        
                        <!-- Main Clinic Scheduling & Operations Dashboard Mockup -->
                        <div class="relative w-full aspect-[16/10] editorial-glass rounded-xl shadow-2xl overflow-hidden flex flex-col transform-style-3d transform-gpu" id="proj-3-visual">
                            
                            <!-- Chrome Bar -->
                            <div class="h-9 border-b border-white/10 bg-black/60 px-4 flex items-center justify-between z-20">
                                <div class="flex items-center gap-2">
                                    <div class="w-2.5 h-2.5 rounded-full bg-sky-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                                    <span class="text-sky-400">SIDDHA FLOW</span>
                                    <span>//</span>
                                    <span>Clinical Scheduling &amp; Management Dashboard</span>
                                </div>
                                <div class="text-[9px] font-mono text-sky-400 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                                    <span>DATABASE SYNCED</span>
                                </div>
                            </div>

                            <!-- Dashboard Interface Image (Real High-Resolution Asset) -->
                            <div class="flex-1 relative overflow-hidden bg-black/95">
                                <img src="assets/clinic_preview.png" alt="Siddha Clinic Scheduling & Management System" class="w-full h-full object-cover object-top opacity-95">
                                
                                <!-- Subtle Gradient Bottom Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                                <!-- Lower Telemetry Strip -->
                                <div class="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between text-[10px] font-mono">
                                    <div class="flex items-center gap-4 text-slate-300">
                                        <span>Active Practitioners: <span class="text-sky-400">Dr. Aris, Dr. Priya</span></span>
                                        <span class="hidden sm:inline">Records: <span class="text-amber-400">MySQL Encrypted</span></span>
                                    </div>
                                    <div class="text-sky-400 font-semibold">SMTP Patient Dispatch Active</div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating 3D Depth Layer 1: Patient Record Module -->
                        <div id="proj-3-float-patient" class="absolute -top-6 -right-4 sm:-right-8 p-3 rounded-lg editorial-glass float-shadow-cyan max-w-[220px] z-30 transform-gpu pointer-events-none border border-sky-500/30">
                            <div class="text-[9px] font-mono text-sky-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                                <span>Patient Record</span>
                                <span class="text-emerald-400">&check; Checked-In</span>
                            </div>
                            <div class="text-[11px] font-sans font-medium text-white">R. Kumar (Age 44)</div>
                            <div class="text-[10px] text-slate-400 mt-0.5">Varma Joint Therapy &bull; 09:00 AM</div>
                        </div>

                        <!-- Floating 3D Depth Layer 2: SMTP Dispatch Service Badge -->
                        <div id="proj-3-float-smtp" class="absolute -bottom-6 -left-4 sm:-left-8 p-3 rounded-lg editorial-glass float-shadow-cyan max-w-[230px] z-30 transform-gpu pointer-events-none border border-sky-500/30">
                            <div class="text-[9px] font-mono text-amber-400 uppercase tracking-widest mb-1">SMTP Notification</div>
                            <div class="text-[10px] font-sans text-slate-300">Automated appointment confirmation &amp; reminder sent to patient inbox.</div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- SCENE 5: CONTACT / EXIT -->
            <section id="scene-contact" class="absolute inset-0 w-full h-full flex flex-col items-center justify-center opacity-0 z-10 bg-bgdark pointer-events-none">
                <div class="max-w-3xl text-center px-6 pointer-events-auto">
                    <h2 class="text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight">
                        <span class="font-sans font-light uppercase tracking-widest text-lg md:text-xl block mb-4 text-slate-400">Have a business idea?</span>
                        <span class="font-serif italic font-medium text-white">Let's build something</span>
                        <span class="font-sans font-light uppercase tracking-wide text-white block mt-2 opacity-90">Memorable.</span>
                    </h2>
                    
                    <p class="font-sans text-base text-slate-400 mb-12 max-w-lg mx-auto font-light">
                        <span class="font-serif italic text-white text-lg">I'm Fahmidha Afra J.</span> Ready to bring your local business, clinic, or personal brand into the digital space.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-6 items-center justify-center">
                        <a href="mailto:fahmidhaafra@gmail.com" class="bg-white text-black px-10 py-5 text-[10px] font-sans uppercase tracking-[0.2em] font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            Start a Project
                        </a>
                        <a href="mailto:fahmidhaafra@gmail.com" class="border border-white/20 text-white px-10 py-5 text-[10px] font-sans uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-sm transition-colors w-full sm:w-auto">
                            Email Me
                        </a>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <!-- Scripts -->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
