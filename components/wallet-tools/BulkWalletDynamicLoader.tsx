// components/wallet-tools/BulkWalletDynamicLoader.tsx
"use client"; // 🛑 ต้องมีบรรทัดนี้

import dynamic from 'next/dynamic';

const BulkWalletGeneratorDynamic = dynamic(
    () => import('./BulkWalletGenerator'),
    { 
        // 🚨 ส่วนนี้สำคัญที่สุด ต้องเป็น false
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือ Bulk Wallet...</p> 
    }
);

export default function BulkWalletDynamicLoader() {
    return <BulkWalletGeneratorDynamic />;
}