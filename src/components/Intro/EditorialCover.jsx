import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * EditorialCover
 * 
 * Immersive opening frame for the portfolio based on the concept:
 * "EDITORIAL COVER → UNFOLD → PORTFOLIO HERO"
 * 
 * Behavior:
 * - Serves as the physical first frame of the website at scroll position 0.
 * - Presents an asymmetric editorial composition on deep #0A0A0A with architectural grain.
 * - When the user scrolls, the cover behaves like physical layers being pulled apart:
 *   - The top shutter & typography slide smoothly upward.
 *   - The bottom shutter & typography slide smoothly downward.
 *   - The center seam separates, opening up the central space.
 *   - The existing portfolio hero is revealed directly underneath.
 */
export default function EditorialCover({ children, onOpenChange }) {
  const containerRef = useRef(null);
  const heroUnderneathRef = useRef(null);
  const coverWrapperRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const seamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll-driven unfolding timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=75%', // 75vh of natural scroll scrub to complete the unfold
          pin: true,
          scrub: 0.8, // Smooth scrub with slight momentum
          anticipatePin: 1,
          onUpdate: (self) => {
            if (onOpenChange) {
              onOpenChange(self.progress >= 0.28);
            }
          },
          onLeave: () => {
            // Once fully unfolded, ensure cover doesn't intercept clicks
            if (coverWrapperRef.current) {
              coverWrapperRef.current.style.pointerEvents = 'none';
            }
            if (onOpenChange) onOpenChange(true);
          },
          onEnterBack: () => {
            // Restore pointer events if scrolling back to the very top
            if (coverWrapperRef.current) {
              coverWrapperRef.current.style.pointerEvents = 'auto';
            }
          },
        },
      });

      // 1. Top shutter slides smoothly upward and clip-path retracts
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          ease: 'power2.inOut',
        },
        0
      );

      // Top typography moves upward with subtle letter-spacing change and fade
      tl.to(
        topTextRef.current,
        {
          y: -60,
          opacity: 0.15,
          letterSpacing: '0.2em',
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Bottom shutter slides smoothly downward and clip-path retracts
      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          ease: 'power2.inOut',
        },
        0
      );

      // Bottom typography moves downward with subtle fade
      tl.to(
        bottomTextRef.current,
        {
          y: 60,
          opacity: 0.15,
          letterSpacing: '0.3em',
          ease: 'power2.inOut',
        },
        0
      );

      // 3. Center hairline seam dissolves
      tl.to(
        seamRef.current,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        },
        0
      );

      // 4. Hero section underneath emerges from behind the opening space
      if (heroUnderneathRef.current) {
        tl.fromTo(
          heroUnderneathRef.current,
          {
            scale: 0.97,
            filter: 'blur(4px)',
            opacity: 0.75,
          },
          {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
            ease: 'power2.out',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleUnfoldClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#0A0A0A]"
    >
      {/* ============================================================== */}
      {/* 1. EXISTING HERO SECTION (Sitting physically underneath) */}
      {/* ============================================================== */}
      <div 
        ref={heroUnderneathRef} 
        className="relative z-10 w-full h-full will-change-transform"
      >
        {children}
      </div>

      {/* ============================================================== */}
      {/* 2. EDITORIAL COVER LAYERS (Unfolding Shutter Panels) */}
      {/* ============================================================== */}
      <div
        ref={coverWrapperRef}
        className="absolute inset-0 z-[60] pointer-events-auto select-none overflow-hidden"
      >
        {/* Grain Overlay across both shutters */}
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30 z-30" />

        {/* ------------------------------------------------------------ */}
        {/* TOP PANEL (Upper half of the editorial composition) */}
        {/* ------------------------------------------------------------ */}
        <div
          ref={topPanelRef}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] border-b border-white/[0.07] overflow-hidden will-change-transform z-20 flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-7 pb-4"
        >
          {/* Top Editorial Metadata Row */}
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 font-semibold">
                01 / COVER
              </span>
              <span className="text-zinc-600 font-mono text-xs">&bull;</span>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase hidden sm:inline">
                EDITION 2026
              </span>
            </div>

            <div className="font-mono text-xs tracking-widest text-zinc-400 uppercase flex items-center gap-2">
              <span className="hidden md:inline">TAMIL NADU, INDIA [11°20'N · 77°44'E]</span>
              <span className="hidden md:inline text-zinc-600">&bull;</span>
              <span className="text-zinc-300">AVAILABLE FOR ROLES</span>
            </div>
          </div>

          {/* Asymmetric Name Display (Anchored at lower edge of top shutter) */}
          <div ref={topTextRef} className="space-y-1 will-change-transform my-auto sm:my-0">
            <span className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-[0.3em] block">
              PORTFOLIO ARCHIVE &bull; 01
            </span>
            <h1 className="font-sans font-extrabold uppercase text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.02em] text-white leading-none">
              FAHMIDHA AFRA J
            </h1>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CENTER SEAM HAIRLINE (Visual dividing rule between shutters) */}
        {/* ------------------------------------------------------------ */}
        <div
          ref={seamRef}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent pointer-events-none z-30 will-change-transform"
        />

        {/* ------------------------------------------------------------ */}
        {/* BOTTOM PANEL (Lower half of the editorial composition) */}
        {/* ------------------------------------------------------------ */}
        <div
          ref={bottomPanelRef}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] border-t border-white/[0.07] overflow-hidden will-change-transform z-20 flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-5 pb-7"
        >
          {/* Asymmetric Role Display (Anchored at upper edge of bottom shutter) */}
          <div ref={bottomTextRef} className="space-y-1 will-change-transform my-auto sm:my-0">
            <div className="flex items-center gap-3">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.25em] text-teal-300 font-bold">
                WEB DEVELOPER
              </h2>
            </div>
          </div>

          {/* Bottom Metadata & Unfold Interaction Cue */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/[0.05] pt-4">
            <div className="font-mono text-xs text-zinc-400 space-y-1">
              <span className="text-zinc-600 block text-[10px] uppercase tracking-widest font-semibold">
                DISCIPLINE &bull; ARCHITECTURE
              </span>
              <div className="text-zinc-300">
                2026 &bull; DIGITAL WORK &bull; CLIENT PRODUCTIONS
              </div>
              <div className="text-zinc-500 text-[11px]">
                REACT.JS &bull; PHP &bull; MYSQL &bull; REST APIS
              </div>
            </div>

            {/* Unfold Interaction Cue */}
            <button
              onClick={handleUnfoldClick}
              className="group inline-flex items-center gap-3 text-right cursor-pointer self-start sm:self-auto focus:outline-none"
              aria-label="Scroll or click to unfold editorial cover"
            >
              <div className="flex flex-col items-start sm:items-end font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 group-hover:text-teal-300 transition-colors">
                <span className="text-teal-400">01</span>
                <span>SCROLL TO UNFOLD</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-teal-400/70 bg-white/[0.02] flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/10">
                <span className="text-teal-400 group-hover:translate-y-0.5 transition-transform text-xs font-mono">
                  &darr;
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
