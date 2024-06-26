/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': 'linear-gradient(to bottom, #87CEEB, #87CEFA, #FFFFFF)',
      },
    },
  },
  plugins: [],
};
