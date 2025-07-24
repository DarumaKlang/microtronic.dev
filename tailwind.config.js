import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background gradient colors
        'bg-start': '#1a2a6c', // Example start color (dark blue)
        'bg-end': '#b21f1f',   // Example end color (dark red)
        // Gradient circle colors
        'g1-start': '#ff7e5f', // Orange
        'g1-end': '#feb47b',   // Light orange
        'g2-start': '#6a11cb', // Purple
        'g2-end': '#2575fc',   // Blue
        'g3-start': '#ee9ca7', // Pink
        'g3-end': '#ffdde1',   // Light pink
        'g4-start': '#00b09b', // Teal
        'g4-end': '#96c93d',   // Lime green
      },
      // You can also define custom properties for CSS variables here if preferred
      // For this example, we'll use CSS variables directly in the CSS file
    },
  },
  plugins: [],
};

export default config;
