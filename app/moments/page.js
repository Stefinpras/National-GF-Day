'use client';

import { useEffect, useState } from 'react';
import PageShell from '@/components/PageShell';
import { Store } from '@/lib/storage';

const LABELS = ['Momen 1', 'Momen 2', 'Momen 3', 'Momen 4', 'Momen 5', 'Momen 6'];
const IMAGES = ['/assets/P1.png', '/assets/P2.png', '/assets/P3.png', '/assets/P4.jpeg', '/assets/P5.jpeg', '/assets/P6.jpeg'];
const DEFAULT_CAPTIONS = [
  'Sumpahh ini lucuu banget sayang',
  'Cissss senyummm wkwkkw',
  'Kamu tidur lucu bnngt tauu kwkww',
  'Bubble chat favorit aku waktu PDKT 🤍',
  'Awal mulaa bikin api hhehehe',
  'Aku suka pas kamu lagii overthingking hehhee',
];
const ROTATE = ['rotate-[-2.4deg]', 'rotate-[1.8deg]', 'rotate-[-1.2deg]', 'rotate-[2deg]', 'rotate-[-1.8deg]', 'rotate-[1.2deg]'];

export default function MomentsPage() {
  const [captions, setCaptions] = useState(DEFAULT_CAPTIONS);

  useEffect(() => {
    setCaptions(DEFAULT_CAPTIONS.map((c, i) => Store.get(`moment_caption_${i}`, c)));
  }, []);

  function handleBlur(i, value) {
    const next = [...captions];
    next[i] = value;
    setCaptions(next);
    Store.set(`moment_caption_${i}`, value);
  }

  return (
    <PageShell
      eyebrow="Momen Virtual wkkwkw"
      title="Our Moment's"
      subtitle="Eumm, mungkin aku mau minta maaf dulu kalau ada beberapa foto yang aku ambil secara diem-diem hehehee..."
      footerHref="/song"
      footerLabel="Lanjut sayangg..."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LABELS.map((label, i) => (
          <div
            key={i}
            className={`relative glass-card rounded-lg3 pt-3.5 px-3.5 pb-5 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 ${ROTATE[i]}`}
          >
            <span
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-lavender-deep text-[1.6rem]"
              style={{ transform: 'translateX(-50%) rotate(-6deg)' }}
            >
              ♥
            </span>
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
              <img
                src={IMAGES[i]}
                alt={label}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur(i, e.currentTarget.textContent.trim())}
              className="mt-3 text-center font-script font-bold text-ink-soft text-[1.2rem] outline-none border-b border-dashed border-transparent focus:border-lavender px-1 py-0.5"
            >
              {captions[i]}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
