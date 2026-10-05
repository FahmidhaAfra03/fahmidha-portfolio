import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/Hero/HeroSection';
import AboutIntroSection from './components/About/AboutIntroSection';
import WorksSection from './sections/WorksSection';
import SkillsExperienceSection from './components/SkillsExperience/SkillsExperienceSection';
import ContactSection from './components/Contact/ContactSection';
import ProjectDetailModal from './components/ProjectDetail/ProjectDetailModal';
import CustomCursor from './components/Cursor/CustomCursor';
import EditorialCover from './components/Intro/EditorialCover';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLandingOpen, setIsLandingOpen] = useState(false);

  // Transition Refs for Hero
  const heroWrapperRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth section spies for navigation
      ScrollTrigger.create({
        trigger: '#hero-wrapper',
        start: 'top top',
        end: 'bottom 50%',
        onEnter: () => setActiveSection('hero'),
        onEnterBack: () => setActiveSection('hero'),
      });

      const sections = [
        { id: 'about', label: 'about' },
        { id: 'works', label: 'works' },
        { id: 'experience', label: 'experience' },
        { id: 'contact', label: 'contact' }
      ];

      sections.forEach(({ id, label }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(label),
          onEnterBack: () => setActiveSection(label),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavigate = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c0e] text-[#ededef]">
      {/* Editorial Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navigation (Appears only when landing page opens) */}
      <Navigation 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        isVisible={isLandingOpen}
      />

      {/* Main Flow */}
      <main className="w-full">
        {/* EDITORIAL COVER UNFOLDING INTO EXISTING HERO SECTION */}
        <div ref={heroWrapperRef} id="hero-wrapper" className="relative w-full">
          <EditorialCover onOpenChange={setIsLandingOpen}>
            <HeroSection 
              contentRef={heroContentRef}
              indicatorRef={heroIndicatorRef}
              onExploreClick={() => handleNavigate('works')}
            />
          </EditorialCover>
        </div>

        {/* REST OF PORTFOLIO: Connected Continuous Experience */}
        <div className="relative z-10 bg-[#0b0c0e]">
          
          {/* ABOUT ME / INTRO */}
          <AboutIntroSection />

          {/* MY WORKS: Editorial Interactive Showcase */}
          <WorksSection 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />

          {/* SKILLS, EXPERIENCE & EDUCATION */}
          <SkillsExperienceSection />

          {/* LET'S CONNECT */}
          <ContactSection />

        </div>
      </main>

      {/* Dedicated Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
