// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'my-dark-gradient': 'linear-gradient(180deg, #0A192F 0%, #28135B 50%, #000000 100%)', // Gradient เก่า
        'my-new-gradient': 'linear-gradient(180deg, #2DD4BF 0%, #FFFFFF 50%, #E879F9 100%)', // Gradient ใหม่ที่คุณต้องการ
      },
      // ถ้ามี colors, extend, screens อื่นๆ ก็สามารถเพิ่มได้ที่นี่
    },
  },
  plugins: [],
};
