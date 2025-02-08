const config = {
  content: [
    "./pages/**/*.vue",
    "./components/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
export default config;
