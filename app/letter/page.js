'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockOpen } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { Store } from '@/lib/storage';

const DEFAULT_PW = '260726'; 
const DEFAULT_MSG = `Selamat National Girlfriend Day, sayangku.

happy girlfriend day sayangkuu cintakuu cantikuu, aku ga bakalann lupaa dengan kamu di harii-harii speciall inii, mungkin kamu bilangg inii ketikan gaa seberapa i know ini emang gaa seberapaa tapii inii aku ngetikk berusaa untukk cantiikuu inii aku gabisaa merangkaii kata-kata banyaa aku cumann mau bilang kalo aku sayang bangett sama kamu, terimakasii banyaa yaa sayang sudaa mau bertahann sama aku, terimakasi sudah menerima kekurangan-kekurangan ku, sama kamu itu nyamann sekalii cuman kamu yang bisa nenangin aku di saat merasa sedihh, terkadang aku sering buatt masalah hal-hal kecill yaa aku mintaa maaff sayangg, kamu bolee bangett sebutiin satu-satu sikapp mana yg gaa kamu sukaa darii aku pelahann aku bakall ubah sikap-sikap buruk aku itu. maaff aku cuman hanya bisa sekedar ngasi teks doang, maaf kalo aku gabisa kaya cowo-cowo lainnyaa, aku beruntung sekali ketemu cewe sebaikk kamuu, selaluu bersamaku teruss yaaa?, sekalii lagii happy girlfriend day anakk kecikkk 2006nyaa akuuu.`;

const CONFETTI = ['💗', '✦', '🤍', '✨'];

export default function LetterPage() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MSG);
  const [confetti, setConfetti] = useState([]);
  const shakeTimeout = useRef(null);

  useEffect(() => {
    const saved = Store.get('letter_message', null);
    if (saved) setMessage(saved);
  }, []);

  function handleMessageBlur(e) {
    const value = e.currentTarget.textContent;
    setMessage(value);
    Store.set('letter_message', value);
  }

  function launchConfetti() {
    const pieces = Array.from({ length: 26 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      char: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
      left: Math.random() * 100,
      duration: 2.5 + Math.random() * 2,
      size: 14 + Math.random() * 16,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5000);
  }

  function tryUnlock() {
    if (pw.trim() === DEFAULT_PW) {
      setOpened(true);
      launchConfetti();
      setTimeout(() => setRevealed(true), 850);
    } else {
      setError('Kode belum tepat, coba lagi ya 💭');
      setShake(false);
      clearTimeout(shakeTimeout.current);
      requestAnimationFrame(() => setShake(true));
      shakeTimeout.current = setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <PageShell
      eyebrow="Rahasia Berdua"
      title="Surat Terkunci"
      subtitle="Masukkan 6 kode untuk membuka surat ini."
      footerHref={revealed ? '/date-list' : undefined}
      footerLabel="Lanjut sayangg"
      center
    >
      <AnimatePresence mode="wait">
        {!revealed && (
          <motion.div
            key="lock"
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center px-5 pt-7 pb-2"
          >
            <div className="my-5" style={{ perspective: '1200px' }}>
              <div className={`envelope ${opened ? 'opened' : ''} ${shake ? 'shake' : ''}`}>
                <div className="letter-inside" />
                <div className="flap" />
                <div className="seal">💌</div>
              </div>
            </div>

            <div className="mt-1.5 flex flex-col items-center gap-3.5">
              <label htmlFor="pwInput" className="font-semibold text-lavender-deep text-[.95rem]">
                Tebakk kodenya apa sayangg...
              </label>
              <input
                id="pwInput"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
                className="font-display text-[1.5rem] tracking-[.35em] text-center w-[220px] py-3 pl-5 pr-2.5 rounded-2xl border-2 border-pink-mid bg-white/70 text-ink outline-none focus:border-lavender-deep"
              />
              <div className="text-[#B25A6E] font-semibold text-[.88rem] min-h-[20px]">{error}</div>
              <button
                onClick={tryUnlock}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-white font-semibold shadow-card"
                style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
              >
                Bukaa sayangg <LockOpen size={18} />
              </button>
              <div className="text-ink-soft text-[.85rem] max-w-[320px]">
                6 angka ya sayang<b></b>
              </div>
            </div>
          </motion.div>
        )}

        {revealed && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-card relative max-w-[640px] mx-auto mt-2.5 rounded-xl2 px-10 py-11 text-center overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 15% 0%, rgba(197,179,211,0.18), transparent 40%), radial-gradient(circle at 100% 100%, rgba(245,203,203,0.2), transparent 45%)',
              }}
            />
            <div className="relative text-[2.2rem] mb-2.5">💗</div>
            <h2 className="relative font-script font-bold text-[1.9rem] mb-4 text-lavender-deep">
              Untuk bocil 2006 akuuu.
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={handleMessageBlur}
              className="relative text-[1.05rem] text-ink-soft leading-[1.85] text-left whitespace-pre-line outline-none focus:outline-dashed focus:outline-2 focus:outline-lavender rounded-lg"
            >
              {message}
            </div>
            <div className="relative mt-6 font-script font-bold text-[1.4rem] text-lavender-deep">
              — dari pacar kamu yang ganteng kwkkw
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="fixed -top-[5%] pointer-events-none z-[60]"
            style={{ left: `${c.left}vw`, fontSize: c.size }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{ y: '115vh', rotate: 360, opacity: 0.3 }}
            transition={{ duration: c.duration, ease: 'linear' }}
          >
            {c.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </PageShell>
  );
}
