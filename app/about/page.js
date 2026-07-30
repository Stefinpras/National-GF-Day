import PageShell from '@/components/PageShell';
import { makeSvg } from '@/lib/placeholders';

const riniIMG = '/assets/Rini.png';

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Halaman Pertama"
      title="All About You"
      footerHref="/love-list"
      footerLabel="Lanjut syangg..."
    >
      <div className="glass-card rounded-xl2 p-6 sm:p-8 grid md:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
        <img
          src={riniIMG}
          alt="Ilustrasi untukmu"
          className="w-full aspect-[4/3] object-cover rounded-lg3 shadow-soft"
        />
        <div className="text-left">
          <p className="text-ink-soft text-[1.02rem] leading-[1.85] mb-4">
           There are so many things I admire about you, and they're not just the big moments—they're the little ones too. I love the way you smile when you're genuinely happy, the kindness you show to others, and the way you always make the people around you feel loved.
          </p>
          <p className="text-ink-soft text-[1.02rem] leading-[1.85] mb-4">
            You have a heart that's gentle, caring, and incredibly beautiful. Your strength, your patience, and your ability to brighten even the hardest days are just a few of the reasons why I admire you so much.
          </p>
          <p className="text-ink-soft text-[1.02rem] leading-[1.85]">
            You may not always see it, but you are truly one of a kind. Never forget how special you are, because to me, you'll always be someone worth celebrating every single day.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
