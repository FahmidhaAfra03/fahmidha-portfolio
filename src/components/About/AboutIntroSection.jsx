import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LetterHoverText from '../Typography/LetterHoverText';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntroSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingLineRef = useRef(null);
  const textContainerRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading masked typographic slide-up
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 2. Heading underline expand
      if (headingLineRef.current) {
        gsap.fromTo(
          headingLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 3. Staggered reveal of editorial text lines
      const lines = textContainerRef.current?.querySelectorAll('.editorial-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.14,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 4. Staggered reveal for value pillars
      const pillars = pillarsRef.current?.children;
      if (pillars && pillars.length > 0) {
        gsap.fromTo(
          pillars,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative w-full py-14 sm:py-18 px-6 sm:px-12 bg-[#0b0c0e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle Ambient Depth */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-950/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto space-y-12 sm:space-y-14">
        
        {/* Section Label & Editorial Number */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400 font-semibold">
              Introduction
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            01 / Background &amp; Craft
          </span>
        </div>

        {/* Section Heading with Typographic Motion */}
        <div className="space-y-3">
          <div className="overflow-hidden pb-1">
            <h2 
              ref={headingRef}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans inline-block"
            >
              <LetterHoverText text="ABOUT ME" />
            </h2>
          </div>
          <div 
            ref={headingLineRef}
            className="w-16 h-[2px] bg-gradient-to-r from-teal-400 to-transparent origin-left"
          />
        </div>

        {/* ============================================================== */}
        {/* EDITORIAL STATEMENT — Balanced, Cohesive, Professional Scale */}
        {/* ============================================================== */}
        <div 
          ref={textContainerRef}
          className="space-y-4 max-w-4xl text-left"
        >
          {/* Line 1 */}
          <div className="editorial-line">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] text-zinc-400 font-light leading-[1.65] tracking-[-0.015em]">
              <span className="text-zinc-200 font-normal">Web Developer</span> with{' '}
              <span className="text-white font-medium">6 months of experience</span> building{' '}
              <span className="text-white font-medium">responsive web applications</span>
            </p>
          </div>

          {/* Line 2 */}
          <div className="editorial-line">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] text-zinc-400 font-light leading-[1.65] tracking-[-0.015em]">
              using{' '}
              <span className="text-teal-300 font-mono text-[0.9em] font-medium">React.js</span>,{' '}
              <span className="text-teal-300 font-mono text-[0.9em] font-medium">PHP</span>,{' '}
              <span className="text-teal-300 font-mono text-[0.9em] font-medium">MySQL</span>, and{' '}
              <span className="text-teal-300 font-mono text-[0.9em] font-medium">JavaScript</span>,
            </p>
          </div>

          {/* Line 3 */}
          <div className="editorial-line">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] text-zinc-400 font-light leading-[1.65] tracking-[-0.015em]">
              with hands-on focus in{' '}
              <span className="text-white font-medium">admin dashboard development</span>,{' '}
              <span className="text-teal-300 font-mono text-[0.88em] uppercase tracking-wider font-medium">REST API</span> integration, and{' '}
              <span className="text-white font-medium">CRUD operations</span>.
            </p>
          </div>
        </div>

        {/* Editorial Divider & Metadata Strip */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono uppercase tracking-wider font-medium">
              Currently Learning
            </span>
            <span className="text-sm font-mono text-zinc-300">
              ASP.NET Core &bull; Modern Web Development
            </span>
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            <span>ECE Graduate 2025 &bull; SRM TRP</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3 VALUE PILLARS — Handcrafted Editorial Columns */}
        {/* ============================================================== */}
        <div 
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
        >
          {/* 01 Architecture */}
          <div className="group relative p-7 rounded-3xl bg-[#111318] border border-white/[0.07] hover:border-teal-500/40 space-y-4 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
                01 / ARCHITECTURE
              </span>
              <span className="text-teal-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-xs">
                &rarr;
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-teal-200 transition-colors">
              Relational Database Design
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Crafting structured MySQL schemas, optimized queries, and solid CRUD workflows that stand up to real business data.
            </p>
          </div>

          {/* 02 Backend APIs */}
          <div className="group relative p-7 rounded-3xl bg-[#111318] border border-white/[0.07] hover:border-sky-500/40 space-y-4 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
                02 / BACKEND APIS
              </span>
              <span className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-xs">
                &rarr;
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors">
              RESTful Integration
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Writing clean, modular PHP endpoints that communicate cleanly with frontend components using JSON payloads.
            </p>
          </div>

          {/* 03 Interface */}
          <div className="group relative p-7 rounded-3xl bg-[#111318] border border-white/[0.07] hover:border-indigo-500/40 space-y-4 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                03 / INTERFACE
              </span>
              <span className="text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-xs">
                &rarr;
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
              Responsive React UIs
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Developing modern, accessible single-page interfaces with clean state management, modular components, and fast loading.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
