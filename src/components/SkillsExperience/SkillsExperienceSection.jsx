import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsCategories, experienceData, educationData } from '../../projects/data';
import LetterHoverText from '../Typography/LetterHoverText';

gsap.registerPlugin(ScrollTrigger);

const marqueeKeywords = [
  "React.js",
  "PHP",
  "MySQL",
  "JavaScript",
  "HTML5",
  "CSS3",
  "REST APIs",
  "CRUD Operations",
  "Tailwind CSS",
  "Bootstrap",
  "Git & GitHub",
  "VS Code",
  "XAMPP",
  "Antigravity AI"
];

export default function SkillsExperienceSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingLineRef = useRef(null);
  const skillsContainerRef = useRef(null);

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
              trigger: headingRef.current,
              start: 'top 85%',
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
              trigger: headingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Staggered reveal for skills categories & items
      const categoryBlocks = skillsContainerRef.current?.querySelectorAll('.skill-category-block');
      if (categoryBlocks) {
        categoryBlocks.forEach((block) => {
          const header = block.querySelector('.category-header');
          const items = block.querySelectorAll('.skill-item');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              once: true,
            }
          });

          if (header) {
            tl.fromTo(
              header,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
            );
          }

          if (items && items.length > 0) {
            tl.fromTo(
              items,
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                duration: 0.6,
                ease: 'power3.out',
              },
              '-=0.2'
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative w-full py-14 sm:py-18 px-6 sm:px-12 bg-[#0b0c0e] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto space-y-16 sm:space-y-20">
        
        {/* ============================================================== */}
        {/* SKILLS & TECHNOLOGIES — Editorial Typographic Showcase */}
        {/* ============================================================== */}
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400 font-semibold">
                  Capabilities &bull; Stack
                </span>
              </div>
              
              <div className="overflow-hidden pb-1">
                <h2 
                  ref={headingRef}
                  className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans inline-block"
                >
                  <LetterHoverText text="SKILLS & TECHNOLOGIES" />
                </h2>
              </div>
              <div 
                ref={headingLineRef}
                className="w-16 h-[2px] bg-gradient-to-r from-teal-400 to-transparent origin-left"
              />

              <p className="text-base sm:text-lg text-zinc-400 font-light pt-1">
                Core technologies and development workflows applied in real client builds.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                02 / Technical Domain
              </span>
              <span className="text-xs font-mono text-teal-400">
                Full-Stack Architecture
              </span>
            </div>
          </div>

          {/* Slow Continuous Horizontal Marquee (Infinite Typography in Motion) */}
          <div className="relative w-full overflow-hidden py-4 border-y border-white/[0.06] bg-black/30 select-none">
            <div className="animate-marquee-slow text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-zinc-400 flex items-center">
              {marqueeKeywords.concat(marqueeKeywords).map((word, i) => (
                <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
                  <span className="hover:text-teal-300 transition-colors cursor-default">{word}</span>
                  <span className="text-teal-400/50 text-xs font-mono">&bull;</span>
                </span>
              ))}
            </div>
          </div>

          {/* EDITORIAL SKILLS SYSTEM (No generic badges/cards, pure typography & motion) */}
          <div 
            ref={skillsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 pt-4"
          >
            {skillsCategories.map((cat, catIdx) => {
              const formattedNumber = `0${catIdx + 1}`;

              return (
                <div 
                  key={cat.name}
                  className="skill-category-block space-y-6"
                >
                  {/* Category Header with Editorial Index & Thin Hairline */}
                  <div className="category-header space-y-3 pb-3 border-b border-white/[0.1]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-teal-400 tracking-widest font-semibold">
                        {formattedNumber} / CATEGORY
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.dot || 'bg-teal-400'}`} />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-mono tracking-wider text-white uppercase">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Vertically Spaced Designed Typographic Objects */}
                  <div className="space-y-4">
                    {cat.skills.map((skill, skillIdx) => (
                      <div 
                        key={skill}
                        data-cursor="tech"
                        className="skill-item group block cursor-default"
                      >
                        <div className="flex items-baseline justify-between py-1 transition-all duration-300 group-hover:translate-x-2">
                          {/* Skill Name with Subtle Letter Spacing & Color Transition on Hover */}
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono text-zinc-600 group-hover:text-teal-400 transition-colors">
                              0{skillIdx + 1}
                            </span>
                            <span className="text-base sm:text-lg font-medium text-zinc-200 group-hover:text-white group-hover:tracking-wide transition-all duration-300">
                              {skill}
                            </span>
                          </div>

                          {/* Subtle Micro-Arrow revealing on hover */}
                          <span className="text-teal-400 text-xs font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            &rarr;
                          </span>
                        </div>

                        {/* Thin Underline Divider that Illuminates on Hover */}
                        <div className="w-full h-[1px] bg-white/[0.05] group-hover:bg-teal-400/40 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXPERIENCE & EDUCATION SUB-SECTION (Preserved & Refined) */}
        {/* ============================================================== */}
        <div className="pt-16 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Experience Column (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400 font-semibold">
                Work History
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              <LetterHoverText text="PRACTICAL EXPERIENCE" />
            </h3>

            <div className="p-7 sm:p-8 rounded-3xl bg-[#111318] border border-white/[0.08] hover:border-teal-500/30 transition-all duration-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {experienceData.role}
                  </h4>
                  <p className="text-xs font-mono text-teal-300 mt-1">
                    {experienceData.company} &bull; {experienceData.duration}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {experienceData.location}
                </span>
              </div>

              <ul className="space-y-3 text-sm text-zinc-300 font-light leading-relaxed">
                {experienceData.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal-400 font-mono text-xs mt-1">&rarr;</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education Column (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400 font-semibold">
                Academic Background
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              <LetterHoverText text="EDUCATION" />
            </h3>

            <div className="p-7 sm:p-8 rounded-3xl bg-[#111318] border border-white/[0.08] hover:border-teal-500/30 transition-all duration-300 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block font-semibold">
                  Graduation {educationData.year}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {educationData.degree}
                </h4>
                <p className="text-sm font-mono text-zinc-300">
                  {educationData.institution}
                </p>
                <p className="text-xs font-mono text-zinc-500">
                  {educationData.location}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Degree Status</span>
                <span className="text-teal-300 font-medium">Completed / Verified</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
