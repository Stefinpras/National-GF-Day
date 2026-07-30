'use client';

import PageShell from '@/components/PageShell';

const DATES = [
  {
    label: 'Date 1',
    title: 'Pantai Date',
    description: 'Eummm sepertinya asikk pantai date heehhee',
    image: '/assets/pantai.jpg',
  },
  {
    label: 'Date 2',
    title: 'Sunset Walk Bareng',
    description: 'Jalan sore sambil liat sunset kyknya asik sayang, sambil ngobrol ngalor ngidull truss malemnyaa kita nyari makannn ehhehe.',
    image: '/assets/Sunset Walking.jpg',
  },
  {
    label: 'Date 3',
    title: 'Situ Patenggang',
    description: 'Ke Situ Patenggang asikk nihh sayanggg ngeliat situ di ciwidey tpi kita jalannya pagi sekalian sunmori di ciwideyy wwkwkw',
    image: '/assets/ciwidey.jpg',
  },
  {
    label: 'Date 4',
    title: 'Gereja Bareng',
    description: 'Ini siii stiap minggu wajib kitaaaaa kwkwkwkw',
    image: '/assets/Gereja bareng.jpg',
  },
  {
    label: 'Date 5',
    title: 'Belajar Bareng',
    description: 'Eummm ngambiss barengg seruu synggggg',
    image: '/assets/Belajar bareng.jpg',
  },
  {
    label: 'Date 6',
    title: 'Photobooth',
    description: 'Kita buatt koleksi photobooth kita yang banyakk yawww.',
    image: '/assets/photoboth.jpg',
  },
];

export default function DateListPage() {
  return (
    <PageShell
      eyebrow="Our Little Dates"
      title="6 Date yang udah dan mau Aku Lakuin Bareng Kamu"
      subtitle="Eummmmm, kita bikinn whistlist date yang banyak yuk sayanggg"
      footerHref="/photobooth"
      footerLabel="Lanjut sayanggg"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {DATES.map((date) => (
          <div key={date.title} className="glass-card rounded-xl2 overflow-hidden text-left">
            <img src={date.image} alt={date.title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <div className="text-[.72rem] uppercase tracking-[.2em] text-lavender-deep font-semibold mb-2">
                {date.label}
              </div>
              <h3 className="font-display text-[1.1rem] text-ink mb-2">{date.title}</h3>
              <p className="text-ink-soft text-[.95rem] leading-relaxed">{date.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
