import React, { useEffect } from 'react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f1115] border border-white/[0.09] shadow-2xl p-6 sm:p-10 text-white my-auto custom-scrollbar animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Back Action */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-mono text-teal-400 font-bold">{project.number}</span>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all"
          >
            <span>&larr; BACK TO PROJECTS</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-10 py-8">
          
          {/* Project Title */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-zinc-400">
              {project.tagline}
            </p>
          </div>

          {/* Project Screenshots */}
          {project.image && (
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Project Screenshots
              </span>
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/70 border border-white/[0.08] shadow-xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto max-h-[420px] object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400 font-semibold">
              Overview
            </h3>
            <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          {/* The Problem & The Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#14151b] border border-rose-500/20 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                The Problem
              </h4>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14151b] border border-teal-500/20 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                The Solution
              </h4>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400 font-semibold">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#14151b] border border-white/[0.05] text-sm text-zinc-300 font-light">
                  <span className="text-teal-400 font-bold">&bull;</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Used */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400 font-semibold">
              Technology Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#14151b] border border-white/[0.08] text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* My Role */}
          <div className="p-6 rounded-2xl bg-[#14151b] border border-teal-500/20 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-teal-300 font-semibold">
              My Role
            </h3>
            <p className="text-sm text-zinc-200 font-light leading-relaxed">
              {project.role}
            </p>
          </div>

          {/* Project Links (GitHub & Live) */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                >
                  <span>View on GitHub</span>
                  <span>&rarr;</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <span>Live Website</span>
                  <span>&nearr;</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider"
            >
              &larr; Back to Projects
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
