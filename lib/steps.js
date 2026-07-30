export const STEPS = [
  { href: '/', label: 'Kado' },
  { href: '/bottle', label: 'Ramuan' },
  { href: '/puzzle', label: 'Puzzle' },
  { href: '/calendar', label: 'Tanggal' },
  { href: '/about', label: 'About You' },
  { href: '/love-list', label: '10 Hal' },
  { href: '/moments', label: 'Momen' },
  { href: '/song', label: 'Lagu' },
  { href: '/letter', label: 'Surat' },
  { href: '/date-list', label: 'Date List' },
  { href: '/photobooth', label: 'Photobooth' },
  { href: '/game', label: 'Main SOS' },
];

export function stepIndex(pathname) {
  return STEPS.findIndex((s) => s.href === pathname);
}
