import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors'; // Import default colors

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Background gradient colors (Original Custom)
                'bg-start': '#1a2a6c', // Example start color (dark blue)
                'bg-end': '#b21f1f',   // Example end color (dark red)
                // Gradient circle colors (Original Custom)
                'g1-start': '#ff7e5f', // Orange
                'g1-end': '#feb47b',   // Light orange
                'g2-start': '#6a11cb', // Purple
                'g2-end': '#2575fc',   // Blue
                'g3-start': '#ee9ca7', // Pink
                'g3-end': '#ffdde1',   // Light pink
                'g4-start': '#00b09b', // Teal
                'g4-end': '#96c93d',   // Lime green

                // --- เพิ่มสีที่ใช้ใน page.tsx เพื่อให้ Build ผ่าน ---
                
                // นำเข้าสีมาตรฐานกลับมา (Blue และ Fuchsia)
                blue: colors.blue,
                fuchsia: colors.fuchsia,

                // กำหนดเฉดสีเพิ่มเติม/ทดแทน (เพื่อให้คลาสที่เรียกใช้ใน page.tsx ใช้งานได้)
                'blue-980': '#0C1B5A', // ค่าที่เข้มกว่า blue-900 เล็กน้อยสำหรับ gradient
                'blue-900': colors.blue['900'], // ใช้ blue-900 มาตรฐานของ Tailwind
                'fuchsia-800': colors.fuchsia['800'], // ใช้ fuchsia-800 มาตรฐานของ Tailwind

                // เพิ่มสีที่คุณใช้ในปุ่ม CTA ใน page.tsx ด้วย (fuchsia-600, fuchsia-700)
                'fuchsia-600': colors.fuchsia['600'],
                'fuchsia-700': colors.fuchsia['700'],
                
                // --- สิ้นสุดการเพิ่มสี ---
            },
        },
    },
    plugins: [],
};

export default config;