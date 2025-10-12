// components/wallet-tools/VanityWalletDynamicLoader.tsx
"use client";

import dynamic from 'next/dynamic';

const VanityWalletGeneratorDynamic = dynamic(
    () => import('./VanityWalletGenerator'),
    { 
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือ Vanity Wallet...</p> 
    }
);

export default function VanityWalletDynamicLoader() {
    return <VanityWalletGeneratorDynamic />;
}