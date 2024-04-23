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
        "brand-red": "#F53C2B",
        "status-blue": "#0075FF",
        "light-grey": "#A0AEC0",
      },
      backgroundImage: {
        "main-background":
          "linear-gradient(140deg, #0F123B 0%, #090D2E 59%, #020515 100%)",
        "sidebar-background":
          "linear-gradient(140deg, rgba(6,11,38,0.94) 0%, rgba(26,31,55,1) 100%)",
        divider:
          "linear-gradient(0, rgba(224,225,226,0) 0%, rgba(224,225,226,1) 50%, rgba(224,225,226,0.16) 100%)",
        status:
          "linear-gradient(0,rgba(6,11,38,0.74) 0%,rgba(26,31,55,0.5) 100%)",
        welcome:
          "linear-gradient(0,rgba(6,11,38,0.89) 0%,rgba(26,31,55,0.5) 100%)",
        patient:
          "linear-gradient(0,rgba(6,11,38,0.94) 0%,rgba(26,31,55,0.49) 100%)",
      },
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
};
export default config;
