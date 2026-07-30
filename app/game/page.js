'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { Store } from '@/lib/storage';

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const SWEET_LINES = [
  'Kamu menang, tapi hati aku juga udah lama kamu menangkan eak wkwkw',
  'Selamat menang! Hadiahnya: nikah sama aku yakk wkwkwk',
  'Menang lawan bot itu gampang. Menang di hati aku? Kamu udah dari dulu wkkwkw',
  'Satu kemenangan kecil, tapi senyum kamu selalu jadi kemenangan terbesarku eakk wkwkwk',
];
const TEASE_LINES = [
  'Kalah lawan bot doang nih? heumm jangggall',
  'Yah kalah. Untung cantiknya nggak ikut kalahhh.',
  'Santai, kamu tetap juara di hati aku kok. Cuma bukan di game ini wkkww',
  'Kalah lawan bot doang, tapi jangan kalah sayang sama aku yaa wkkwkw',
];

function checkResult(b) {
  for (const line of WIN_LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line };
  }
  if (b.every((v) => v)) return { winner: 'draw' };
  return null;
}

function findTacticalMove(b, player) {
  for (const line of WIN_LINES) {
    const vals = line.map((i) => b[i]);
    const countP = vals.filter((v) => v === player).length;
    const countEmpty = vals.filter((v) => !v).length;
    if (countP === 2 && countEmpty === 1) return line[vals.findIndex((v) => !v)];
  }
  return null;
}

function minimax(b, depth, isMax) {
  const res = checkResult(b);
  if (res) {
    if (res.winner === 'O') return 10 - depth;
    if (res.winner === 'X') return depth - 10;
    return 0;
  }
  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = 'O';
        best = Math.max(best, minimax(b, depth + 1, false));
        b[i] = null;
      }
    }
    return best;
  }
  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = 'X';
      best = Math.min(best, minimax(b, depth + 1, true));
      b[i] = null;
    }
  }
  return best;
}

function minimaxBest(b) {
  let bestScore = -Infinity;
  let bestMove = null;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = 'O';
      const score = minimax(b, 0, false);
      b[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function pickBotMove(b, diff) {
  const empty = b.map((v, i) => (v ? null : i)).filter((v) => v !== null);
  if (empty.length === 0) return null;

  if (diff === 'easy') {
    if (Math.random() < 0.3) {
      const block = findTacticalMove(b, 'X') ?? findTacticalMove(b, 'O');
      if (block !== null) return block;
    }
    return empty[Math.floor(Math.random() * empty.length)];
  }
  if (diff === 'medium') {
    const winMove = findTacticalMove(b, 'O');
    if (winMove !== null) return winMove;
    const block = findTacticalMove(b, 'X');
    if (block !== null) return block;
    if (Math.random() < 0.55) return empty[Math.floor(Math.random() * empty.length)];
    return minimaxBest(b);
  }
  return minimaxBest(b);
}

export default function GamePage() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [status, setStatus] = useState('Giliran kamu (X)');
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });
  const [result, setResult] = useState(null);
  const [winLine, setWinLine] = useState([]);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    setScore(Store.get('sos_score', { win: 0, lose: 0, draw: 0 }));
  }, []);

  function endGame(res) {
    setGameOver(true);
    if (res.line) setWinLine(res.line);

    if (res.winner === 'X') {
      const next = { ...score, win: score.win + 1 };
      setScore(next);
      Store.set('sos_score', next);
      setStatus('Kamu menang! 🎉');
      showResult('win');
    } else if (res.winner === 'O') {
      const next = { ...score, lose: score.lose + 1 };
      setScore(next);
      Store.set('sos_score', next);
      setStatus('Kamu kalah kali ini...');
      showResult('lose');
    } else {
      const next = { ...score, draw: score.draw + 1 };
      setScore(next);
      Store.set('sos_score', next);
      setStatus('Seri!');
      showResult('draw');
    }
  }

  function showResult(kind) {
    if (kind === 'win') {
      setResult({ kind, msg: SWEET_LINES[Math.floor(Math.random() * SWEET_LINES.length)] });
      launchFlowers();
    } else if (kind === 'lose') {
      setResult({ kind, msg: TEASE_LINES[Math.floor(Math.random() * TEASE_LINES.length)] });
    } else {
      setResult({ kind });
    }
  }

  function launchFlowers() {
    const emojis = ['🌸', '🌷', '🌼', '💐', '✨'];
    const pieces = Array.from({ length: 30 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      char: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      duration: 2.4 + Math.random() * 2.2,
      size: 16 + Math.random() * 18,
    }));
    setFlowers(pieces);
    setTimeout(() => setFlowers([]), 5000);
  }

  function handleMove(i) {
    if (gameOver || board[i]) return;
    const next = [...board];
    next[i] = 'X';
    setBoard(next);
    const res = checkResult(next);
    if (res) return endGame(res);
    setStatus('Bot berpikir...');
    setTimeout(() => botMove(next), 500);
  }

  function botMove(current) {
    const idx = pickBotMove([...current], difficulty);
    const next = [...current];
    if (idx !== null) next[idx] = 'O';
    setBoard(next);
    const res = checkResult(next);
    if (res) return endGame(res);
    setStatus('Giliran kamu (X)');
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setStatus('Giliran kamu (X)');
    setResult(null);
    setWinLine([]);
  }

  function changeDifficulty(d) {
    setDifficulty(d);
    resetGame();
  }

  return (
    <PageShell
      eyebrow="Jangan sampai kalah ya sayanggg"
      title="Main SOS Yuk"
      subtitle="Tic-tac-toe klasik lawan bot. Menang dapat sesuatu nantiii hehehhe"
    >
      <div className="grid lg:grid-cols-[minmax(0,auto)_minmax(260px,360px)] gap-6 lg:gap-8 items-start justify-center">
        <div className="glass-card rounded-xl2 p-5 sm:p-6">
          <div className="text-[1.05rem] font-semibold text-lavender-deep min-h-[28px] mb-3">
            {status}
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-2.5 w-[300px] sm:w-[320px] max-[420px]:w-[84vw]">
            {board.map((v, i) => (
              <button
                key={i}
                onClick={() => handleMove(i)}
                className={`aspect-square rounded-2xl flex items-center justify-center font-display text-[2.7rem] sm:text-[3rem] font-bold transition-colors ${
                  winLine.includes(i)
                    ? 'bg-gradient-to-br from-pink-light to-pink-mid text-ink'
                    : v
                    ? v === 'X'
                      ? 'bg-pink-light text-lavender-deep'
                      : 'bg-pink-light text-ink-soft'
                    : 'bg-white/60 hover:bg-pink-light hover:-translate-y-0.5'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex gap-2.5 mt-4 justify-center">
            <div className="bg-white/70 border border-pink-mid rounded-xl px-3.5 py-2 text-center min-w-[72px] sm:min-w-[78px]">
              <div className="font-display text-[1.3rem] font-bold text-lavender-deep">{score.win}</div>
              <div className="text-[.68rem] text-ink-soft uppercase tracking-[.06em]">Menang</div>
            </div>
            <div className="bg-white/70 border border-pink-mid rounded-xl px-3.5 py-2 text-center min-w-[72px] sm:min-w-[78px]">
              <div className="font-display text-[1.3rem] font-bold text-lavender-deep">{score.lose}</div>
              <div className="text-[.68rem] text-ink-soft uppercase tracking-[.06em]">Kalah</div>
            </div>
            <div className="bg-white/70 border border-pink-mid rounded-xl px-3.5 py-2 text-center min-w-[72px] sm:min-w-[78px]">
              <div className="font-display text-[1.3rem] font-bold text-lavender-deep">{score.draw}</div>
              <div className="text-[.68rem] text-ink-soft uppercase tracking-[.06em]">Seri</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-[360px] rounded-xl2 border border-white/50 bg-white/30 p-4 sm:p-5">
          <h3 className="mb-1 font-display text-[1.08rem]">Level Bot</h3>
          <p className="text-ink-soft text-[.9rem] mb-3">Pilih seberapa kejam botnya mau kamu ajak main.</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {[
              { key: 'easy', label: 'Santai' },
              { key: 'medium', label: 'Sedang' },
              { key: 'hard', label: 'Kejam 😈' },
            ].map((d) => (
              <button
                key={d.key}
                onClick={() => changeDifficulty(d.key)}
                className={`border-2 rounded-full px-[16px] py-2 font-semibold text-[.82rem] ${
                  difficulty === d.key
                    ? 'bg-lavender-deep border-lavender-deep text-white'
                    : 'glass-pill border-pink-mid text-ink-soft'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 text-white rounded-full px-8 py-3 font-semibold shadow-card"
            style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
          >
            Main Lagi
          </button>
        </div>
      </div>

      <div className="mt-8 text-center max-w-[560px] mx-auto">
        <div className="text-[2.6rem] animate-floatSlow">💗</div>
        <p className="text-ink-soft mt-2.5 text-[1.02rem]">Itu dia semua kejutan kecil buat kamu hari inii heehhe.</p>
        <div className="font-script font-bold text-[1.6rem] text-lavender-deep mt-1.5">
          Selamat Girlfriend Day, sayangku.
        </div>
      </div>

      <div className="flex justify-center mt-7">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold text-[1.02rem] shadow-card hover:-translate-y-1 transition-transform"
          style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
        >
          Ulangi dari Awal ↻
        </a>
      </div>

      {flowers.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
          {flowers.map((f) => (
            <div
              key={f.id}
              className="absolute -top-[8%] text-[1.8rem]"
              style={{
                left: `${f.left}vw`,
                fontSize: f.size,
                animationName: 'confettiFall',
                animationDuration: `${f.duration}s`,
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards',
              }}
            >
              {f.char}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="fixed inset-0 bg-ink/45 backdrop-blur-sm flex items-center justify-center z-[100] p-5">
          <div className="glass-card rounded-xl2 p-9 max-w-[420px] w-full text-center relative">
            <button
              onClick={() => setResult(null)}
              className="absolute top-3.5 right-4 text-ink-soft text-[1.3rem] bg-transparent border-none"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            {result.kind === 'win' && (
              <>
                <div className="text-[4rem] mb-2.5">🌸</div>
                <h2 className="text-[1.6rem] mb-2.5">Kamu Menang!</h2>
                <p className="text-ink-soft mb-5">{result.msg}</p>
              </>
            )}
            {result.kind === 'lose' && (
              <>
                <div
                  className="rounded-md3 p-5"
                  style={{ background: 'linear-gradient(135deg, var(--pink-mid), var(--lavender))' }}
                >
                  <div className="text-[5rem]">😂</div>
                  <div className="font-script font-bold text-white text-[1.3rem] mt-2.5">{result.msg}</div>
                </div>
                <h2 className="text-[1.6rem] mt-4 mb-5">Kalah, nih!</h2>
              </>
            )}
            {result.kind === 'draw' && (
              <>
                <div className="text-[4rem] mb-2.5">🤝</div>
                <h2 className="text-[1.6rem] mb-2.5">Seri!</h2>
                <p className="text-ink-soft mb-5">
                  Nggak ada yang menang, nggak ada yang kalah. Sama kayak kita, seimbang eeakk wkkwkwkw
                </p>
              </>
            )}

            <button
              onClick={() => {
                setResult(null);
                resetGame();
              }}
              className="mt-1.5 inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-semibold shadow-card"
              style={{ background: 'linear-gradient(135deg, var(--lavender-deep), var(--lavender))' }}
            >
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
