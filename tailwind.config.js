/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#FBEFEF',
        'pink-light': '#FFE2E2',
        'pink-mid': '#F5CBCB',
        lavender: '#C5B3D3',
        'lavender-deep': '#9C82B3',
        ink: '#2B2230',
        'ink-soft': '#5B4E63',
        cream: '#FFFFFF',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        script: ['var(--font-caveat)', 'cursive'],
        body: ['var(--font-poppins)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        xl2: '28px',
        lg3: '22px',
        md3: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(156,130,179,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
        'glass-lg': '0 20px 60px -20px rgba(156,130,179,0.35), inset 0 1px 0 rgba(255,255,255,0.75)',
        soft: '0 18px 48px -18px rgba(197,179,211,0.55)',
        glow: '0 0 0 1px rgba(197,179,211,0.4), 0 10px 30px -8px rgba(197,179,211,0.6)',
      },
      keyframes: {
        driftUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '.8' },
          '85%': { opacity: '.5' },
          '100%': { transform: 'translateY(-110vh) rotate(18deg)', opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        blobMove: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(4%,-6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%,4%) scale(0.95)' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.06)', opacity: '.75' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        confettiFall: {
          to: { transform: 'translateY(112vh) rotate(300deg)', opacity: '.15' },
        },
        eq: {
          '0%, 100%': { height: '30%' },
          '50%': { height: '100%' },
        },
        spin4: {
          to: { transform: 'rotate(360deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.06)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        driftUp: 'driftUp linear infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        blobMove: 'blobMove 18s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s ease-in-out infinite',
        wiggle: 'wiggle 3.2s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        eq: 'eq 0.9s ease-in-out infinite',
        popIn: 'popIn 0.5s cubic-bezier(.2,.9,.3,1.2) both',
        spin4: 'spin4 4s linear infinite',
      },
    },
  },
  plugins: [],
};
