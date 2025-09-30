/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defence Portal Theme Colors
        'defence-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#0A3D62', // Primary color
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'defence-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#2E2E2E', // Secondary color
          900: '#0f172a',
        },
        'defence-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#E74C3C', // Critical alerts
          700: '#c53030',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'defence-orange': {
          400: '#fb923c',
          500: '#FF9933', // Accent color
          600: '#ea580c',
        },
        'defence-yellow': {
          400: '#FFCC00', // Warning color
          500: '#eab308',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        }
      },
      backgroundImage: {
        'cyber-grid': `
          linear-gradient(rgba(10, 61, 98, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10, 61, 98, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '30px 30px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}