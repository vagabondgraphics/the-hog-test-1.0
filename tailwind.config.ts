import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Akkurat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        primary: '#1B5066',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        neutral: '#6B7280',
        background: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        surface: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#6B7280',
        },
        gray: {
          100: '#F2F2F2',
          200: '#E5E7EB',
        },
        chart: {
          reddit: '#5B9BD5',
          linkedin: '#F4B084',
          twitter: '#70AD47',
          slack: '#FFC000',
          grid: '#F3F4F6',
          axis: '#9CA3AF',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',      // Buttons, small inputs
        md: '8px',      // Badges, medium elements
        lg: '12px',     // Keep for backwards compatibility
        xl: '14px',     // Nested cards
        '2xl': '16px',  // Primary modals/frames
        '3xl': '20px',  // Icon containers/circular elements
        full: '9999px', // Fully rounded
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
      },
      fontSize: {
        display: ['32px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '-0.5px' }],
        h1: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '28px', fontWeight: '700' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}

export default config
