// next.config.ts

import type { NextConfig } from 'next';

// 🛑 FIX 1: แก้ Type Error 2344 โดยการระบุให้ TypeScript รู้จัก Type ของ Context Object
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // 💡 FIX A: เปิดใช้งาน WebAssembly Experiments (ต้องมีเสมอ)
    experiments: {
        asyncWebAssembly: true, // เปิดใช้งานการโหลด Wasm แบบ Asynchronous
        topLevelAwait: true,     // มักจำเป็นสำหรับการ import Wasm modules
    },
    
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
    // 💡 FIX B: การตั้งค่า Webpack เพื่อจัดการ .wasm และ Fallback
    // ----------------------------------------------------------------
    webpack: (config: any, context: NextJsWebpackConfigContext) => { 
        const { isServer } = context;
        
        // 🛑 FIX 2: เพิ่ม rule สำหรับไฟล์ .wasm โดยเฉพาะ
        // เพื่อให้ Webpack ทราบว่าต้องจัดการไฟล์เหล่านี้เป็น WebAssembly Module
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'webassembly/async', // ต้องกำหนดให้เป็น 'webassembly/async' เพื่อให้สอดคล้องกับ experiments ด้านบน
        });

        // เฉพาะสำหรับ Client-side Bundle เท่านั้น (แก้ปัญหา Buffer Fallback)
        if (!isServer) {
            config.resolve = {
                ...(config.resolve || {}), 
                fallback: {
                    ...(config.resolve?.fallback || {}), 
                    buffer: require.resolve('buffer/'),
                },
            };
        }

        return config;
    },
    // ----------------------------------------------------------------
};

module.exports = nextConfig;