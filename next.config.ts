// next.config.ts

import type { NextConfig } from 'next';

// 🛑 FIX 1: แก้ Type Error 2344 โดยการระบุให้ TypeScript รู้จัก Type ของ Context Object
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // [PRESERVED CONFIG]
    reactStrictMode: false, 
    
    // 💡 FIX 3: เพิ่มการตั้งค่า experiments เพื่อรองรับ WebAssembly (Wasm)
    // การตั้งค่านี้จะแก้ปัญหา "Module parse failed: Unexpected character '�'"
    experiments: {
        asyncWebAssembly: true, // เปิดใช้งานการโหลด Wasm แบบ Asynchronous
        topLevelAwait: true,     // มักจำเป็นสำหรับการ import Wasm modules
    },

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
    // [PRESERVED] การตั้งค่า Webpack เดิมสำหรับ Buffer Fallback
    // ----------------------------------------------------------------
    webpack: (config: any, context: NextJsWebpackConfigContext) => { 
        const { isServer } = context;

        // เฉพาะสำหรับ Client-side Bundle เท่านั้น
        if (!isServer) {
            config.resolve = {
                ...(config.resolve || {}), 
                fallback: {
                    ...(config.resolve?.fallback || {}), 
                    // เพิ่ม 'buffer' เข้ามาใน fallback สำหรับไลบรารีที่ต้องการ
                    buffer: require.resolve('buffer/'),
                },
            };
        }

        return config;
    },
    // ----------------------------------------------------------------
};

module.exports = nextConfig;