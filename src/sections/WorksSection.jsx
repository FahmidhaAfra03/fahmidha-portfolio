import React from 'react';
import { primaryProjects } from '../projects/data';
import ProjectImageCarousel from '../components/Works/ProjectImageCarousel';
import LetterHoverText from '../components/Typography/LetterHoverText';

export default function WorksSection({ onSelectProject }) {
  return (
    <section 
      id="works" 
      className="relative w-full py-14 sm:py-18 px-6 sm:px-12 bg-[#0b0c0e] border-t border-white/[0.06]"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[550px] bg-teal-950/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto space-y-14 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400">
                Selected Works
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              <LetterHoverText text="MY WORKS" />
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 font-light">
              Selected projects I've built.
            </p>
          </div>

          <div className="text-left md:text-right flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span>SHOWCASE:</span>
              <span className="text-teal-300 font-bold">03</span>
              <span className="text-zinc-500">FEATURED PROJECTS</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PROJECTS SHOWCASE LIST — Each Project with Its Dedicated Visual */}
        {/* ============================================================== */}
        <div className="space-y-20 lg:space-y-28">
          {primaryProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* LEFT COLUMN: Project Details Card */}
              <div 
                onClick={() => onSelectProject(project)}
                className="lg:col-span-5 relative p-7 sm:p-9 rounded-3xl bg-[#121319] border border-teal-500/30 hover:border-teal-400/60 shadow-2xl shadow-black/80 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                {/* Active Accent Vertical Bar */}
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-teal-400" />

                <div className="space-y-6">
                  {/* Project Number & Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-mono font-bold text-teal-300">
                      {project.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Brand */}
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug group-hover:text-teal-200 transition-colors">
                      {project.title}
                    </h3>
                    {project.brand && (
                      <p className="text-xs font-mono text-teal-400/90 tracking-wide">
                        {project.brand}
                      </p>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Capabilities */}
                  {project.features && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                        Key Capabilities
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                        {project.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Stack */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-[#181a22] border border-white/[0.06] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Project & Live Site Action Bar */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold bg-teal-500 text-black hover:bg-teal-400 shadow-md shadow-teal-950/50 transition-all duration-300"
                  >
                    <span>VIEW PROJECT</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono text-teal-400 hover:text-teal-300 hover:underline flex items-center gap-1 transition-colors"
                    >
                      <span>Live Site</span>
                      <span>&nearr;</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-500">
                      Full Details &rarr;
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Dedicated Project Image Visual */}
              {project.images && project.images.length > 1 ? (
                /* Multi-image projects (ProActive & Nissi StyleNest): 4-image automatic 2-second carousel + mousewheel scroll switching */
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <ProjectImageCarousel
                    images={project.images}
                    title={project.title}
                    defaultTag={project.brand || project.category || "Interactive Project Showcase"}
                    onSelectProject={() => onSelectProject(project)}
                    liveUrl={project.liveUrl}
                  />
                </div>
              ) : (
                /* Single image projects: Crisp uncropped showcase */
                <div 
                  onClick={() => onSelectProject(project)}
                  data-cursor="project"
                  className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] rounded-3xl overflow-hidden bg-[#0d0f14] border border-white/[0.1] hover:border-teal-500/40 shadow-2xl shadow-black/80 cursor-pointer group/img transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Top Floating Editorial Tag */}
                  <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span>{project.title}</span>
                    </div>
                  </div>

                  {/* Center Screenshot (crisp object-contain, no pixelation) */}
                  <div className="relative flex-1 w-full flex items-center justify-center p-3 sm:p-5">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl filter brightness-[0.95] group-hover/img:brightness-100 transition-all duration-500"
                        style={{ imageRendering: 'auto' }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 font-mono text-sm space-y-2">
                        <span className="text-xl font-bold text-white">{project.number}</span>
                        <span>{project.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar: Live Indicator + Inspect Prompt */}
                  <div className="relative z-10 p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none border-t border-white/[0.04] bg-gradient-to-t from-black/80 to-transparent">
                    {project.liveUrl ? (
                      <div className="px-3.5 py-1.5 rounded-xl bg-teal-500/15 backdrop-blur-md border border-teal-500/30 text-[11px] font-mono text-teal-300 flex items-center gap-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>Live Production &bull; {project.liveUrl.replace('https://', '').replace('/', '')}</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
                        Interactive Project Showcase
                      </div>
                    )}

                    <div className="px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 group-hover/img:border-teal-400/50 text-xs font-mono text-zinc-200 flex items-center gap-2 transition-colors shadow-lg ml-auto">
                      <span>Click to Inspect Full Details</span>
                      <span className="text-teal-400 group-hover/img:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
