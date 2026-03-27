import type { Config } from "tailwindcss";

/** Keep in sync with `MARQUEE_DURATION_S` in HeroArchiveMarquee.tsx. */
const heroMarqueeDurationS = 120;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F7F8FA",
          100: "#ECEFF3",
          200: "#D6DCE6",
          300: "#B7C2D3",
          400: "#93A3BE",
          500: "#7287A8",
          600: "#5A6E8E",
          700: "#465770",
          800: "#2F3A4A",
          900: "#141A22",
          950: "#0B0F14"
        },
        accent: {
          50: "#ECF8F5",
          100: "#D3F0E9",
          200: "#A7E1D2",
          300: "#73CBB7",
          400: "#47B29E",
          500: "#2E9A86",
          600: "#217A6A",
          700: "#1B5F54",
          800: "#154A41",
          900: "#0F3530"
        },
        paper: {
          50: "#FBFBFA",
          100: "#F7F6F3",
          200: "#F0EEE9",
          300: "#E6E3DC"
        }
      },
      boxShadow: {
        "hairline": "0 1px 0 0 rgba(15, 23, 42, 0.06)"
      },
      keyframes: {
        "hero-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "ambient-drift": {
          "0%, 100%": { opacity: "0.35", transform: "translate(0, 0)" },
          "50%": { opacity: "0.55", transform: "translate(2%, -1.5%)" }
        },
        "ambient-node": {
          "0%, 100%": { opacity: "0.14" },
          "50%": { opacity: "0.28" }
        }
      },
      animation: {
        "hero-marquee": `hero-marquee ${heroMarqueeDurationS}s linear infinite`,
        "ambient-drift": "ambient-drift 28s ease-in-out infinite",
        "ambient-node": "ambient-node 12s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

