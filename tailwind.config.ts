/** @type {import('tailwindcss').Config} */
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
};
export default config;
