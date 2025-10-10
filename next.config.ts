// next.config.ts

import type { NextConfig } from 'next';

// 🛑 FIX 1: แก้ Type Error 2344 โดยการระบุให้ TypeScript รู้ว่า 'webpack' function มีอยู่
// เราใช้ Parameters<NonNullable<NextConfig['webpack']>>[1]
// - NonNullable: เพื่อลบ 'null' ออกจาก Type ของ NextConfig['webpack']
// - Parameters<...>[1]: เพื่อดึง Type ของ Context Object ออกมา (พารามิเตอร์ที่ 2)
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
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
    // [FIXED] การตั้งค่า Webpack
    // ----------------------------------------------------------------
    // 🛑 FIX 2: ใช้ 'any' สำหรับ config เพื่อหลีกเลี่ยง Cannot find module 'webpack' (2307)
    webpack: (config: any, context: NextJsWebpackConfigContext) => { 
        const { isServer } = context;

        // เฉพาะสำหรับ Client-side Bundle เท่านั้น
        if (!isServer) {
            config.resolve = {
                ...(config.resolve || {}), 
                fallback: {
                    ...(config.resolve?.fallback || {}), 
                    // เพิ่ม 'buffer' เข้ามาใน fallback สำหรับ bitcoinjs-lib
                    buffer: require.resolve('buffer/'),
                },
            };
        }

        return config;
    },
    // ----------------------------------------------------------------
};

module.exports = nextConfig;