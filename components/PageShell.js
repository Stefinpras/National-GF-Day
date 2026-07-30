'use client';

import Eyebrow from './Eyebrow';
import NextLink from './NextLink';
import ProgressDots from './ProgressDots';

export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  footerHref,
  footerLabel,
  footerRestart = false,
  center = false,
  bgClassName = '',
}) {
  return (
    <div className={`relative z-[1] min-h-screen flex flex-col ${bgClassName}`}>
      <ProgressDots />

      <div
        className="absolute w-[320px] h-[320px] top-10 -left-24 rounded-full pointer-events-none blur-[70px] z-0"
        style={{ background: 'rgba(197,179,211,0.22)' }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[280px] h-[280px] bottom-0 -right-20 rounded-full pointer-events-none blur-[70px] z-0"
        style={{ background: 'rgba(245,203,203,0.28)' }}
        aria-hidden="true"
      />

      <main className="relative z-[1] flex-1 max-w-[1000px] mx-auto px-6 pt-24 pb-10 w-full">
        {eyebrow && (
          <div className={center ? 'text-center' : ''}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        {title && (
          <h1 className={`font-display text-[clamp(2rem,5vw,3rem)] mb-2.5 ${center ? 'text-center' : ''}`}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p className={`text-ink-soft text-[1.05rem] max-w-[640px] mb-9 ${center ? 'text-center mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
        {children}
      </main>
      {footerHref && (
        <div className="relative z-[1] flex justify-center items-center max-w-[1000px] mx-auto px-6 pt-2.5 pb-16 w-full">
          <NextLink href={footerHref} restart={footerRestart}>
            {footerLabel}
          </NextLink>
        </div>
      )}
    </div>
  );
}
