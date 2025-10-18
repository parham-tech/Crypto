/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
    dark: {
      bg: "var(--color-bg-dark)",
      surface: "var(--color-surface-dark)",
      border: "var(--color-border-dark)",
      gold: "var(--color-gold)",
      goldLight: "var(--color-gold-light)",
      text: {
        light: "var(--color-text-light)",
        muted: "var(--color-text-muted)",
      },
    },
  },
    },
  },
  plugins: [],darkMode: "class"
};
