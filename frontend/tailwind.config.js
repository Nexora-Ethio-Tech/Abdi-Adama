/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        school: {
          primary: '#0064a5',
          secondary: '#bf6a82',
          accent: '#4db3e3',
        }
      }
    },
  },
  plugins: [],
}
