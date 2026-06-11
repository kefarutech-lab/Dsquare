/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── DSQUARE BRAND COLORS ──────────────────────────────
        'clay':       '#B17457',   // Clay Ember — primary brand color (terracotta)
        'clay-light': '#C4896A',   // lighter tint of clay for hover states
        'clay-dark':  '#8A5A3F',   // darker shade for depth
        'limestone':  '#D9D3C3',   // Soft Limestone — secondary (warm beige)
        'limestone-light': '#EDE9DF', // light tint for backgrounds
        'ds-white':   '#FFFFFF',   // White — secondary clean bg
        'ds-black':   '#0F0D0C',   // Near black (warm-toned, not pure cold black)
        'ds-dark':    '#1C1714',   // Dark warm bg for sections
        'ds-charcoal':'#2C2420',   // Charcoal for card backgrounds
      },
      fontFamily: {
        // Primary: LT Wave (logo/headings) — load via @font-face or Google Fonts fallback
        display: ['"LT Wave"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        // Secondary: Barlow (body, UI)
        sans:    ['Barlow', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':   ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1':     ['clamp(2rem, 5vw, 4rem)',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h2':     ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      backgroundImage: {
        // Brand pattern — logomark grid (use as texture)
        'ds-pattern': "url('/assets/brand-pattern.svg')",
      },
    },
  },
  plugins: [],
}
