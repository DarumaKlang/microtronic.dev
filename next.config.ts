// next.config.ts

import type { NextConfig } from 'next';

// 🛑 FIX 1: แก้ Type Error 2344 โดยการระบุให้ TypeScript รู้จัก Type ของ Context Object
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // 💡 ลบคีย์ 'experiments' ออก เพราะ Next.js v15.x ไม่รู้จัก
    // experiments: { ... }, // <- ลบออกแล้ว
    
    // [PRESERVED CONFIG]
    reactStrictMode: false, 
    
    // [PRESERVED CONFIG]
    images: { 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '**',
            },
        ],
    },

    // ----------------------------------------------------------------
    // 💡 FIX: การตั้งค่า Webpack สำหรับ Buffer Fallback เท่านั้น
    // ----------------------------------------------------------------
    webpack: (config: any, context: NextJsWebpackConfigContext) => { 
        const { isServer } = context;
        
        // ❌ ลบ config.module.rules.push({ test: /\.wasm$/, ... }) ออก

        // เฉพาะสำหรับ Client-side Bundle เท่านั้น (แก้ปัญหา Buffer Fallback)
        if (!isServer) {
            config.resolve = {
                ...(config.resolve || {}), 
                fallback: {
                    ...(config.resolve?.fallback || {}), 
                    // เพิ่ม 'buffer' เข้ามาใน fallback สำหรับไลบรารี Crypto
                    buffer: require.resolve('buffer/'),
                },
            };
        }

        return config;
    },
    // ----------------------------------------------------------------
};

module.exports = nextConfig;