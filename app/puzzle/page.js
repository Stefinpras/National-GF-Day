'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import PageShell from '@/components/PageShell';
import NextLink from '@/components/NextLink';

const TIME_LIMIT = 5;

const PIECES = [
  { id: 'tl', label: 'Kiri Atas', color: 'linear-gradient(135deg,#F5CBCB,#F0B9B9)' },
  { id: 'tr', label: 'Kanan Atas', color: 'linear-gradient(135deg,#C5B3D3,#B49FC7)' },
  { id: 'bl', label: 'Kiri Bawah', color: 'linear-gradient(135deg,#C5B3D3,#F5CBCB)' },
  { id: 'br', label: 'Kanan Bawah', color: 'linear-gradient(135deg,#F0B9B9,#C5B3D3)' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PuzzlePage() {
  const [status, setStatus] = useState('idle'); // idle | playing | success | fail
  const [placed, setPlaced] = useState([]);
  const [tray, setTray] = useState(shuffle(PIECES));
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef(null);

  function startGame() {
    setPlaced([]);
    setTray(shuffle(PIECES));
    setTimeLeft(TIME_LIMIT);
    setStatus('playing');
  }

  useEffect(() => {
    if (status !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [status]);

  useEffect(() => {
    if (status === 'playing' && timeLeft === 0 && placed.length < 4) {
      setStatus('fail');
    }
  }, [timeLeft, status, placed.length]);

  function placePiece(piece) {
    if (status !== 'playing') return;
    setTray((t) => t.filter((p) => p.id !== piece.id));
    setPlaced((p) => {
      const next = [...p, piece];
      if (next.length === 4) {
        clearInterval(timerRef.current);
        setStatus('success');
      }
      return next;
    });
  }

  const quadrantOrder = ['tl', 'tr', 'bl', 'br'];

  return (
    <PageShell center>
      <div className="flex flex-col items-center text-center">
        <span className="glass-pill inline-flex items-center gap-1.5 font-semibold tracking-[.14em] uppercase text-[.75rem] text-lavender-deep px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulseRing" />
          Hitungan 5 Detik
        </span>
        <h1 className="font-display text-[clamp(1.7rem,5vw,2.4rem)] mb-2 max-w-[560px]">
          Penuhi kotak-kotaknyaa sebelum waktu habis
        </h1>
        <p className="text-ink-soft text-[.95rem] max-w-[480px] mb-8">
          Oke kalau kamu emang sayang sama aku, coba susun puzzle ini dalam 5 detik.
          Kalau gagal berarti kamu ngga sayang aku wlekkk....
        </p>

        {/* target 2x2 heart mosaic */}
        <div className="relative mb-3">
          <div className="grid grid-cols-2 gap-1.5 w-[168px] h-[168px] rounded-[26px] overflow-hidden glass-card p-1.5">
            {quadrantOrder.map((qid) => {
              const filled = placed.find((p) => p.id === qid);
              return (
                <div
                  key={qid}
                  className="rounded-2xl flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: filled ? filled.color : 'rgba(255,255,255,0.5)',
                    border: filled ? 'none' : '2px dashed rgba(197,179,211,0.5)',
                  }}
                >
                  {filled && <span className="text-white/90 text-lg">♡</span>}
                </div>
              );
            })}
          </div>
          {status === 'success' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="absolute inset-0 flex items-center justify-center text-5xl"
            >
              💖
            </motion.div>
          )}
        </div>

        {status === 'playing' && (
          <div
            className={`font-display text-[2rem] font-bold mb-6 ${timeLeft <= 2 ? 'text-red-400' : 'text-lavender-deep'}`}
          >
            {timeLeft}
          </div>
        )}

        {status === 'idle' && (
          <button
            onClick={startGame}
            className="glass-btn inline-flex items-center gap-2 text-white rounded-full px-9 py-4 font-semibold shadow-glow mb-4"
            style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
          >
            Mulai Sayang...
          </button>
        )}

        {status === 'playing' && (
          <div className="flex gap-3 flex-wrap justify-center mb-4">
            <AnimatePresence>
              {tray.map((p) => (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  onClick={() => placePiece(p)}
                  className="puzzle-piece w-16 h-16 rounded-2xl shadow-soft"
                  style={{ background: p.color }}
                  aria-label={p.label}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-lg3 px-8 py-6 max-w-[420px] mt-2"
            >
              <p className="font-script text-[1.5rem] text-lavender-deep font-bold mb-1">
                Berhasil! Berarti kamu emang sayang aku 🥹
              </p>
              <p className="text-ink-soft text-[.9rem]">Yuk lanjut sayang, masih ada yang lain tau...</p>
            </motion.div>
          )}

          {status === 'fail' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-lg3 px-8 py-6 max-w-[420px] mt-2"
            >
              <p className="font-script text-[1.5rem] text-lavender-deep font-bold mb-1">
                Waktu habis! Berarti kamu ngga sayang aku wlekkk 😝
              </p>
              <p className="text-ink-soft text-[.9rem] mb-4">
                Bercanda kok. Coba sekali lagi ya, sayang.
              </p>
              <button
                onClick={startGame}
                className="glass-btn inline-flex items-center gap-2 text-white rounded-full px-7 py-3 font-semibold shadow-card mx-auto"
                style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
              >
                <RefreshCw size={16} /> Coba Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'success' && (
          <div className="mt-8">
            <NextLink href="/calendar">Lanjut sayang...</NextLink>
          </div>
        )}
      </div>
    </PageShell>
  );
}
