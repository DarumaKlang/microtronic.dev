// components/wallet-tools/BrainWalletGenerator.tsx
'use client';
import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinySecp from 'tiny-secp256k1'; // 🛑 โมดูลหลัก tinySecp มี sha256 อยู่แล้ว

import { ECPairFactory } from 'ecpair'; 
// 🛑 ลบบรรทัดนี้ที่ก่อให้เกิด Error
// import { sha256 } from 'tiny-secp256k1/lib/sha256'; // <--- ลบออก!

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

export default function BrainWalletGenerator() {
    const [passphrase, setPassphrase] = useState('');
    const [wallet, setWallet] = useState<{ address: string, privateKeyWIF: string } | null>(null);

    const sha256Async = async (data: Uint8Array | ArrayBuffer | string): Promise<Uint8Array> => {
        let input: Uint8Array;
        if (typeof data === 'string') {
            input = new TextEncoder().encode(data);
        } else if (data instanceof ArrayBuffer) {
            input = new Uint8Array(data);
        } else {
            input = data;
        }
        // Ensure we pass a plain ArrayBuffer with the exact bytes to crypto.subtle.digest
        // to avoid TypeScript BufferSource / ArrayBufferLike incompatibility.
        // Create a fresh ArrayBuffer by copying the relevant bytes to guarantee a plain ArrayBuffer
        // (this avoids SharedArrayBuffer/typing issues).
        const bufferToHash = new Uint8Array(input).buffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', bufferToHash);
        return new Uint8Array(hashBuffer);
    };

    const generateBrain = async () => {
        if (!passphrase) {
            alert('กรุณากรอก Passphrase');
            return;
        }

        // 1. ใช้ SHA256 hashing หลายครั้งเพื่อสร้าง Private Key Buffer
        let hash = await sha256Async(passphrase);

        // เพิ่มความแข็งแกร่งด้วยการทำ Hashing ซ้ำ (Iteration)
        for (let i = 0; i < 10000; i++) {
            hash = await sha256Async(hash);
        }

        // 2. สร้าง KeyPair จาก Private Key Buffer
        const keyPair = ECPair.fromPrivateKey(hash, { network: BTC_NETWORK });

        // 3. สร้าง Address
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK });

        setWallet({ address: address || 'Error', privateKeyWIF: keyPair.toWIF() });
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold">Brain Wallet Generator</h2>
            <p className="text-lg text-center text-yellow-300">
                🚨 **คำเตือนความเสี่ยงสูง:** Brain Wallet **ไม่ปลอดภัย** หากใช้ Passphrase ที่คาดเดาได้ง่าย! เนื่องจากมันขึ้นอยู่กับความแข็งแกร่งของ Passphrase เพียงอย่างเดียว
            </p>
            <p className="text-md text-center">
                **หลักการทำงาน:** สร้าง Private Key จากการ Hash Passphrase ของคุณ ($SHA256 \times 10,000$ ครั้ง) ซึ่งสามารถสร้างซ้ำได้ทุกที่โดยไม่ต้องใช้ไฟล์เก็บข้อมูล
            </p>

            <input
                type="password"
                placeholder="กรุณากรอก Passphrase ที่คุณจำได้ (ยาวและสุ่ม)"
                value={passphrase}
                onChange={(e) => { setPassphrase(e.target.value); setWallet(null); }}
                className="p-3 w-full text-black rounded"
            />
            <button
                onClick={generateBrain}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold disabled:bg-gray-500"
            >
                สร้าง Brain Wallet
            </button>

            {wallet && (
                <div className="w-full bg-gray-700/50 p-6 rounded-lg mt-4">
                    <h3 className="text-xl font-bold mb-2 text-green-400">Address:</h3>
                    <p className="font-mono break-all">{wallet.address}</p>
                    <h3 className="text-xl font-bold mb-2 mt-4 text-red-400">Private Key (WIF):</h3>
                    <p className="font-mono break-all font-extrabold">{wallet.privateKeyWIF}</p>
                </div>
            )}
            <Disclaimer />
        </div>
    );
}