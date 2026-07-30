import Link from 'next/link';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function NextLink({ href, children, restart = false }) {
  return (
    <Link
      href={href}
      className="glass-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold text-[1.02rem] shadow-glow"
      style={{ background: 'linear-gradient(135deg, var(--lavender), var(--lavender-deep) 130%)' }}
    >
      <span className="relative z-[2]">{children}</span>
      <span className="relative z-[2] inline-block">
        {restart ? <RotateCcw size={18} /> : <ArrowRight size={18} />}
      </span>
    </Link>
  );
}
