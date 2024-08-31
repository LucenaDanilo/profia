import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(10deg, #5fcdee, #4992d7, #093248);",
 
      },
      colors:{
        "dark-purple": "#081A51",
        "dark-purple-hover":"#586da9",
        "light-white": 'rgba(255,255,255,0.18)'
      },
      rotate: {
        '90': '-42deg',
      },
    }
  },
  plugins: [],
};
export default config;
