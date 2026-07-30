'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Download, Upload, X } from 'lucide-react';
import PageShell from '@/components/PageShell';

const MAX_SHOTS = 3;
const FRAME_W = 480;
const FRAME_H = 360;

export default function PhotoboothPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const stripCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [checking, setChecking] = useState(true);
  const [shots, setShots] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [stripUrl, setStripUrl] = useState(null);

  // Try to start the camera on mount.
  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        if (!cancelled) {
          setCameraError(true);
          setChecking(false);
        }
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCameraReady(true);
        setChecking(false);
      } catch (err) {
        if (!cancelled) {
          setCameraError(true);
          setChecking(false);
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const takeShot = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = FRAME_W;
    canvas.height = FRAME_H;
    const ctx = canvas.getContext('2d');

    // cover-fit crop from the video into the frame
    const vw = video.videoWidth || FRAME_W;
    const vh = video.videoHeight || FRAME_H;
    const scale = Math.max(FRAME_W / vw, FRAME_H / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (FRAME_W - dw) / 2;
    const dy = (FRAME_H - dh) / 2;

    ctx.save();
    // mirror the image so it feels like a real mirror/selfie cam
    ctx.translate(FRAME_W, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, FRAME_W - dx - dw, dy, dw, dh);
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setShots((prev) => (prev.length >= MAX_SHOTS ? prev : [...prev, dataUrl]));
  }, []);

  function startCountdownAndShoot() {
    if (shots.length >= MAX_SHOTS || countdown !== null) return;
    let n = 3;
    setCountdown(n);
    const iv = setInterval(() => {
      n -= 1;
      if (n === 0) {
        clearInterval(iv);
        setCountdown(null);
        takeShot();
      } else {
        setCountdown(n);
      }
    }, 700);
  }

  function handleUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, MAX_SHOTS - shots.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setShots((prev) => (prev.length >= MAX_SHOTS ? prev : [...prev, reader.result]));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  function removeShot(i) {
    setShots((prev) => prev.filter((_, idx) => idx !== i));
    setStripUrl(null);
  }

  function retakeAll() {
    setShots([]);
    setStripUrl(null);
  }

  // Build the final vertical strip whenever shots change and we have at least one.
  useEffect(() => {
    if (shots.length === 0) {
      setStripUrl(null);
      return;
    }
    const canvas = stripCanvasRef.current;
    if (!canvas) return;

    const pad = 22;
    const gap = 16;
    const photoW = FRAME_W * 0.62;
    const photoH = FRAME_H * 0.62;
    const footerH = 90;
    const w = photoW + pad * 2;
    const h = pad + shots.length * photoH + (shots.length - 1) * gap + footerH;

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // strip background
    ctx.fillStyle = '#FFF8F5';
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#F5CBCB');
    grad.addColorStop(1, '#C5B3D3');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    let loaded = 0;
    const imgs = shots.map(() => new window.Image());

    function draw() {
      shots.forEach((_, i) => {
        const y = pad + i * (photoH + gap);
        const img = imgs[i];
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(pad - 4, y - 4, photoW + 8, photoH + 8);
        ctx.drawImage(img, pad, y, photoW, photoH);
        ctx.restore();
      });

      ctx.fillStyle = '#9C82B3';
      ctx.textAlign = 'center';
      ctx.font = '600 20px "Segoe UI", sans-serif';
      ctx.fillText('Girlfriend Day Photobooth', w / 2, h - footerH + 34);
      ctx.font = '400 14px "Segoe UI", sans-serif';
      ctx.fillStyle = '#5B4E63';
      ctx.fillText('1 Agustus • for you 💗', w / 2, h - footerH + 58);

      setStripUrl(canvas.toDataURL('image/jpeg', 0.92));
    }

    shots.forEach((src, i) => {
      imgs[i].onload = () => {
        loaded += 1;
        if (loaded === shots.length) draw();
      };
      imgs[i].src = src;
    });
  }, [shots]);

  function downloadStrip() {
    if (!stripUrl) return;
    const a = document.createElement('a');
    a.href = stripUrl;
    a.download = 'girlfriend-day-photobooth.jpg';
    a.click();
  }

  return (
    <PageShell
      eyebrow="Kenang virtual baru kitaa"
      title="Photobooth virtual kitaaa"
      subtitle={`Ambil sampai ${MAX_SHOTS} foto buat jadi strip seperti photoboth wkwkw. Kalau kamera nggak bisa diakses, kamu bisa upload foto dari galerii ya sayang.`}
      footerHref="/game"
      footerLabel="Lanjut sayang, kita main game yaa..."
      center
    >
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start max-w-[880px] mx-auto text-left">
        {/* Camera / capture column */}
        <div className="glass-card rounded-xl2 p-5 sm:p-6">
          <div
            className="relative w-full rounded-lg3 overflow-hidden bg-ink/80 flex items-center justify-center"
            style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
          >
            {!cameraError && (
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraReady ? 'block' : 'hidden'}`}
                style={{ transform: 'scaleX(-1)' }}
              />
            )}

            {checking && (
              <div className="text-white/80 text-sm px-4 text-center">Menyalakan kamera...</div>
            )}

            {cameraError && (
              <div className="text-white/85 text-sm px-6 text-center flex flex-col items-center gap-2">
                <Camera size={26} />
                Kamera nggak bisa diakses di browser ini. Upload foto aja ya di bawah ya sayang
              </div>
            )}

            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.15, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-[5rem]"
                  style={{ textShadow: '0 6px 20px rgba(0,0,0,0.4)' }}
                >
                  {countdown}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-3 right-3 glass-pill px-3 py-1 rounded-full text-[.72rem] font-semibold text-lavender-deep">
              {shots.length}/{MAX_SHOTS}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5 justify-center">
            {cameraReady && (
              <button
                onClick={startCountdownAndShoot}
                disabled={shots.length >= MAX_SHOTS || countdown !== null}
                className="glass-btn inline-flex items-center gap-2 text-white rounded-full px-7 py-3.5 font-semibold shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep))' }}
              >
                <Camera size={18} />
                {shots.length >= MAX_SHOTS ? 'Sudah 3 Foto' : 'Jepret'}
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={shots.length >= MAX_SHOTS}
              className="glass-pill inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink-soft border border-pink-mid disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Upload size={18} />
              Upload Foto kamu syang
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleUpload}
            />

            {shots.length > 0 && (
              <button
                onClick={retakeAll}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink-soft border border-transparent hover:border-pink-mid"
              >
                <RefreshCw size={16} />
                Ulang ngga sayang
              </button>
            )}
          </div>

          {shots.length > 0 && (
            <div className="flex gap-2.5 mt-5 justify-center flex-wrap">
              {shots.map((s, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden shadow-soft">
                  <img src={s} alt={`Jepretan ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeShot(i)}
                    aria-label="Hapus foto ini"
                    className="absolute top-0.5 right-0.5 bg-ink/60 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Strip preview column */}
        <div className="glass-card rounded-xl2 p-5 sm:p-6 flex flex-col items-center text-center">
          <h3 className="font-display text-[1.05rem] mb-3">Strip Kenanganmu</h3>
          {stripUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <img
                src={stripUrl}
                alt="Photobooth strip"
                className="max-w-[220px] w-full rounded-lg shadow-soft"
              />
              <button
                onClick={downloadStrip}
                className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-semibold shadow-card"
                style={{ background: 'linear-gradient(135deg, var(--lavender-deep), var(--lavender))' }}
              >
                <Download size={16} />
                Simpan Strip
              </button>
            </motion.div>
          ) : (
            <p className="text-ink-soft text-[.9rem] max-w-[220px]">
              Ambil minimal 1 foto dulu, strip-nya bakal langsung muncul di sini otomatis.
            </p>
          )}
          <canvas ref={stripCanvasRef} className="hidden" />
        </div>
      </div>

    </PageShell>
  );
}
