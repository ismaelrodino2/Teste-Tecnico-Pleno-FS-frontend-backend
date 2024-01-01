import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryBlue: "#14ACF2",
      lightBlue: "#6BCCF9",
      lightBlueLow: "#E0F5FF",
      deepBlue: "#00528f",
      paleBlue: "#ECF9FF",
      pink: "#F04494",
      lightPink: "#FB87BD",
      palePink: "#FFBEDC",
      white: "#FFFFFF",
      gray: "#666262",
      mediumgGray: "#6A707C",
      highgGray: "#454444",
      lowGray: "#AEAEAE",
      lightGray: "#D4D3D3",
      lightBlack: "#242424",
      black: "#000000",
      red: "#FF0000",
      green: "#008000",
    },
  },
  plugins: [],
};
export default config;
