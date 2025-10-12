// components/wallet-tools/BrainWalletDynamicLoader.tsx
"use client"; // 🛑 Component นี้ต้องเป็น Client Component

import dynamic from 'next/dynamic';

// 💡 ทำ Dynamic Import ภายใน Client Component
const BrainWalletGeneratorDynamic = dynamic(
    () => import('@/components/wallet-tools/BrainWalletGenerator'),
    { 
        // 🛑 ตั้งค่า ssr: false ที่นี่
        ssr: false, 
        loading: () => <p className="text-white text-center py-12">กำลังโหลดเครื่องมือคำนวณ...</p> 
    }
);

/**
 * Client Wrapper เพื่อเรียกใช้ BrainWalletGenerator ด้วย ssr: false 
 * ซึ่งเป็นวิธีที่ถูกต้องในการหลีกเลี่ยง Build Error ของ WebAssembly 
 * ใน Server Component
 */
export default function BrainWalletDynamicLoader() {
    return <BrainWalletGeneratorDynamic />;
}