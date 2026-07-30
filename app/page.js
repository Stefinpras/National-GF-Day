'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from '@/components/NextLink';
import ProgressDots from '@/components/ProgressDots';

const BURST_EMOJIS = ['💗', '💕', '✨', '💖'];

export default function LandingPage() {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hearts, setHearts] = useState([]);

  function openGift() {
    if (opened) return;
    setOpened(true);

    const burst = Array.from({ length: 20 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 90 + Math.random() * 170;
      return {
        id: `${Date.now()}-${i}`,
        char: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 40,
        size: 14 + Math.random() * 14,
      };
    });
    setHearts(burst);
    setTimeout(() => setHearts([]), 1000);
    setTimeout(() => setHidden(true), 1050);
  }

  return (
    <div
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #FFE2E2 0%, #FBEFEF 45%, #FFF6F2 100%)' }}
    >
      <ProgressDots />

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-10 overflow-hidden">
        <div
          className="absolute w-[420px] h-[420px] -top-[120px] -left-[120px] rounded-full pointer-events-none blur-[40px]"
          style={{ background: 'rgba(197,179,211,0.25)' }}
        />
        <div
          className="absolute w-[380px] h-[380px] -bottom-[140px] -right-[100px] rounded-full pointer-events-none blur-[40px]"
          style={{ background: 'rgba(245,203,203,0.3)' }}
        />

        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="fixed z-[5] pointer-events-none left-1/2 top-1/2"
              style={{ fontSize: h.size }}
              initial={{ x: 0, y: 0, scale: 0.6, opacity: 1 }}
              animate={{ x: h.dx, y: h.dy, scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.95, ease: 'easeOut' }}
            >
              {h.char}
            </motion.div>
          ))}
        </AnimatePresence>

        {!hidden && (
          <motion.div
            className="relative z-[2] flex flex-col items-center gap-[22px]"
            animate={opened ? { opacity: 0, y: -14, scale: 0.96 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-script text-[clamp(2.2rem,7vw,3.4rem)] text-lavender-deep font-bold"
            >
              For Youu babyyyy
            </motion.h1>

            <motion.button
              onClick={openGift}
              aria-label="Buka kotak hadiah"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className={`gift-box-wrap flex flex-col items-center gap-[18px] bg-transparent border-none cursor-pointer ${opened ? 'opened' : ''}`}
            >
              <div className={`gift-box relative w-[150px] h-[134px] ${opened ? '' : 'animate-floatSlow'}`}>
                <div className="bow">🎀</div>
                <div className="lid" />
                <div className="ribbon-v" />
                <div className="base" />
              </div>
              <div className="flex flex-col items-center gap-2 max-w-[320px]">
                <p className="text-ink-soft text-[.98rem] font-medium">
                  Hai sayang, aku ada sesuatu buat kamu.
                  <br />
                  Eumm coba kamu click kadonya deh....
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-lavender-deep animate-pulseRing" />
              </div>
            </motion.button>
          </motion.div>
        )}

        {hidden && (
          <motion.div
            className="relative z-[2] max-w-[640px] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-display italic font-semibold text-[clamp(2.2rem,7vw,4rem)] leading-[1.1] text-ink"
            >
              Selamat <span className="font-script not-italic text-lavender-deep">Girlfriend Day</span>,
              <br />
              Sayangku.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-[18px] text-ink-soft text-[1.05rem] max-w-[520px]"
            >
              Eummm, ngga special sihh tapi aku harap kamu suka ya sayangg...
              Nah sekarang coba next deh, aku ada kejutan lain buat kamu sayangkuuuu...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="mt-[38px]"
            >
              <NextLink href="/bottle">Pencet ini sayang...</NextLink>
            </motion.div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
