/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{jpg,png}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#443',
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(0)' },
        },
        aboutImage: {
          '0%, 100%': { 
            transform: 'scale(0.9)',
            borderRadius: '4% 95% 6% 95% / 95% 4% 92% 5%'
          },
          '50%': { 
            transform: 'scale(0.8)',
            borderRadius: '95% 4% 97% 5% / 4% 94% 3% 95%'
          }
        }
      },
      animation: {
        'slow-bounce': 'slow-bounce 2s infinite ease-in-out',
        'about-image': 'aboutImage 4s linear infinite'
      },
      borderRadius: {
        'custom': '95% 4% 97% 5% / 4% 94% 3% 95%',
        'custom-hover': '4% 95% 6% 95% / 95% 4% 92% 5%',
      },
      screens: {
        xs: "380px",
        sm: "540px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      transitionTimingFunction: {
        smooth: "all 0.2s linear",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};