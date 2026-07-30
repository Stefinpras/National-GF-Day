'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const HEART_CHARS = ['💗', '💕', '✨', '💖', '♡'];

const NON_BURST_SELECTOR =
  'button, a, input, textarea, select, label, [contenteditable="true"], [role="button"], .no-heart-burst';

export default function BackgroundFX() {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const springX = useSpring(mouseX, { damping: 24, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 24, stiffness: 200, mass: 0.5 });

  const [cursorVisible, setCursorVisible] = useState(false);
  const [bursts, setBursts] = useState([]);

  // Cursor-following glow, only for devices with a real mouse.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    function handleMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorVisible(true);
    }
    function handleLeave() {
      setCursorVisible(false);
    }

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  // Love-burst effect on random background clicks (skips interactive elements).
  useEffect(() => {
    function handleClick(e) {
      if (e.target.closest && e.target.closest(NON_BURST_SELECTOR)) return;

      const id = `${Date.now()}-${Math.random()}`;
      const pieces = Array.from({ length: 9 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 34 + Math.random() * 90;
        return {
          key: `${id}-${i}`,
          char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 26,
          size: 12 + Math.random() * 16,
          rotate: (Math.random() - 0.5) * 60,
        };
      });

      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY, pieces }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 1000);
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Soft glow shadow trailing the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[55] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 260,
          height: 260,
          borderRadius: '9999px',
          background:
            'radial-gradient(circle, rgba(156,130,179,0.32) 0%, rgba(245,203,203,0.22) 45%, transparent 72%)',
          filter: 'blur(20px)',
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
      {/* Small bright core so the effect reads as a spotlight, not just a blur */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[56] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 12,
          height: 12,
          borderRadius: '9999px',
          background: 'var(--lavender-deep)',
          boxShadow: '0 0 22px 8px rgba(156,130,179,0.5)',
          opacity: cursorVisible ? 0.85 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Love bursts on background click */}
      <div className="fixed inset-0 pointer-events-none z-[65] overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {bursts.map((burst) =>
            burst.pieces.map((p) => (
              <motion.span
                key={p.key}
                className="absolute select-none"
                style={{ left: burst.x, top: burst.y, fontSize: p.size }}
                initial={{ x: 0, y: 0, scale: 0.5, opacity: 1, rotate: 0 }}
                animate={{ x: p.dx, y: p.dy, scale: 1.15, opacity: 0, rotate: p.rotate }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
              >
                {p.char}
              </motion.span>
            ))
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
