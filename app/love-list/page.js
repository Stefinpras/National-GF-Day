import PageShell from '@/components/PageShell';
import { makeSvg } from '@/lib/placeholders';
import { Heart } from 'lucide-react';

const IMG = '/assets/10things.jpeg';

const ITEMS = [
  'Your beautiful heart.',
  'The way you always make me smile.',
  'Your kindness toward everyone.',
  'How you believe in me.',
  'Your patience and understanding.',
  'The little things you do without being asked.',
  'The way you make ordinary moments feel special.',
  'Your strength, even on difficult days.',
  'How safe and at peace I feel with you.',
  'Simply being you.',
];

export default function LoveListPage() {
  return (
    <PageShell
      eyebrow="Ekhemm hehee"
      title="10 Things I Love About You"
      footerHref="/moments"
      footerLabel="Lanjut sayangg..."
    >
      <div className="glass-card rounded-xl2 p-6 sm:p-8 grid md:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
        <img
          src={IMG}
          alt="Ilustrasi 10 hal"
          className="w-full aspect-[4/3] object-cover rounded-lg3 shadow-soft order-2 md:order-1"
        />
        <ol className="text-left space-y-3 order-1 md:order-2">
          {ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="glass-pill w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Heart size={13} className="fill-lavender-deep text-lavender-deep" />
              </span>
              <span className="text-ink-soft text-[1rem] leading-relaxed pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
