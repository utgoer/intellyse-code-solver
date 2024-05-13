import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'systemGray': {
          1: '#8e8e93',
          2: '#636366',
          3: '#48484a',
          4: '#3a3a3c',
          5: '#2c2c2e',
          6: '#1c1c1e'
        }
      }
    },
  },
  plugins: [],
};


export default config;
