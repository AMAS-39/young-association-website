// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Ensure Tailwind scans all components
  ],
  theme: {
    extend: {
      colors: {
        koreanRed: '#c60c30',
        kurdishGreen: '#009b77',
      },
    },
  },
  darkMode: 'class', // Enable dark mode class strategy
  plugins: [],
};
