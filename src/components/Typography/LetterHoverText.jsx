import React, { useRef, useCallback } from 'react';

/**
 * LetterHoverText
 * 
 * High-performance letter-level proximity hover interaction.
 * When the cursor moves over the heading, individual letters directly underneath
 * and adjacent to the cursor dynamically magnify (scale: 1.08–1.18), lift upward (1–3px),
 * and shift toward the accent color (#2dd4bf), creating an organic tactile wave effect.
 * 
 * Words are preserved with natural wrapping, maintaining 100% responsive integrity.
 */
export default function LetterHoverText({
  text = '',
  className = '',
  accentColor = '#2dd4bf',
  radius = 80,
  maxScale = 1.15,
  maxLift = 3,
}) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);

  const handlePointerMove = useCallback((e) => {
    // Only apply on mouse / fine pointer devices
    if (e.pointerType === 'touch') return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const chars = charRefs.current;
    const len = chars.length;

    for (let i = 0; i < len; i++) {
      const el = chars[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

      if (dist < radius) {
        // Smooth cosine proximity curve: 1 at cursor center, 0 at outer radius
        const factor = Math.cos((dist / radius) * (Math.PI / 2));
        const scale = 1 + factor * (maxScale - 1);
        const lift = -factor * maxLift;

        el.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
        if (factor > 0.3) {
          el.style.color = accentColor;
          el.style.webkitTextFillColor = accentColor;
          el.style.textShadow = `0 0 16px ${accentColor}66`;
        } else {
          el.style.color = '';
          el.style.webkitTextFillColor = '';
          el.style.textShadow = 'none';
        }
      } else {
        el.style.transform = 'translate3d(0, 0, 0) scale(1)';
        el.style.color = '';
        el.style.webkitTextFillColor = '';
        el.style.textShadow = 'none';
      }
    }
  }, [accentColor, radius, maxScale, maxLift]);

  const handlePointerLeave = useCallback(() => {
    const chars = charRefs.current;
    const len = chars.length;

    for (let i = 0; i < len; i++) {
      const el = chars[i];
      if (!el) continue;
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
      el.style.color = '';
      el.style.webkitTextFillColor = '';
      el.style.textShadow = 'none';
    }
  }, []);

  // Split into words so lines wrap cleanly between words on mobile
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <span
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline select-none ${className}`}
      data-letter-hover="true"
    >
      {words.map((word, wordIdx) => {
        const letters = word.split('');

        return (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {letters.map((char) => {
                const currentIndex = charCounter++;
                return (
                  <span
                    key={currentIndex}
                    ref={(el) => (charRefs.current[currentIndex] = el)}
                    className="inline-block will-change-transform"
                    style={{
                      transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), color 0.16s ease-out, text-shadow 0.16s ease-out',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
}
