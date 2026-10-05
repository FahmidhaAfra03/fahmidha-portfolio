import React, { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import LetterHoverText from '../Typography/LetterHoverText';

const HeroSection = forwardRef(({ onExploreClick, contentRef, indicatorRef }, ref) => {
  const containerRef = useRef(null);
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);

  // Cinematic GSAP Entrance Sequence on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set('.hero-meta', { opacity: 0, y: -10 });
      gsap.set('.hero-badge', { opacity: 0, scale: 0.95 });
      gsap.set('.hero-title-1', { opacity: 0, y: 32 });
      gsap.set('.hero-title-2', { opacity: 0, y: 32 });
      gsap.set('.hero-desc', { opacity: 0, y: 20 });
      gsap.set('.hero-action', { opacity: 0, y: 16 });
      gsap.set('.hero-card', { opacity: 0, y: 24, scale: 0.98 });
      gsap.set('.hero-scroll-cue', { opacity: 0, y: 10 });
      gsap.set('.hero-hairline', { scaleX: 0, transformOrigin: 'left center' });

      // Coordinated sequence
      tl.to('.hero-meta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.15,
      })
      .to('.hero-badge', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
      }, '-=0.5')
      .to('.hero-title-1', {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }, '-=0.4')
      .to('.hero-title-2', {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }, '-=0.7')
      .to('.hero-desc', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6')
      .to('.hero-action', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
      }, '-=0.6')
      .to('.hero-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
      }, '-=0.7')
      .to('.hero-hairline', {
        scaleX: 1,
        duration: 0.8,
      }, '-=0.6')
      .to('.hero-scroll-cue', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle Mouse Parallax (2–6px micro-movement)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;

    if (parallaxRef1.current) {
      gsap.to(parallaxRef1.current, {
        x: normX * 4,
        y: normY * 3,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    }

    if (parallaxRef2.current) {
      gsap.to(parallaxRef2.current, {
        x: normX * 6,
        y: normY * 5,
        duration: 0.9,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    }

    if (parallaxRef3.current) {
      gsap.to(parallaxRef3.current, {
        x: -normX * 3,
        y: -normY * 2,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section 
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-24 pb-8 overflow-hidden bg-[#0a0b0e] text-[#ededef] select-none"
    >
      {/* 1. Ambient Lighting & Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none grain-overlay z-0 opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-teal-950/20 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[400px] bg-emerald-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Subtle Hairlines Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-6 sm:left-12 lg:left-16 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-6 sm:right-12 lg:right-16 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-scanline pointer-events-none" />
      </div>

      {/* 2. Top Header Metadata Row */}
      <div 
        ref={parallaxRef3}
        className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4"
      >
        <div className="hero-meta flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-teal-400 font-semibold">
            01 / PORTFOLIO
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
            EDITION 2026
          </span>
        </div>

        <div className="hero-meta flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-zinc-200">AVAILABLE FOR ROLES</span>
          </span>
          <span className="hidden md:inline text-zinc-600">&bull;</span>
          <span className="hidden md:inline text-zinc-400">TAMIL NADU, INDIA [11°20'N · 77°44'E]</span>
        </div>
      </div>

      {/* 3. Main Hero Composition */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto my-auto py-10 sm:py-16 will-change-transform will-change-opacity"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Clean, Impactful, Premium Headline */}
          <div ref={parallaxRef1} className="lg:col-span-7 space-y-7">
            
            {/* Identity Badge */}
            <div className="hero-badge flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-teal-400" />
              <h2 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-teal-300 uppercase">
                FAHMIDHA AFRA J
              </h2>
            </div>

            {/* Unified Cohesive Headline */}
            <div className="space-y-1 sm:space-y-2">
              <div className="overflow-hidden">
                <h1 className="hero-title-1 text-5xl sm:text-7xl lg:text-8xl xl:text-[96px] font-extrabold tracking-tight text-white leading-[0.95]">
                  <LetterHoverText text="WEB" radius={100} />
                </h1>
              </div>

              <div className="overflow-hidden flex items-baseline gap-3">
                <h1 className="hero-title-2 text-5xl sm:text-7xl lg:text-8xl xl:text-[96px] font-extrabold tracking-tight text-teal-400 leading-[0.95]">
                  <LetterHoverText text="DEVELOPER" radius={100} accentColor="#ffffff" />
                </h1>
                <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-teal-400 animate-pulse shrink-0 self-center ml-1" />
              </div>
            </div>

            {/* Narrative statement */}
            <p className="hero-desc text-base sm:text-lg lg:text-xl text-zinc-300 font-light leading-relaxed max-w-xl">
              Designing, developing and shaping responsive, database-driven web applications through clean engineering and intentional craft.
            </p>

            {/* Action CTA Buttons */}
            <div className="hero-action flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                data-magnetic="true"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-lg shadow-teal-950/60 cursor-pointer"
              >
                <span>VIEW WORK</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>

              <a
                href="mailto:fahmidhaafra@gmail.com"
                data-magnetic="true"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-teal-400/50 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
              >
                <span>LET'S TALK</span>
                <span className="text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&#8599;</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Architectural Project & Discipline Overview */}
          <div ref={parallaxRef2} className="lg:col-span-5">
            <div className="hero-card relative p-7 sm:p-8 rounded-3xl bg-[#101217]/90 border border-white/[0.08] backdrop-blur-md shadow-2xl shadow-black/80 space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    SYSTEM PROFILE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-teal-400 px-2.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  FULL-STACK
                </span>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px] mb-1">
                    Specialization
                  </span>
                  <span className="text-zinc-200 font-medium">
                    React Frontend Architecture &bull; PHP REST APIs &bull; MySQL Database Design
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px] mb-1.5">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["React.js", "PHP", "MySQL", "JavaScript", "REST APIs", "Tailwind CSS"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#161821] border border-white/[0.06] text-zinc-300 text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px] mb-1">
                    Featured Productions
                  </span>
                  <div className="flex items-center gap-2 text-zinc-300 text-xs">
                    <span className="text-teal-300 font-semibold">ProActive</span>
                    <span className="text-zinc-600">&bull;</span>
                    <span className="text-teal-300 font-semibold">Nissi StyleNest</span>
                    <span className="text-zinc-600">&bull;</span>
                    <span className="text-teal-300 font-semibold">Siddha Care</span>
                  </div>
                </div>
              </div>

              {/* Quote note */}
              <p className="text-xs text-zinc-400 font-light italic border-l-2 border-teal-400/60 pl-3 leading-relaxed">
                “Building relational database workflows and modular components optimized for real business applications.”
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Footer Metadata & Minimal Scroll Cue */}
      <div 
        ref={indicatorRef}
        className="relative z-10 w-full flex items-end justify-between border-t border-white/[0.06] pt-4"
      >
        <div className="hero-scroll-cue hidden sm:flex items-center gap-3 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
          <span className="text-zinc-400">ENGINEERED IN TAMIL NADU</span>
          <span className="text-zinc-700">&bull;</span>
          <span className="text-teal-400">FAHMIDHA AFRA J</span>
        </div>

        <button
          onClick={onExploreClick}
          className="hero-scroll-cue flex items-center gap-3 text-right group cursor-pointer focus:outline-none ml-auto"
        >
          <div className="flex flex-col items-end font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 group-hover:text-teal-300 transition-colors leading-tight">
            <span>01</span>
            <span>SCROLL</span>
          </div>

          <div className="w-[1px] h-7 bg-white/10 relative overflow-hidden">
            <div className="w-full h-1/2 bg-teal-400 animate-scanline" />
          </div>

          <span className="text-xs font-mono text-zinc-500 group-hover:text-teal-300 group-hover:translate-y-0.5 transition-all">
            &darr;
          </span>
        </button>
      </div>

    </section>
  );
});

export default HeroSection;
