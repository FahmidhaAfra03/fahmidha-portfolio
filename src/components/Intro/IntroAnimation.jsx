import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * IntroAnimation
 * 
 * Cinematic studio-grade opening sequence for the portfolio.
 * Sequence:
 * Phase 1: Pure #0A0A0A dark screen with subtle grain.
 * Phase 2: "FAHMIDHA AFRA J" reveals smoothly in the visual center with tightening letter-spacing.
 * Phase 3: Secondary identity "WEB DEVELOPER" + metadata appears.
 * Phase 4: Typography gracefully collapses inward into a single thin horizontal hairline.
 * Phase 5: High-speed horizontal "WOOSH" wipe sweeps across the viewport.
 * Phase 6: Intro screen wipes away cleanly, revealing the existing portfolio hero underneath.
 * 
 * Target duration: ~2.6s - 2.8s. Plays only once on initial page load.
 */
export default function IntroAnimation({ onComplete }) {
  const [isDone, setIsDone] = useState(false);

  const overlayRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const nameTextRef = useRef(null);
  const lineRef = useRef(null);
  const detailRef = useRef(null);
  const wooshBladeRef = useRef(null);

  useEffect(() => {
    // Prevent background scrolling while intro is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.overflow = '';
          setIsDone(true);
          if (onComplete) onComplete();
        }
      });

      // Initial positions & setup
      gsap.set(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });
      gsap.set(nameTextRef.current, {
        opacity: 0,
        y: 16,
        letterSpacing: '0.22em',
      });
      gsap.set(detailRef.current, {
        opacity: 0,
        y: 10,
      });
      gsap.set(lineRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'center center',
      });
      gsap.set(wooshBladeRef.current, {
        left: '-15%',
        opacity: 0,
      });

      // -------------------------------------------------------------
      // PHASE 2 — Name Reveal (0.25s - 1.05s)
      // -------------------------------------------------------------
      tl.to(nameTextRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.12em',
        duration: 0.85,
        ease: 'power3.out',
      }, 0.25);

      // -------------------------------------------------------------
      // PHASE 3 — Identity Detail (1.05s - 1.45s)
      // -------------------------------------------------------------
      tl.to(detailRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      }, 1.0);

      // -------------------------------------------------------------
      // PHASE 4 — Typography Collapse (1.45s - 1.95s)
      // -------------------------------------------------------------
      // Secondary details fade out cleanly
      tl.to(detailRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.35,
        ease: 'power2.in',
      }, 1.45);

      // Name text letter spacing tightens and compresses horizontally
      tl.to(nameTextRef.current, {
        letterSpacing: '-0.04em',
        scaleX: 0.75,
        duration: 0.42,
        ease: 'power2.in',
      }, 1.5);

      // Text collapses into flat horizontal hairline
      tl.to(nameTextRef.current, {
        opacity: 0,
        scaleY: 0.05,
        scaleX: 0.2,
        duration: 0.2,
        ease: 'power3.in',
      }, 1.85);

      // Center hairline materializes and expands
      tl.to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.22,
        ease: 'power2.out',
      }, 1.82);

      // -------------------------------------------------------------
      // PHASE 5 — WOOSH Transition (2.05s - 2.65s)
      // -------------------------------------------------------------
      // Hairline accelerates into horizontal sweep
      tl.to(lineRef.current, {
        scaleX: 2.5,
        xPercent: 100,
        opacity: 0,
        duration: 0.35,
        ease: 'power4.in',
      }, 2.05);

      // Sweeping light blade across screen
      tl.to(wooshBladeRef.current, {
        left: '115%',
        opacity: 1,
        duration: 0.55,
        ease: 'power4.inOut',
      }, 2.08);

      // Overlay mask sweeps horizontally from left to right
      tl.to(overlayRef.current, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        duration: 0.58,
        ease: 'power4.inOut',
      }, 2.12);

      // Final opacity safety fade
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'none',
      }, 2.6);

    }, overlayRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <aside 
      ref={overlayRef}
      className="fixed inset-0 z-[100000] bg-[#0A0A0A] flex items-center justify-center overflow-hidden pointer-events-auto select-none will-change-transform"
      aria-hidden="true"
    >
      {/* Subtle architectural grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />

      {/* Center Typography Container */}
      <div 
        ref={contentWrapperRef} 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-full"
      >
        {/* Name Title & Center Line Collapse */}
        <div className="relative flex items-center justify-center overflow-visible">
          <h1 
            ref={nameTextRef}
            className="font-sans font-extrabold uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F4F4F0] tracking-[0.18em] whitespace-nowrap will-change-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            FAHMIDHA AFRA J
          </h1>

          {/* Thin horizontal collapse hairline */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-full max-w-md bg-gradient-to-r from-transparent via-teal-300 to-transparent pointer-events-none will-change-transform"
          />
        </div>

        {/* Identity Subtitle Details */}
        <div 
          ref={detailRef}
          className="mt-4 sm:mt-5 flex flex-col items-center gap-1.5 will-change-transform"
        >
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-teal-400 font-semibold">
            WEB DEVELOPER
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            2026 &bull; FULL-STACK ARCHITECTURE
          </span>
        </div>
      </div>

      {/* Sweeping Woosh Blade Ray */}
      <div 
        ref={wooshBladeRef}
        className="absolute top-0 bottom-0 w-3 bg-gradient-to-r from-transparent via-teal-300 to-transparent blur-[2px] shadow-[0_0_30px_rgba(45,212,191,0.9)] pointer-events-none will-change-transform"
      />
    </aside>
  );
}
