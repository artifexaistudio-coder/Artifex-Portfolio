import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF007F",
        secondary: "#00F0FF",
        accent: "#8A2BE2",
        dark: "#050510"
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(99, 102, 241, 1)" }
        }
      }
    }
  },
  plugins: []
};

export default config;

