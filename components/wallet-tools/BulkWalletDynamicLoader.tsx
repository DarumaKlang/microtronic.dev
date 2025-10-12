// components/wallet-tools/BulkWalletDynamicLoader.tsx
"use client"; // 🛑 ต้องเป็น Client Component เสมอ

import dynamic from 'next/dynamic';

// 💡 Dynamic Import with SSR disabled
const BulkWalletGeneratorDynamic = dynamic(
    () => import('./BulkWalletGenerator'),
    { 
        // 🛑 บรรทัดนี้สำคัญที่สุด: บอก Next.js ให้ข้ามการ Render ในฝั่ง Server
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือ Bulk Wallet...</p> 
    }
);

/**
 * Client Wrapper สำหรับ BulkWalletGenerator
 */
export default function BulkWalletDynamicLoader() {
    return <BulkWalletGeneratorDynamic />;
}