// components/wallet-tools/BulkWalletDynamicLoader.tsx
"use client"; // 🛑 ต้องเป็น Client Component เพื่อให้สามารถใช้ dynamic import ที่มี ssr: false ได้

import dynamic from 'next/dynamic';

// 💡 ทำ Dynamic Import ที่นี่
const BulkWalletGeneratorDynamic = dynamic(
    // ใช้ฟังก์ชัน import() เพื่อโหลด Component
    () => import('./BulkWalletGenerator'),
    { 
        // 🛑 ตั้งค่า ssr: false เพื่อป้องกันไม่ให้ Component นี้ถูก Bundle ใน Server (แก้ปัญหา Wasm)
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือสร้าง Bulk Wallet...</p> 
    }
);

/**
 * Client Wrapper เพื่อเรียกใช้ BulkWalletGenerator ด้วย ssr: false
 * แก้ปัญหา WebAssembly Build Error ใน Server Component ของ Next.js 15.x
 */
export default function BulkWalletDynamicLoader() {
    return <BulkWalletGeneratorDynamic />;
}