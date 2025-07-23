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
        // นี่คือ Gradient ที่คุณต้องการ:
        'my-new-gradient': 'linear-gradient(180deg, #212F58 0%, #4A1B6B 50%, #7B1F7B 100%)',
        // ถ้าคุณต้องการใช้ชื่อ 'my-dark-gradient' เดิม ให้เปลี่ยนค่าของมันแทน
        // 'my-dark-gradient': 'linear-gradient(180deg, #212F58 0%, #4A1B6B 50%, #7B1F7B 100%)',
      },
      // ... (ส่วนอื่นๆ ของ config)
    },
  },
  plugins: [],
};
