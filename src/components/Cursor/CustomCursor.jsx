import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * 
 * Minimal, high-performance editorial custom cursor.
 * Features:
 * - Immediate-tracking central dot with subtle teal glow
 * - Soft trailing outer ring (via requestAnimationFrame LERP)
 * - 2 subtle fading micro-trail circles
 * - Contextual expansions for buttons, links, editorial headings, and skills
 * - "VIEW PROJECT →" badge when hovering project visuals
 * - Subtle magnetic attraction on selected CTA buttons
 * - Only active on mouse/pointer devices (ignored on pure touch gestures)
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trail1Ref = useRef(null);
  const trail2Ref = useRef(null);

  const [cursorState, setCursorState] = useState('default'); // 'default' | 'link' | 'project' | 'tech' | 'heading'
  const [isVisible, setIsVisible] = useState(false);

  const hasMoved = useRef(false);
  const pos = useRef({
    mouse: { x: -100, y: -100 },
    ring: { x: -100, y: -100 },
    trail1: { x: -100, y: -100 },
    trail2: { x: -100, y: -100 },
  });

  const activeMagneticEl = useRef(null);

  useEffect(() => {
    let animId;

    const handlePointerMove = (e) => {
      // Ignore pure touch events on mobile screens
      if (e.pointerType === 'touch') return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // On first movement, snap all coordinates directly to avoid flying in from offscreen
      if (!hasMoved.current) {
        hasMoved.current = true;
        pos.current.mouse = { x: clientX, y: clientY };
        pos.current.ring = { x: clientX, y: clientY };
        pos.current.trail1 = { x: clientX, y: clientY };
        pos.current.trail2 = { x: clientX, y: clientY };
        setIsVisible(true);
      } else {
        pos.current.mouse.x = clientX;
        pos.current.mouse.y = clientY;
      }

      // Immediate position update for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Check hover targets
      const target = e.target;
      if (!target) return;

      // 1. Project visual hover
      const isProject = target.closest('[data-cursor="project"]') || 
                        target.closest('.group\\/carousel') || 
                        target.closest('.group\\/img');
      if (isProject) {
        setCursorState('project');
        return;
      }

      // 2. Button / Link / Submit
      const isButton = target.closest('button, a, [role="button"], input[type="submit"]');
      if (isButton) {
        setCursorState('link');

        // Subtle magnetic pull
        const isMagnetic = isButton.hasAttribute('data-magnetic') || isButton.classList.contains('hero-action');
        if (isMagnetic) {
          activeMagneticEl.current = isButton;
          const rect = isButton.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = Math.max(-8, Math.min(8, (clientX - centerX) * 0.22));
          const deltaY = Math.max(-8, Math.min(8, (clientY - centerY) * 0.22));
          isButton.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        }
        return;
      }

      // Reset any active magnetic element
      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = 'translate3d(0, 0, 0)';
        activeMagneticEl.current = null;
      }

      // 3. Technology hover
      const isTech = target.closest('[data-cursor="tech"]') || target.closest('.skill-item');
      if (isTech) {
        setCursorState('tech');
        return;
      }

      // 4. Heading hover
      const isHeading = target.closest('h1, h2, [data-letter-hover="true"]');
      if (isHeading) {
        setCursorState('heading');
        return;
      }

      setCursorState('default');
    };

    const handlePointerEnter = () => {
      if (hasMoved.current) setIsVisible(true);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = 'translate3d(0, 0, 0)';
        activeMagneticEl.current = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('pointerenter', handlePointerEnter);
    document.addEventListener('pointerleave', handlePointerLeave);

    // Continuous LERP animation loop for outer ring & micro trails
    const render = () => {
      const { mouse, ring, trail1, trail2 } = pos.current;

      // Soft LERP for outer ring
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      // Subtle trailing micro-circles
      trail1.x += (ring.x - trail1.x) * 0.24;
      trail1.y += (ring.y - trail1.y) * 0.24;

      trail2.x += (trail1.x - trail2.x) * 0.24;
      trail2.y += (trail1.y - trail2.y) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      if (trail1Ref.current) {
        trail1Ref.current.style.transform = `translate3d(${trail1.x}px, ${trail1.y}px, 0)`;
      }

      if (trail2Ref.current) {
        trail2Ref.current.style.transform = `translate3d(${trail2.x}px, ${trail2.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('pointerenter', handlePointerEnter);
      document.removeEventListener('pointerleave', handlePointerLeave);
      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = 'translate3d(0, 0, 0)';
      }
    };
  }, []);

  // Outer ring dynamic appearance based on cursorState
  const getRingStyles = () => {
    switch (cursorState) {
      case 'project':
        return 'w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-[#0d0f14]/95 border-2 border-teal-400 backdrop-blur-md shadow-2xl shadow-teal-950/60 scale-100';
      case 'link':
        return 'w-14 h-14 -translate-x-1/2 -translate-y-1/2 bg-teal-400/15 border-2 border-teal-400 scale-105';
      case 'tech':
        return 'w-11 h-11 -translate-x-1/2 -translate-y-1/2 bg-teal-400/10 border border-teal-400/80';
      case 'heading':
        return 'w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-white/[0.06] border border-white/50';
      default:
        return 'w-9 h-9 -translate-x-1/2 -translate-y-1/2 bg-teal-400/[0.04] border border-teal-400/60';
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-[999999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* 1. Subtle Micro Trail Circle 2 */}
      <div
        ref={trail2Ref}
        className="fixed top-0 left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/20 bg-teal-400/[0.02] pointer-events-none will-change-transform"
      />

      {/* 2. Subtle Micro Trail Circle 1 */}
      <div
        ref={trail1Ref}
        className="fixed top-0 left-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/35 bg-teal-400/[0.03] pointer-events-none will-change-transform"
      />

      {/* 3. Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none will-change-transform transition-[width,height,transform,border-color,background-color] duration-200 ease-out ${getRingStyles()}`}
      >
        {/* Contextual Badge Text when Hovering Project Visual */}
        {cursorState === 'project' && (
          <div className="flex flex-col items-center justify-center text-center px-1 animate-fadeIn select-none">
            <span className="font-mono text-[9px] uppercase tracking-wider text-teal-300 font-bold leading-tight">
              VIEW
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-300 leading-tight">
              PROJECT &rarr;
            </span>
          </div>
        )}
      </div>

      {/* 4. Center Dot (High-visibility glowing cyan/teal core) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform shadow-[0_0_10px_rgba(45,212,191,0.9)] transition-[opacity,scale,background-color] duration-150 ${
          cursorState === 'project' 
            ? 'opacity-0 scale-50' 
            : cursorState === 'link' 
            ? 'bg-teal-200 scale-125' 
            : 'bg-teal-400'
        }`}
      />
    </div>
  );
}
