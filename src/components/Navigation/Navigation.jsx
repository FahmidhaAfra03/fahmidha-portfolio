import React, { useState, useEffect } from 'react';

export default function Navigation({ activeSection, onNavigate, isVisible = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold: navigation appears only when user unfolds/opens the landing page
      const threshold = window.innerHeight * 0.28;
      setNavVisible(window.scrollY > threshold);
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const shouldShow = isVisible !== null ? isVisible : navVisible;

  const navItems = [
    { id: 'works', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONNECT' }
  ];

  const handleItemClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 sm:px-8 transition-all duration-500 ease-out ${
        shouldShow 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-12 pointer-events-none'
      }`}
    >
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-5 sm:px-7 py-3 rounded-2xl transition-all duration-300 border ${
          scrolled
            ? 'bg-[#101115]/90 border-white/[0.08] shadow-xl shadow-black/50 backdrop-blur-md'
            : 'bg-[#101115]/40 border-white/[0.05] backdrop-blur-sm'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-xs font-bold flex items-center justify-center group-hover:border-teal-400/50 group-hover:bg-teal-500/20 transition-all">
            FA
          </span>
          <span className="hidden sm:inline-block font-medium tracking-wide text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors">
            FAHMIDHA AFRA J
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-teal-300 bg-teal-500/10 border border-teal-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Quick Contact CTA on Desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => handleItemClick('contact')}
            data-magnetic="true"
            className="px-4 py-1.5 rounded-lg bg-white/[0.05] hover:bg-teal-500 hover:text-black border border-white/10 hover:border-teal-400 text-zinc-300 text-xs font-mono uppercase tracking-wider transition-all duration-200"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-5 rounded-2xl bg-[#121318] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-2 z-50 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'bg-teal-500/10 text-teal-300 font-semibold border border-teal-500/20'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleItemClick('contact')}
            className="w-full mt-2 text-center py-3 rounded-xl bg-teal-500 text-black font-mono text-xs uppercase tracking-wider font-semibold"
          >
            Get In Touch &rarr;
          </button>
        </div>
      )}
    </header>
  );
}
