import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#9F9AEE',
        'pink': '#EFC2D9',
        'mid-purple': '#D0B2E1',
        'purple-black': '#645A75',
        'off-white': '#F6F5FB'
      },
      borderRadius: {
        'xxl': '40px'
      }
    }

  },
  plugins: [],
};
export default config;
