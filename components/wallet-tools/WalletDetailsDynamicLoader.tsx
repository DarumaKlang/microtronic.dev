// components/wallet-tools/WalletDetailsDynamicLoader.tsx
"use client";

import dynamic from 'next/dynamic';

const WalletDetailsCheckerDynamic = dynamic(
    () => import('./WalletDetailsChecker'),
    { 
        ssr: false, 
        loading: () => <p className="text-white text-center py-12 text-xl">กำลังโหลดเครื่องมือตรวจสอบ Wallet...</p> 
    }
);

export default function WalletDetailsDynamicLoader() {
    return <WalletDetailsCheckerDynamic />;
}