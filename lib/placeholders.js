export function makeSvg(label, accent = '#C5B3D3', bg = '#FBEFEF', w = 800, h = 600) {
  const cx = w / 2;
  const cy = h * 0.42;
  const r = h * 0.16;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="${bg}"/>
      <rect x="${w * 0.05}" y="${h * 0.06}" width="${w * 0.9}" height="${h * 0.88}" rx="28" fill="#fff" opacity="0.9"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 2.1}" fill="${accent}" opacity="0.25"/>
      <path d="M${cx} ${cy + r * 1.4} C ${cx - r * 2.1} ${cy + r * 0.2}, ${cx - r * 1.1} ${cy - r * 1.3}, ${cx} ${cy - r * 0.3} C ${cx + r * 1.1} ${cy - r * 1.3}, ${cx + r * 2.1} ${cy + r * 0.2}, ${cx} ${cy + r * 1.4} Z" fill="${accent}" opacity="0.9"/>
      <text x="${cx}" y="${h * 0.82}" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="${Math.round(w * 0.045)}" font-weight="700" fill="#5B4E63">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
