import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      main: "#273559",
      mainBackgroundColor: "#EFF1F6",
      white: "#fff",
      subText: "#636B7F",
      borderColor: "#CFD0D3",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
