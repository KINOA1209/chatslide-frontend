/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        iPhoneSE: '375px',
        dpr: {
          raw: 'screen and (min-device-pixel-ratio: 2)',
        },
        'small': { 'max': '991px' },
        'medium': { 'min': '992px', 'max': '1247px' },
        'large': { 'min': '1248px', 'max': '1535px' },
        'xlarge': { 'min': '1536px' },
      },
      backgroundImage: {

        'template-fun-education-004-cover':
          "url('/images/template/Fun_Education_004/BackgroundElements.png')",
      },
      backgroundColor: {
        Sky: 'var(--Sky, #F4F6FE)',
        Blue: 'var(--Blue, #5168f6)',
        Purple: 'var(--Purple, #6A7EF9)',
        'Grey-50': 'var(--Grey-50, #F4F4F4)',
        'Grey-100': 'var(--Grey-100, #E7E9EB)',
        'Workflow-bg-color': 'var(--Workflow-bg-color, #6A7EF9)',
        'button-color': 'var(--Blue-600, #5168f6)',
        Lavender: 'var(--Lavender, #9AAEF9)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'neutral-100': 'var(--neutral-100, #1E202C)',
        'regal-blue': '#243c5a',
        Sky: 'var(--Sky, #F4F6FE)',
        Blue: 'var(--Blue, #5168f6)',
        Dark: 'var(--Dark, #2B2C2D)',
        'Grey-600': 'var(--Grey-600, #525C6A)',
        gray: {
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#DFDFDF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#191919',
        },
        blue: {
          100: '#E6F0FD',
          200: '#CCE2FC',
          300: '#99C5FA',
          400: '#66A9F7',
          500: '#338CF5',
          600: '#0070F4',
          700: '#0064DA',
          800: '#0059C2',
          900: '#004391',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: 'float 3s ease-in-out infinite',
      },
      backgroundColor: {
        Sky: 'var(--Sky, #F4F6FE)',
        Blue: 'var(--Blue, #5168f6)',
        Purple: 'var(--Purple, #6A7EF9)',
        'Grey-50': 'var(--Grey-50, #F4F4F4)',
        'Grey-100': 'var(--Grey-100, #E7E9EB)',
        'Workflow-bg-color': 'var(--Workflow-bg-color, #6A7EF9)',
        'button-color': 'var(--Blue-600, #5168f6)',
        Lavender: 'var(--Lavender, #9AAEF9)',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.16)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
        default:
          '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
      },
      spacing: {
        '9/16': '56.25%',
        '3/4': '75%',
        '1/1': '100%',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'creato-regular': ['Creato Display Regular', 'sans'],
        'creato-thin': ['Creato Display Thin', 'sans'],
        'creato-medium': ['Creato Display Medium', 'sans'],
        'creato-bold': ['Creato Display Bold', 'sans'],
        'nimbus-sans-regular': ['Nimbus Sans Regular', 'sans'],
        'nimbus-sans-bold': ['Nimbus Sans Bold', 'sans'],
        'caveat-bold': ['Caveat Bold', 'cursive'],
        'caveat-medium': ['Caveat Medium', 'cursive'],
        'caveat-regular': ['Caveat Regular', 'cursive'],
        'sansita-swashed-medium': ['Sansita Swashed Medium', 'sans'],
        'sansita-swashed-regular': ['Sansita Swashed Regular', 'sans'],
        'libre-baskerville-bold': ['Libre Baskerville Bold', 'sans'],
        'libre-baskerville-regular': ['Libre Baskerville Regular', 'sans'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.625rem',
        '5xl': '3.25rem',
        '6xl': '5.5rem',
      },
      inset: {
        '1/2': '50%',
        full: '100%',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.2rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      minWidth: {
        10: '2.5rem',
        48: '12rem',
      },
      opacity: {
        90: '0.9',
      },
      scale: {
        98: '.98',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/forms')],
}



