// app/asset/sup-menu/paper-wallet/page.tsx
import PaperWalletGenerator from '@/components/wallet-tools/PaperWalletGenerator';
import GooeyBackground from '@/components/GooeyBackground'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Paper Wallet Generator - Microtronic',
    description: 'สร้าง Bitcoin Paper Wallet ด้วย User-generated Entropy',
};

export default function PaperWalletPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative">
            <GooeyBackground />
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
                    Bitcoin Paper Wallet Generator
                </h1>
                <PaperWalletGenerator />
            </main>
        </div>
    );
}