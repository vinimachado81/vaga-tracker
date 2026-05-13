/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['"Instrument Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono:  ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg:      '#0a0a0f',
        surface: '#13131a',
        s2:      '#1c1c26',
        s3:      '#22222f',
        bdr:     '#2a2a3d',
        bdr2:    '#363650',
        txt:     '#e8e6f0',
        txt2:    '#7a788a',
        txt3:    '#4a4860',
        blue:    '#4a9eff',
        yellow:  '#f5c842',
        purple:  '#a855f7',
        green:   '#22c55e',
        red:     '#ef4444',
      },
      animation: {
        'modal-in': 'modalIn .2s ease',
        'notif-in': 'notifIn .2s ease',
      },
      keyframes: {
        modalIn: { from: { opacity: '0', transform: 'translateY(14px) scale(.98)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        notifIn: { from: { opacity: '0', transform: 'translateY(8px)' },            to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
