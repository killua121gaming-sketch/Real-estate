/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--obsidian-rgb) / <alpha-value>)',
        charcoal: 'rgb(var(--charcoal-rgb) / <alpha-value>)',
        ivory: 'rgb(var(--ivory-rgb) / <alpha-value>)',
        champagne: 'rgb(var(--champagne-rgb) / <alpha-value>)',
        walnut: 'rgb(var(--walnut-rgb) / <alpha-value>)',
        white: 'rgb(var(--white-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.08) translate3d(-1.2%, -0.8%, 0)' },
        },
        cue: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        kenburns: 'kenburns 28s ease-in-out infinite alternate',
        cue: 'cue 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
};
