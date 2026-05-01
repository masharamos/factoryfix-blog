import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────
      colors: {
        // Primary (green)
        primary: {
          0:    '#F1FCF5',
          50:   '#DEFAEA',
          100:  '#BEF4D5',
          200:  '#8CE9B4',
          300:  '#53D58B',
          400:  '#2BBA69',
          500:  '#1E9B54',  // ← main brand green
          600:  '#1B7A45',
          700:  '#1B603A',
          800:  '#184F32',
          900:  '#123A25',
          1000: '#0B2517',
        },
        // Gray scale
        gray: {
          20:   '#F8FAFC',
          40:   '#F1F5F9',
          60:   '#EBF0F5',
          80:   '#E2E8F0',
          100:  '#CBD5E1',
          200:  '#BAC5D6',
          300:  '#A7B5C9',
          400:  '#94A3B8',
          500:  '#94A3B8',
          600:  '#8191AA',
          700:  '#73839B',
          800:  '#64748B',
          820:  '#475569',
          840:  '#334155',
          860:  '#1E293B',
          880:  '#0F172A',  // ← near-black, used for headings/nav
          900:  '#000000',
        },
        // Highlight (purple) — used for AI features, CTAs
        highlight: {
          0:    '#F9F9FF',
          50:   '#E2E4FD',
          100:  '#DAD8FC',
          200:  '#BEB8FA',
          300:  '#9F90F5',
          400:  '#8063EF',
          500:  '#6C40E5',  // ← main purple
          600:  '#5F30D1',
          700:  '#4E27B0',
          800:  '#422290',
          900:  '#331875',
          1000: '#210E50',
        },
        // Status
        success: {
          DEFAULT: '#1E9B54',
          light: '#F1FCF5',
        },
        caution: {
          DEFAULT: '#CFA432',
          light: '#FFFAED',
        },
        critical: {
          DEFAULT: '#CE3E3E',
          light: '#FFF4F4',
        },
        // Gold — premium/paid features
        gold: {
          300: '#F2DF52',
          400: '#ECCD23',
          500: '#DCB516',
          600: '#BC8C10',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        // Museo for headings — woff2 files loaded via @font-face in globals.css
        museo:  ['Museo', 'Georgia', 'serif'],
        // Syne for hero headlines and stats
        syne:   ['Syne', 'Georgia', 'sans-serif'],
        // DM Serif Display for article h2s and card titles
        serif:  ['DM Serif Display', 'Georgia', 'serif'],
        // Inter for body / UI
        inter:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans:   ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display-lg': ['64px', { lineHeight: '72px', fontWeight: '700' }],
        'display-md': ['56px', { lineHeight: '64px', fontWeight: '700' }],
        'display-sm': ['48px', { lineHeight: '48px', fontWeight: '700' }],
        // Headings
        'heading-xl': ['48px', { lineHeight: '72px', fontWeight: '600' }],
        'heading-lg': ['40px', { lineHeight: '60px', fontWeight: '600' }],
        'heading-md': ['32px', { lineHeight: '48px', fontWeight: '700' }],
        'heading-sm': ['24px', { lineHeight: '36px', fontWeight: '700' }],
        'heading-xs': ['18px', { lineHeight: '27px', fontWeight: '700' }],
        // Body
        'body-lg':  ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm':  ['14px', { lineHeight: '21px', fontWeight: '400' }],
        'body-xs':  ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'body-xxs': ['10px', { lineHeight: '12px', fontWeight: '500' }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      // Extends default Tailwind spacing — brand uses 4px base unit
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        'sm':   '4px',
        'md':   '6px',
        'lg':   '8px',
        'xl':   '12px',
        '2xl':  '16px',
        '3xl':  '24px',
      },

      // ─── Box Shadow ──────────────────────────────────────────────────
      boxShadow: {
        'resting': '0 1px 3px rgba(15, 23, 42, 0.08)',
        'hover':   '0 4px 12px rgba(15, 23, 42, 0.12)',
        'raised':  '0 8px 24px rgba(15, 23, 42, 0.16)',
        'card':    '0 2px 8px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.06)',
      },

      // ─── Max Width ───────────────────────────────────────────────────
      maxWidth: {
        'site': '1280px',   // main content container
        'text': '720px',    // prose / blog content
        'hero': '880px',    // hero headline
      },

      // ─── Animation ───────────────────────────────────────────────────
      animation: {
        'marquee':       'marquee 30s linear infinite',
        'marquee-slow':  'marquee 50s linear infinite',
        'fade-in':       'fadeIn 0.3s ease-out',
        'slide-down':    'slideDown 0.2s ease-out',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
