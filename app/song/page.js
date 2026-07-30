'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music2, Heart } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { makeSvg } from '@/lib/placeholders';

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const SONGS = [
  {
    title: 'Dewa 19 - Aku Milikmu',
    reason: 'Lagu yang mengingatkanku bahwa di antara banyaknya orang di dunia, hatiku selalu memilihmu. Semoga kamu tahu, kamu adalah rumah yang ingin selalu aku pulang.',
    cover: '/assets/Aku Milikmu.png',
    src: '/assets/Dewa 19 - Aku Milikmu _ Lirik Lagu.mp3',
  },
  {
    title: 'MALIQ & D\'Essentials - Pilihanku',
    reason: 'Di antara semua kemungkinan yang ada, kamu tetap menjadi pilihanku. Lagu ini adalah pengingat bahwa memilihmu adalah salah satu keputusan terbaik dalam hidupku.',
    cover: '/assets/Pilihanku.png',
    src: '/assets/MALIQ & D\'Essentials - Pilihanku Official Music Video.mp3',
  },
  {
    title: 'The 1975 - About You',
    reason: 'Entah kenapa, setiap kali lagu ini diputar, yang terlintas di pikiranku selalu kamu. Seolah setiap nada dan liriknya menceritakan betapa berharganya dirimu bagiku.',
    cover: '/assets/About You.png',
    src: '/assets/The 1975 - About You Official.mp3',
  },
];

export default function SongPage() {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = SONGS[current].src;
    audio.load();
    if (playing) audio.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function playTrack(i) {
    if (i === current) {
      togglePlay();
      return;
    }
    setCurrent(i);
    setPlaying(true);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => alert('Tidak bisa memutar otomatis. Coba klik lagi.'));
    } else {
      audio.pause();
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const pct = parseFloat(e.target.value);
    audio.currentTime = (pct / 100) * duration;
  }

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <PageShell
      eyebrow="Eumm apa inii"
      title="A Song That Describes You"
      subtitle="Kalau ada cara menggambarkan perasaanku lewat musik, mungkin tiga lagu ini adalah jawabannya. Yukk, dengerin satu satu sayngg..."
      footerHref="/letter"
      footerLabel="Lanjutt sayangg..."
    >
      <div className="grid gap-5">
        {SONGS.map((t, i) => {
          const isActive = i === current;
          return (
            <div
              key={t.title}
              className={`glass-card rounded-xl2 p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center transition-transform hover:-translate-y-1 ${
                isActive ? 'glow-ring' : ''
              }`}
            >
              <button
                onClick={() => playTrack(i)}
                aria-label={isActive && playing ? 'Jeda' : 'Putar'}
                className="glass-btn relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-glass"
              >
                <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/35 text-white">
                  {isActive && playing ? <Pause size={22} /> : <Play size={22} />}
                </span>
              </button>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-[1.05rem] text-ink truncate">{t.title}</h3>
                  {isActive && playing && (
                    <span className="eq-bars text-lavender-deep">
                      <span /><span /><span /><span />
                    </span>
                  )}
                </div>
                <p className="text-ink-soft text-[.92rem] leading-relaxed mt-1">{t.reason}</p>
              </div>

              <Heart
                size={18}
                className={`shrink-0 self-start sm:self-center ${isActive ? 'fill-lavender-deep text-lavender-deep' : 'text-pink-mid'}`}
              />
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-xl2 mt-8 px-6 py-5 sticky bottom-5 z-10">
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <div
            className={`relative w-14 h-14 shrink-0 rounded-full overflow-hidden shadow-glass ${playing ? 'animate-spin4' : ''}`}
          >
            <img src={SONGS[current].cover} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <div className="flex items-center gap-2">
              <Music2 size={14} className="text-lavender-deep shrink-0" />
              <div className="font-semibold text-[.95rem] truncate">{SONGS[current].title}</div>
            </div>
            <div className="text-[.75rem] text-ink-soft/70 truncate">Untukmu</div>
          </div>

          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-glow shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
            aria-label={playing ? 'Jeda' : 'Putar'}
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-[90px] accent-lavender shrink-0 hidden md:block"
            title="Volume"
          />
        </div>

        <div className="flex items-center gap-2.5 mt-3">
          <span className="text-[.7rem] text-ink-soft/70 w-9 tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={pct}
            onChange={handleSeek}
            className="flex-1 accent-lavender"
          />
          <span className="text-[.7rem] text-ink-soft/70 w-9 tabular-nums text-right">{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          // The browser fires "pause" right before "ended", which resets
          // `playing` to false. Force it back to true so the effect below
          // knows to auto-play the next track instead of leaving it paused.
          setPlaying(true);
          setCurrent((c) => (c + 1) % SONGS.length);
        }}
      />
    </PageShell>
  );
}
