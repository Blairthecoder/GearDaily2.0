import type { Config } from "tailwindcss";

// GearDaily design tokens — bold, grounded, editorial. Not default Tailwind grays.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        paper: "#F7F5F1",
        canvas: "#EFEBE3",
        brass: "#A9895C",
        rust: "#8C3B2E",
        forest: "#374A3E",
        line: "#D9D3C7",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
