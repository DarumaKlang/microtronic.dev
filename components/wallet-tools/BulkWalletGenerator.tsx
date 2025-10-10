// components/wallet-tools/BulkWalletGenerator.tsx
'use client';
import React, { useState, useMemo } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair'; 

const ECPair = ECPairFactory(tinySecp); 
(bitcoin as any).initEccLib(tinySecp); 
const BTC_NETWORK = bitcoin.networks.bitcoin; 

const Disclaimer = () => (
    <p className="mt-8 text-sm text-center text-red-300 p-4 border border-red-500 rounded-lg max-w-xl mx-auto">
        **ข้อควรระวัง:** เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ **ปลอดภัย** และควรพิจารณาใช้บนเครื่องที่ **ไม่ได้เชื่อมต่ออินเทอร์เน็ต** เพื่อความปลอดภัยสูงสุด
        <br/><br/>
        **เราไม่มีการเก็บข้อมูลใดๆ ดังนั้นก่อนจะปิดเบราเซอร์ ควรปริ้น หรือ เซฟข้อมูลเก็บไว้** <br/>
        โครงการ Open Source JavaScript Client-Side Bitcoin Wallet Generator
    </p>
);

interface Wallet {
    address: string;
    privateKeyWIF: string;
    seedHex?: string;
}

export default function BulkWalletGenerator() {
    const [count, setCount] = useState(10);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    /**
     * Helper function to generate a single wallet securely
     */
    const createSingleWallet = (): Wallet => {
        // 1. สร้าง Seed 32 bytes จาก Crypto API โดยตรง (ปลอดภัยสูงสุด)
        const randomBytes = new Uint8Array(32); 
        window.crypto.getRandomValues(randomBytes);
        const privateKeyBuffer = Buffer.from(randomBytes);
        
        // 2. สร้าง ECPair จาก Private Key Buffer
        const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network: BTC_NETWORK });
        
        // 3. สร้าง Address (Legacy P2PKH)
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK });
        
        return {
            address: address || 'Error',
            privateKeyWIF: keyPair.toWIF(),
            seedHex: privateKeyBuffer.toString('hex') 
        };
    };

    const generateBulk = () => {
        setIsGenerating(true);
        const newWallets: Wallet[] = [];
        try {
            // หน่วงเวลาเล็กน้อยเพื่อให้ UI อัปเดตสถานะ 'กำลังสร้าง...'
            setTimeout(() => {
                for (let i = 0; i < count; i++) {
                    newWallets.push(createSingleWallet());
                }
                setWallets(newWallets);
                setIsGenerating(false);
            }, 50);
        } catch(e) {
            console.error(e);
            alert("Generation failed.");
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full">
            <h2 className="text-3xl font-extrabold">Bulk Wallet Generator</h2>
            <p className="text-lg text-center max-w-2xl">
                **หลักการทำงาน:** สร้างกุญแจส่วนตัวหลายชุดพร้อมกันโดยใช้ **ค่าสุ่มจากเครื่อง (window.crypto)** อย่างเดียว เพื่อเพิ่มความสะดวกในการเตรียม Paper Wallet จำนวนมาก
            </p>

            {wallets.length === 0 ? (
                <div className="flex flex-col items-center gap-4">
                    {/* แก้ไข Accessibility Error: เพิ่ม Label และ id */}
                    <label htmlFor="wallet-count" className="text-xl">จำนวน Wallet ที่ต้องการ:</label> 
                    <input 
                        id="wallet-count" // id เชื่อมกับ htmlFor
                        type="number" 
                        min="1" 
                        max="100" 
                        value={count} 
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)} 
                        className="p-2 w-32 text-center text-black rounded"
                    />
                    <button 
                        onClick={generateBulk} 
                        disabled={isGenerating}
                        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold disabled:bg-gray-500"
                    >
                        {isGenerating ? 'กำลังสร้าง...' : `สร้าง ${count} Wallet`}
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl bg-gray-700/50 p-6 rounded-lg overflow-auto">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Wallets ที่สร้างสำเร็จ ({wallets.length} ชุด)</h3>
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-2">#</th>
                                <th className="p-2">Address (Legacy)</th>
                                <th className="p-2">Private Key (WIF)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wallets.map((w, index) => (
                                <tr key={index} className="border-b border-gray-800 hover:bg-gray-600/50">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2 font-mono break-all text-sm">{w.address}</td>
                                    <td className="p-2 font-mono break-all text-sm text-red-400">{w.privateKeyWIF}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => setWallets([])} className="mt-4 px-4 py-2 bg-fuchsia-600 rounded">สร้างชุดใหม่</button>
                </div>
            )}
            <Disclaimer />
        </div>
    );
}