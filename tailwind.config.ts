import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#eefbf2",
          100: "#d6f5df",
          500: "#31a65b",
          600: "#238747",
          700: "#1f6c3b"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(30, 92, 58, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
