// components/wallet-tools/VanityWalletGenerator.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair'; 
import { QRCodeSVG } from 'qrcode.react'; // เพิ่มสำหรับแสดง QR Code

const ECPair = ECPairFactory(tinySecp); 
(bitcoin as any).initEccLib(tinySecp); 
const BTC_NETWORK = bitcoin.networks.bitcoin; 

const Disclaimer = () => (
    <p className="mt-8 text-sm text-center text-red-300 p-4 border border-red-500 rounded-lg max-w-xl mx-auto">
        <span className="font-bold">ข้อควรระวัง:</span> เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ <span className="font-bold">ปลอดภัย</span> และควรพิจารณาใช้บนเครื่องที่ <span className="font-bold">ไม่ได้เชื่อมต่ออินเทอร์เน็ต</span> เพื่อความปลอดภัยสูงสุด
        <br/><br/>
        <span className="font-bold">เราไม่มีการเก็บข้อมูลใดๆ ดังนั้นก่อนจะปิดเบราเซอร์ ควรปริ้น หรือ เซฟข้อมูลเก็บไว้</span> <br/>
        โครงการ Open Source JavaScript Client-Side Bitcoin Wallet Generator
    </p>
);

export default function VanityWalletGenerator() {
    const [prefix, setPrefix] = useState('1A');
    const [foundWallet, setFoundWallet] = useState<{ address: string, privateKeyWIF: string } | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // สำหรับแสดง Error
    const workerRef = useRef<Worker | null>(null);

    const startSearch = () => {
        setErrorMsg(null);
        if (isSearching) {
            workerRef.current?.terminate();
            workerRef.current = null;
            setIsSearching(false);
            return;
        }

        const normalizedPrefix = prefix.toUpperCase().trim();
        // ตรวจสอบความถูกต้องของ Prefix (Base58 characters)
        if (normalizedPrefix.length === 0 || !normalizedPrefix.match(/^[13bc]{1}[1-9A-HJ-NP-Za-km-z]*$/)) {
             setErrorMsg('Prefix ไม่ถูกต้อง ต้องเป็น Base58 Character และควรขึ้นต้นด้วย 1, 3, หรือ bc1');
             return;
        }
        // กำหนด Limit ไม่เกิน 8 ตัวอักษร
        if (normalizedPrefix.length > 8) {
            setErrorMsg('คำนำหน้ายาวเกินไป (ไม่ควรเกิน 8 ตัวอักษร)');
            return;
        }

        setFoundWallet(null);
        setIsSearching(true);
        setAttempts(0);

        // Web Worker Code (ใช้ Imports Scripts สำหรับไลบรารีใน Worker)
        const workerCode = `
            // Imports (ใช้ CDN หรือ URL ที่เชื่อถือได้)
            importScripts('https://unpkg.com/tiny-secp256k1@2.2.3/dist/tiny-secp256k1.js');
            importScripts('https://unpkg.com/ecpair@2.1.0/dist/ecpair.js');
            importScripts('https://unpkg.com/bitcoinjs-lib@6.1.1/dist/bitcoinjs-lib.js');

            const tinySecp = self.tinysecp256k1;
            const ECPair = self.ECPairFactory(tinySecp); 
            self.bitcoin.initEccLib(tinySecp); 
            const BTC_NETWORK = self.bitcoin.networks.bitcoin;

            onmessage = function(e) {
                const targetPrefix = e.data.prefix.toUpperCase();
                let attempts = 0;
                let found = null;
                
                // Function to get Legacy Address (P2PKH)
                const getLegacyAddress = (keyPair) => {
                    // P2PKH works with compressed key too
                    const { address } = self.bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK }); 
                    return address;
                };

                while (!found) {
                    attempts++;
                    // 🛑 แก้ไข: ใช้ compressed: true เพื่อให้ได้ WIF ที่ขึ้นต้นด้วย K/L
                    const keyPair = ECPair.makeRandom({ compressed: true, network: BTC_NETWORK }); 
                    
                    const address = getLegacyAddress(keyPair);

                    if (address && address.startsWith(targetPrefix)) {
                        found = { address, privateKeyWIF: keyPair.toWIF() };
                        postMessage({ type: 'found', wallet: found, attempts });
                        break;
                    }

                    // อัปเดต Progress ทุก 5000 ครั้ง
                    if (attempts % 5000 === 0) {
                        postMessage({ type: 'progress', attempts });
                    }
                }
            }
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        workerRef.current = worker;

        worker.onmessage = (event) => {
            if (event.data.type === 'progress') {
                setAttempts(event.data.attempts);
            } else if (event.data.type === 'found') {
                setFoundWallet(event.data.wallet);
                setAttempts(event.data.attempts);
                setIsSearching(false);
                worker.terminate();
            }
        };

        worker.postMessage({ prefix: normalizedPrefix });
    };

    useEffect(() => {
        return () => {
            // Terminate worker when component unmounts
            workerRef.current?.terminate();
        };
    }, []);

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold">Vanity Wallet Generator</h2>
            <p className="text-md text-center">
                <span className="font-bold">หลักการทำงาน:</span> สร้างกุญแจส่วนตัวแบบสุ่มซ้ำ ๆ โดยใช้ <span className="font-bold">Web Worker</span> เพื่อไม่ให้เบราว์เซอร์ค้าง จนกว่าจะเจอ Public Address (Legacy P2PKH) ที่ขึ้นต้นด้วยคำนำหน้าที่คุณระบุ
                <br/>(ยิ่งคำนำหน้ายาวและซับซ้อน ยิ่งใช้เวลานานมาก)
            </p>
            
            {errorMsg && (
                <div className="w-full p-3 bg-red-600/50 rounded-lg text-sm font-bold">{errorMsg}</div>
            )}

            <div className='flex gap-2 w-full'>
                <input 
                    type="text"
                    placeholder="Prefix (เช่น 1Micro)"
                    value={prefix} 
                    // Base58 check: อนุญาตเฉพาะตัวอักษรและตัวเลขที่ใช้ใน Address เท่านั้น
                    onChange={(e) => setPrefix(e.target.value.replace(/[^1-9A-HJ-NP-Za-km-z]/gi, ''))} 
                    className="p-3 w-2/3 text-black rounded uppercase"
                    disabled={isSearching}
                    maxLength={8} // จำกัดความยาวไม่ให้เกิน 8 อักษร
                />
                <button 
                    onClick={startSearch} 
                    className={`px-6 py-3 rounded-lg font-bold w-1/3 transition ${isSearching ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isSearching ? 'หยุดค้นหา' : 'ค้นหา'}
                </button>
            </div>
            
            <p className="text-sm">พยายาม: <span className="font-bold">{attempts.toLocaleString()}</span> ครั้ง</p>
            
            {/* 🛑 NEW: Status Message (แสดงเมื่อกำลังค้นหาและยังไม่พบ) */}
            {isSearching && !foundWallet && (
                <div className="text-center p-3 bg-yellow-600/30 rounded-lg w-full">
                    <p className="text-xl font-bold animate-pulse">⏳ กำลังค้นหา Address ที่ขึ้นต้นด้วย "{prefix}"...</p>
                    <p className="text-sm mt-1 text-gray-300">การนับจำนวนครั้ง (Attempts) จะแสดงผลทุก 5,000 ครั้งที่ลองสุ่ม</p>
                </div>
            )}

            {foundWallet && (
                <div className="w-full bg-gray-700/50 p-6 rounded-lg mt-4 print:bg-gray-100 print:text-black">
                    <h3 className="text-xl font-bold mb-2 text-green-400 print:text-green-800">Address ที่พบ:</h3>
                    <p className="font-mono break-all text-lg font-extrabold print:text-lg">{foundWallet.address}</p>
                    
                    <h3 className="text-xl font-bold mb-2 mt-4 text-red-400 print:text-red-800">Private Key (WIF):</h3>
                    <p className="font-mono break-all print:text-sm">{foundWallet.privateKeyWIF}</p>
                    
                    {/* เพิ่ม QR Code */}
                    <div className="w-48 h-48 mx-auto p-2 bg-white rounded-lg mt-6 print:w-64 print:h-64">
                            <QRCodeSVG 
                                value={foundWallet.privateKeyWIF} 
                                size={180} 
                                level="M"
                                className="w-full h-full"
                            />
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="mt-6 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg text-lg font-bold shadow-xl transition duration-300 w-full print:hidden"
                    >
                        🖨️ พิมพ์ Paper Wallet
                    </button>
                </div>
            )}
            <Disclaimer />
        </div>
    );
}