'use client';

import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const WEEK1 = [
  { d: 31, dim: true },
  { d: 1, label: 'AUGUST 1', special: true },
  { d: 2, dim: true },
];
const WEEK2 = [{ d: 7 }, { d: 8 }];

export default function CalendarPage() {
  return (
    <PageShell
      eyebrow="Save The Date"
      title="Tanggal yang Selalu Kutunggu"
      subtitle="Setiap 1 Agustus, dunia (dan aku) merayakan kamu. Selamat National Girlfriend's Day, sayangku."
      footerHref="/about"
      footerLabel="Lanjut sayangg, jangan bosen bosen yakk"
      center
    >
      <div className="relative glass-card rounded-xl2 max-w-[560px] mx-auto p-8 sm:p-10 overflow-hidden">
        {/* floating decorative hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-lavender-deep/40 text-xl select-none"
            style={{ left: `${8 + i * 16}%`, top: i % 2 === 0 ? '6%' : '85%' }}
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            {i % 2 === 0 ? '♡' : '✦'}
          </motion.span>
        ))}

        <div className="relative grid grid-cols-3 gap-3 mb-6">
          {WEEK1.map((c) => (
            <div
              key={c.d}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center border ${
                c.special ? 'border-transparent' : 'border-pink-mid/60 text-ink-soft'
              }`}
              style={c.dim ? { opacity: 0.45 } : undefined}
            >
              {c.special && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: '0 0 0 3px var(--lavender-deep)',
                  }}
                  animate={{ scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <span className={`text-[.7rem] font-semibold ${c.special ? 'text-lavender-deep' : ''}`}>
                {c.special ? 'AUGUST' : c.d}
              </span>
              {c.special && (
                <>
                  <span className="font-display text-2xl text-lavender-deep font-bold leading-none">1</span>
                  <span className="font-script text-[.8rem] text-lavender-deep mt-0.5 leading-tight text-center">
                    Girlfriend&apos;s Day
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-2 gap-3 max-w-[240px] mx-auto">
          {WEEK2.map((c) => (
            <div
              key={c.d}
              className="aspect-square rounded-2xl border border-pink-mid/60 flex items-center justify-center text-ink-soft text-[.85rem]"
            >
              {c.d}
            </div>
          ))}
        </div>

        <motion.div
          className="relative mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <p className="font-script text-[1.6rem] text-lavender-deep font-bold">
            Selamat National Girlfriend&apos;s Day
          </p>
          <p className="text-ink-soft text-[.9rem] mt-1">1 Agustus — hari resmi buat manjain kamu walaupun viirtual dulu wkkwkw...</p>
        </motion.div>
      </div>
    </PageShell>
  );
}
