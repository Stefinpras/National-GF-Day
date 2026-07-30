'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '@/components/PageShell';
import NextLink from '@/components/NextLink';

const FILL_DURATION = 2600; // ms

export default function BottlePage() {
  const [filling, setFilling] = useState(false);
  const [level, setLevel] = useState(0); // 0-100
  const [done, setDone] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  function startFill() {
    if (filling || done) return;
    setFilling(true);
    startRef.current = performance.now();

    function tick(now) {
      const elapsed = now - startRef.current;
      const pct = Math.min(100, (elapsed / FILL_DURATION) * 100);
      setLevel(pct);

      if (Math.random() < 0.35) {
        setBubbles((b) => [
          ...b.slice(-14),
          { id: `${now}-${Math.random()}`, left: 20 + Math.random() * 60, size: 4 + Math.random() * 6 },
        ]);
      }

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setFilling(false);
        setDone(true);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <PageShell center>
      <div className="flex flex-col items-center text-center">
        <span className="glass-pill inline-flex items-center gap-1.5 font-semibold tracking-[.14em] uppercase text-[.75rem] text-lavender-deep px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulseRing" />
          Botol Ajaib kayaknya...
        </span>
        <h1 className="font-display text-[clamp(1.8rem,5vw,2.6rem)] mb-8 max-w-[520px]">
          Seberapa besar kamu sayang sama aku?
        </h1>

        <div className="relative">
          <AnimatePresence>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute -top-6 text-lg"
                style={{ left: `${10 + i * 16}%` }}
                initial={{ opacity: 0, y: 0 }}
                animate={
                  level > 5
                    ? { opacity: [0, 1, 0], y: -30 - i * 4 }
                    : { opacity: 0 }
                }
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
              >
                {i % 2 === 0 ? '💗' : '✨'}
              </motion.span>
            ))}
          </AnimatePresence>

          <button
            onClick={startFill}
            disabled={filling || done}
            aria-label="Isi ramuan"
            className="potion-bottle block disabled:cursor-default"
          >
            <div className="cork" />
            <div className="neck" />
            <div className="glass-body">
              <div className="liquid" style={{ height: `${level}%` }}>
                {bubbles.map((b) => (
                  <motion.span
                    key={b.id}
                    className="absolute rounded-full bg-white/70"
                    style={{ left: `${b.left}%`, width: b.size, height: b.size, bottom: 2 }}
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{ opacity: 0, y: -60 }}
                    transition={{ duration: 1.4 }}
                    onAnimationComplete={() =>
                      setBubbles((cur) => cur.filter((x) => x.id !== b.id))
                    }
                  />
                ))}
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 min-h-[64px] flex flex-col items-center gap-3">
          {!done && (
            <>
              <p className="text-ink-soft text-[.95rem] font-medium max-w-[300px]">
                {filling ? 'Eummmm waittttt' : 'Klik botolnya coba hehehee'}
              </p>
              {!filling && (
                <div className="w-40 h-2 rounded-full bg-white/60 overflow-hidden glass">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${level}%`,
                      background: 'linear-gradient(90deg, var(--pink-mid), var(--lavender))',
                    }}
                  />
                </div>
              )}
            </>
          )}

          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-lg3 px-8 py-6 max-w-[420px]"
            >
              <div className="text-[2rem] mb-1.5">💖</div>
              <p className="font-script text-[1.5rem] text-lavender-deep font-bold mb-1">
                Penuh! Sepenuh itu sayangnya kamu ke aku ya?
              </p>
              <p className="text-ink-soft text-[.92rem]">
                Aku simpen jawaban ini baik-baikk yakk. Yuk lanjut ke page selanjutnyaa...
              </p>
            </motion.div>
          )}
        </div>

        {done && (
          <div className="mt-8">
            <NextLink href="/puzzle">Lanjut sayangg...</NextLink>
          </div>
        )}
      </div>
    </PageShell>
  );
}
