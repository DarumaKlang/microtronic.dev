// components/wallet-tools/SplitWalletDynamicLoader.tsx
"use client";

import dynamic from 'next/dynamic';

const SplitWalletGeneratorDynamic = dynamic(
    () => import('./SplitWalletGenerator'),
    { 
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือ Split Wallet...</p> 
    }
);

export default function SplitWalletDynamicLoader() {
    return <SplitWalletGeneratorDynamic />;
}