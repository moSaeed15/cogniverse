import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#F53C2B',
      },
      backgroundImage: {
        'main-background':
          'linear-gradient(140deg, #0F123B 0%, #090D2E 59%, #020515 100%)',
        'sidebar-background':
          'linear-gradient(140deg, rgba(6,11,38,0.94) 0%, rgba(26,31,55,1) 100%)',
        divider:
          'linear-gradient(0, rgba(224,225,226,0) 0%, rgba(224,225,226,1) 50%, rgba(224,225,226,0.16) 100%)',
      },
    },
  },
  daisyui: {
    themes: ['dark'],
  },
  plugins: [require('daisyui')],
};
export default config;
