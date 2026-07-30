import { Fraunces, Caveat, Poppins } from 'next/font/google';
import FloatingHearts from '@/components/FloatingHearts';
import BackgroundFX from '@/components/BackgroundFX';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'National Girlfriend Day - For You',
  description: 'Website kecil penuh kejutan untuk National Girlfriend Day, 1 Agustus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fraunces.variable} ${caveat.variable} ${poppins.variable}`}>
      <body className="font-body">
        <FloatingHearts count={14} />
        <BackgroundFX />
        {children}
      </body>
    </html>
  );
}
