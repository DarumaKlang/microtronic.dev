// components/wallet-tools/PaperWalletDynamicLoader.tsx
"use client";

import dynamic from 'next/dynamic';

const PaperWalletGeneratorDynamic = dynamic(
    () => import('./PaperWalletGenerator'),
    { 
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือ Paper Wallet...</p> 
    }
);

export default function PaperWalletDynamicLoader() {
    return <PaperWalletGeneratorDynamic />;
}