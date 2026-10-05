import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ProActiveImageCarousel
 * 
 * An editorial 4-image rotating showcase specifically for the ProActive Physiotherapy project.
 * Features:
 * - 4 real screenshots
 * - Automatic 2-second continuous rotation
 * - Manual mouse-wheel scroll switching (with 400ms throttle and passive: false preventDefault)
 * - Immediate timer reset on manual interaction
 * - object-contain rendering for maximum clarity without cropping or pixelation
 * - Subtle slide + crossfade transitions without dramatic zooming
 * - Image preloading to eliminate blank flashes
 * - Mobile-friendly touch without blocking vertical page scroll
 */
export default function ProActiveImageCarousel({ 
  images = [], 
  onSelectProject, 
  liveUrl 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'
  const [timerKey, setTimerKey] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  const total = images.length;

  // 1. Preload all 4 real images immediately
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((item) => {
      if (item.src) {
        const img = new Image();
        img.src = item.src;
      }
    });
  }, [images]);

  // Next / Prev navigation functions with timer reset
  const goToNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimerKey((k) => k + 1);
  }, [total]);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimerKey((k) => k + 1);
  }, [total]);

  const goToIndex = useCallback((index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setTimerKey((k) => k + 1);
  }, [currentIndex]);

  // 2. Automatic 2-second rotation
  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2000);

    return () => clearInterval(timer);
  }, [timerKey, total]);

  // 3. Manual Mouse-wheel Scroll Interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container || total <= 1) return;

    const handleWheel = (e) => {
      // Ignore tiny jitter movements
      if (Math.abs(e.deltaY) < 18) return;

      // Prevent the page from scrolling when cursor is actively over this image area
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      // 380ms throttle so one deliberate wheel notch moves exactly one slide
      if (now - lastScrollTimeRef.current < 380) return;
      lastScrollTimeRef.current = now;

      if (e.deltaY > 0) {
        // Scrolling down -> advance to next image
        goToNext();
      } else {
        // Scrolling up -> advance to previous image
        goToPrev();
      }
    };

    // Use passive: false so preventDefault stops page scroll while over the image area
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [goToNext, goToPrev, total]);

  const activeImage = images[currentIndex] || images[0] || {};

  return (
    <div
      ref={containerRef}
      onClick={onSelectProject}
      className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] rounded-3xl overflow-hidden bg-[#0d0f14] border border-white/[0.1] hover:border-teal-500/40 shadow-2xl shadow-black/80 cursor-pointer group/carousel transition-colors duration-500 flex flex-col justify-between select-none"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-radial-gradient from-teal-950/10 via-transparent to-black/60 pointer-events-none" />

      {/* TOP FLOATING BAR: Live caption & slide step indicators */}
      <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between gap-3 pointer-events-none">
        {/* Left: Active Screen Caption & Pulsing Live Indicator */}
        <div className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="truncate max-w-[210px] sm:max-w-xs">
            {activeImage.caption || "ProActive Clinical Platform"}
          </span>
        </div>

        {/* Right: Interactive 4-Bar Slide Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 pointer-events-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Jump to ProActive screenshot ${idx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-teal-400'
                  : 'w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
          <span className="text-[10px] font-mono text-zinc-400 ml-1">
            0{currentIndex + 1}/0{total}
          </span>
        </div>
      </div>

      {/* CENTER: 4 SCREENSHOTS SLIDES (subtle horizontal slide + crossfade, crisp object-contain) */}
      <div className="relative flex-1 w-full flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {images.map((item, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={item.src || index}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full p-3 sm:p-5 flex items-center justify-center transition-all duration-500 ease-out ${
                isActive
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                  : index < currentIndex
                  ? 'opacity-0 -translate-x-3 pointer-events-none z-0'
                  : 'opacity-0 translate-x-3 pointer-events-none z-0'
              }`}
            >
              <img
                src={item.src}
                alt={item.alt || `ProActive Physiotherapy Screenshot ${index + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-opacity duration-500"
                style={{
                  imageRendering: 'auto',
                }}
                loading="eager"
              />
            </div>
          );
        })}
      </div>

      {/* BOTTOM FLOATING BAR: Live Site link, scroll cue & inspect prompt */}
      <div className="relative z-20 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none border-t border-white/[0.04] bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        {/* Left: Live Production Tag */}
        {liveUrl ? (
          <div className="px-3 py-1.5 rounded-xl bg-teal-500/15 backdrop-blur-md border border-teal-500/30 text-[11px] font-mono text-teal-300 flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>Live Production &bull; {liveUrl.replace('https://', '').replace('/', '')}</span>
          </div>
        ) : (
          <div className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
            Real Clinical Platform
          </div>
        )}

        {/* Middle: Manual Scroll / Auto Cue (hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-zinc-400">
          <svg className="w-3 h-3 text-teal-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>Scroll over image to cycle</span>
        </div>

        {/* Right: Click to Inspect prompt */}
        <div className="px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 group-hover/carousel:border-teal-400/50 text-xs font-mono text-zinc-200 flex items-center gap-2 transition-colors shadow-lg ml-auto pointer-events-auto">
          <span>Click to Inspect Full Details</span>
          <span className="text-teal-400 group-hover/carousel:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </div>
  );
}
