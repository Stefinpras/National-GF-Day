export default function Eyebrow({ children }) {
  return (
    <span className="glass-pill inline-flex items-center gap-1.5 font-semibold tracking-[.14em] uppercase text-[.75rem] text-lavender-deep px-3.5 py-1.5 rounded-full mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulseRing" />
      {children}
    </span>
  );
}
