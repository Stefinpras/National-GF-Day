'use client';

import { useEffect, useState } from 'react';

const CHARS = ['♡', '♥', '✦', '●'];
const COLORS = [
  'rgba(197,179,211,0.45)',
  'rgba(245,203,203,0.55)',
  'rgba(255,226,226,0.6)',
  'rgba(255,255,255,0.7)',
];

export default function FloatingHearts({ count = 14 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: Math.random() * 100,
      duration: 11 + Math.random() * 14,
      delay: -(Math.random() * 14),
      size: 12 + Math.random() * 16,
    }));
    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -bottom-[10%] animate-driftUp"
          style={{
            left: `${p.left}vw`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            color: p.color,
            filter: 'drop-shadow(0 0 6px rgba(197,179,211,0.25))',
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
}
