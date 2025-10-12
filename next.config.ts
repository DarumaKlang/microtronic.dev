// next.config.ts

import type { NextConfig } from 'next';
// ... โค้ดส่วนบน (การกำหนด Type) ...
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // ... [PRESERVED CONFIG] ...
    reactStrictMode: false, 
    // ... [PRESERVED CONFIG] ...
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

        // 🛑 NEW FIX for WASM (tiny-secp256k1) error
        // 1. Enable WebAssembly experiments (ตามที่ Error แนะนำ)
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true, // หรือ 'syncWebAssembly: true' หากพบปัญหา
        };

        // 2. Add rule for WebAssembly files
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'webassembly/async',
        });
        // 🛑 END NEW FIX
        
        // เฉพาะสำหรับ Client-side Bundle เท่านั้น (โค้ดเดิมของคุณ)
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