// components/wallet-tools/SplitWalletGenerator.tsx
'use client';
import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair'; 
import { Buffer } from 'buffer'; 
import type { Buffer as BufferType } from 'buffer'; // 🛑 แก้ไข Error 2554 โดยการ Import Type แยก

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

export default function SplitWalletGenerator() {
    const [wallets, setWallets] = useState<{ WIF: string, pubkey: string }[]>([]);
    const [multisigAddress, setMultisigAddress] = useState('');
    const [mRequired, setMRequired] = useState(2);
    const [nTotal, setNTotal] = useState(2);

    const generateMultisigWallet = (m: number, n: number) => {
        if (m < 1 || n < m || n > 15) {
            alert('ค่า M และ N ไม่ถูกต้อง: N ต้องไม่เกิน 15 และ M ต้องน้อยกว่าหรือเท่ากับ N');
            return;
        }
        if (n < 2) {
             alert('Multisig Wallet ต้องมีกุญแจรวม (N) อย่างน้อย 2 ดอก');
             return;
        }

        const keyPairs = [];
        // 🛑 แก้ไข Error 2554: ใช้ BufferType ในการกำหนด Type แทน Buffer value
        const pubKeys: BufferType[] = []; 
        
        // 1. สร้าง N Key Pairs โดยใช้ค่าสุ่มที่ปลอดภัย
        for (let i = 0; i < n; i++) {
            const keyPair = ECPair.makeRandom({ network: BTC_NETWORK });
            keyPairs.push({ 
                WIF: keyPair.toWIF(),
                pubkey: Buffer.from(keyPair.publicKey).toString('hex')
            });
            
            // ใช้ Buffer.from() เพื่อแปลง Uint8Array เป็น Buffer (แก้ไข Error 2345)
            pubKeys.push(Buffer.from(keyPair.publicKey)); 
        }
        
        // 2. เรียงลำดับ Public Key ตาม BIP67 ก่อนสร้าง script
        const sortedPubKeys = pubKeys.sort((a, b) => a.compare(b));

        // 3. สร้าง Multisig Redeem Script และ P2SH Address (Legacy type)
        const p2ms = bitcoin.payments.p2ms({ m, pubkeys: sortedPubKeys, network: BTC_NETWORK });
        const { address } = bitcoin.payments.p2sh({ redeem: p2ms, network: BTC_NETWORK });
        
        setWallets(keyPairs);
        setMultisigAddress(address || 'Error');
        setMRequired(m);
        setNTotal(n);
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold">Split Wallet Generator (Multisig M-of-N)</h2>
            <p className="text-lg text-center">
                **หลักการทำงาน:** สร้างที่อยู่ Multisignature Wallet (P2SH) ที่ต้องใช้กุญแจส่วนตัวจำนวน M ดอกจาก N ดอกทั้งหมดในการถอนเงิน
            </p>
            
            <div className='flex gap-4 items-center'>
                <label className="text-lg" htmlFor="m-required">ต้องใช้ (M):</label>
                <input 
                    id="m-required"
                    type="number" 
                    min="1" max="15" 
                    value={mRequired} 
                    onChange={(e) => setMRequired(parseInt(e.target.value) || 1)} 
                    className="p-2 w-16 text-center text-black rounded"
                />
                <span className="text-2xl">of</span>
                <label className="text-lg" htmlFor="n-total">ทั้งหมด (N):</label>
                <input 
                    id="n-total"
                    type="number" 
                    min="1" max="15" 
                    value={nTotal} 
                    onChange={(e) => setNTotal(parseInt(e.target.value) || 1)} 
                    className="p-2 w-16 text-center text-black rounded"
                />
            </div>
            
            <button 
                onClick={() => generateMultisigWallet(mRequired, nTotal)} 
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold"
            >
                สร้าง {mRequired}-of-{nTotal} Multisig Wallet
            </button>
            
            {multisigAddress && (
                <div className="w-full bg-gray-700/50 p-6 rounded-lg mt-4 overflow-auto">
                    <h3 className="text-xl font-bold mb-2 text-green-400">Multisig Address (P2SH):</h3>
                    <p className="font-mono break-all font-extrabold">{multisigAddress}</p>
                    <p className="mt-2 text-yellow-300">
                        🚨 **การใช้งาน:** ในการใช้จ่ายจาก Address นี้ คุณต้องมี Private Key จำนวน **{mRequired} ดอก** จาก **{nTotal} ดอก** นี้
                    </p>
                    
                    <h4 className="text-lg font-bold mt-4 text-red-400">Private Keys ({wallets.length} Keys):</h4>
                    {wallets.map((w, index) => (
                        <div key={index} className='mt-2 border-t border-gray-600 pt-2'>
                            <p className='text-sm font-mono break-all'>
                                **Key {index + 1} (WIF):** {w.WIF}
                            </p>
                            <p className='text-xs text-gray-400 break-all'>
                                Public Key: {w.pubkey}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <Disclaimer />
        </div>
    );
}