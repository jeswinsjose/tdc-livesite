/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a0a0a',
          charcoal: '#121212',
          accent: '#00f0ff',
          accentDim: 'rgba(0, 240, 255, 0.1)',
          glow: '#00f0ff80'
        },
        slate: {
          850: '#151e2e',
          900: '#0f172a',
          950: '#020617',
        },
        blue: {
          400: '#60a5fa', // Blueprint Blue
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        tdc: {
          dark: '#050505',
          card: '#121212',
          cyan: '#00E5FF',
          gray: '#A0A0A0',
          border: '#2A2A2A'
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
