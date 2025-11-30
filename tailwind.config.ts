// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}', 
        './app/**/*.{js,ts,jsx,tsx,mdx}', 
    ],
    theme: {
        extend: {
            colors: {
                // Background gradient colors (เพิ่มตามที่ใช้ใน page.tsx)
                'blue-980': '#0C0A3F', 
                'blue-900': '#121060',
                'fuchsia-800': '#831843',
                'cyan-500': '#06B6D4', // เพิ่มเพื่อให้ GooeyBackground ใช้ได้
                'pink-500': '#EC4899', // เพิ่มเพื่อให้ GooeyBackground ใช้ได้
                'blue-500': '#3B82F6', // เพิ่มเพื่อให้ GooeyBackground ใช้ได้
                
                // Existing user's colors (to preserve them)
                'bg-start': '#1a2a6c', 
                'bg-end': '#b21f1f',   
                'g1-start': '#ff7e5f', 
                'g1-end': '#feb47b',   
                'g2-start': '#6a11cb', 
                'g2-end': '#2575fc',   
                'g3-start': '#ee9ca7', 
                'g3-end': '#ffdde1',   
                'g4-start': '#00b09b', 
                'g4-end': '#96c93d',   
            },
            // ADDED: Keyframes and Animation for GooeyBackground
            keyframes: {
                blob: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 40px) scale(0.9)' },
                },
                'blob-medium': {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(-50px, 30px) scale(1.2)' },
                    '66%': { transform: 'translate(40px, -20px) scale(0.8)' },
                },
                'blob-slow': {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(60px, 20px) scale(1.1)' },
                    '66%': { transform: 'translate(-30px, -60px) scale(0.95)' },
                },
            },
            animation: {
                'blob-slow': 'blob-slow 25s infinite alternate',
                'blob-medium': 'blob-medium 20s infinite alternate',
                'blob-fast': 'blob 15s infinite alternate',
            },
        },
    },
    plugins: [],
};

export default config;