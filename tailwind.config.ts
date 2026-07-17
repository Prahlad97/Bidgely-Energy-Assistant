import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: '#1d5ed8',
        'primary-dark': '#1a4fbb',
        brand: {
          accent: '#9BFFD0',
          purple: '#6D28D9',
        },
      },
    },
  },
  plugins: [],
};

export default config;
