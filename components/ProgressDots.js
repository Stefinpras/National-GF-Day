'use client';

import { usePathname, useRouter } from 'next/navigation';
import { STEPS, stepIndex } from '@/lib/steps';

export default function ProgressDots({ allowJump = false }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = stepIndex(pathname);

  if (current === -1) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass-pill rounded-full px-3 py-2 flex items-center gap-1.5 shadow-glass">
      {STEPS.map((s, i) => {
        const reached = i <= current;
        return (
          <button
            key={s.href}
            onClick={() => allowJump && reached && router.push(s.href)}
            aria-label={s.label}
            title={s.label}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 bg-lavender-deep'
                : reached
                ? 'w-2 bg-lavender'
                : 'w-2 bg-white/70'
            } ${allowJump && reached ? 'cursor-pointer' : 'cursor-default'}`}
          />
        );
      })}
    </div>
  );
}
