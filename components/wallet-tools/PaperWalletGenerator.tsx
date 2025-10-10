// PaperWalletGenerator.tsx
'use client'; 

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as bitcoin from 'bitcoinjs-lib'; 
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory, ECPairInterface } from 'ecpair'; 
import { QRCodeSVG } from 'qrcode.react';

// 1. Initialize ECPair Factory
const ECPair = ECPairFactory(tinySecp); 

// 2. Initialize payments lib with ECC (จำเป็นสำหรับ bitcoinjs-lib)
(bitcoin as any).initEccLib(tinySecp); 

// Constants
const BTC_NETWORK = bitcoin.networks.bitcoin; 
// 🛑 อัปเดต: เพิ่มปริมาณ Entropy ที่ต้องการจาก 256 เป็น 1024 bits
const REQUIRED_ENTROPY = 1024; // 128 bytes

// =================================================================
// 1. UTILITY FUNCTIONS
// =================================================================

/**
 * สร้าง Bitcoin Address (Legacy P2PKH) จาก Public Key
 */
function getLegacyAddress(publicKey: Buffer): string {
    const { address } = bitcoin.payments.p2pkh({ pubkey: publicKey, network: BTC_NETWORK });
    return address || 'Error: Could not generate address';
}


// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function PaperWalletGenerator() {
    const [entropyPool, setEntropyPool] = useState<number[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [privateKeyWIF, setPrivateKeyWIF] = useState<string | null>(null);
    const [bitcoinAddress, setBitcoinAddress] = useState<string | null>(null);
    const [progress, setProgress] = useState(0); 

    // คำนวณความคืบหน้าของ Entropy
    const currentEntropyBits = entropyPool.length * 8;
    const entropyProgress = Math.min(100, (currentEntropyBits / REQUIRED_ENTROPY) * 100);

    useEffect(() => {
        setProgress(Math.floor(entropyProgress));
    }, [entropyProgress]);


    // จัดการการเคลื่อนไหวของเมาส์เพื่อเพิ่ม Entropy
    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (privateKeyWIF || isGenerating) return; 

        // ใช้ Event X/Y และ Time Stamp เพื่อเพิ่มความสุ่ม
        const newEntropy = [
            event.clientX & 0xFF,
            event.clientY & 0xFF,
            (Date.now() & 0xFF00) >> 8,
            Date.now() & 0xFF
        ];
        
        setEntropyPool(prevPool => {
            // 🛑 อัปเดต: เพิ่มขนาดสูงสุดของ Pool เป็น (512 / 8) + 64 = 128 bytes
            const nextPool = [...prevPool, ...newEntropy];
            const maxSize = REQUIRED_ENTROPY / 8 + 64; 
            return nextPool.slice(-maxSize);
        });

    }, [privateKeyWIF, isGenerating]);


    // ฟังก์ชันหลักในการสร้าง Wallet
    const generateWallet = useCallback(() => {
        if (currentEntropyBits < REQUIRED_ENTROPY) {
            alert(`กรุณาเคลื่อนเมาส์อีก ${REQUIRED_ENTROPY - currentEntropyBits} bits เพื่อให้มีความสุ่มเพียงพอ`);
            return;
        }

        setIsGenerating(true);
        setPrivateKeyWIF(null);
        setBitcoinAddress(null);

        setTimeout(() => {
            try {
                // 1. สร้าง Seed หลักจาก window.crypto
                // เรายังคงต้องการ Private Key 32 bytes (256 bits) สำหรับ Bitcoin
                const randomBytes = new Uint8Array(32); 
                window.crypto.getRandomValues(randomBytes);
                
                let privateKeyBuffer = Buffer.from(randomBytes.buffer.slice(0, 32)) as Buffer;

                // 2. ผสมผสาน Entropy จากผู้ใช้ (Mouse Movement)
                // 🛑 อัปเดต: ใช้เฉพาะ 32 bytes แรกของ User Entropy Pool เท่านั้น
                const USER_ENTROPY_SIZE = 32; 
                const userEntropyBuffer = Buffer.from(entropyPool.slice(0, USER_ENTROPY_SIZE)) as Buffer;
                
                // ใช้ XOR เพื่อรวมค่าความสุ่มหลักกับค่าความสุ่มของผู้ใช้
                for (let i = 0; i < USER_ENTROPY_SIZE; i++) {
                    // ใช้ค่าจาก userEntropyBuffer ผสมกับ privateKeyBuffer
                    privateKeyBuffer[i] ^= userEntropyBuffer[i] ?? 0;
                }

                // 3. สร้าง ECPair (Key Pair)
                let keyPair: ECPairInterface; 
                
                try {
                    // 🚨 การแก้ไขที่สำคัญ: บังคับให้ keyPair เป็น Compressed (true)
                    keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { compressed: true, network: BTC_NETWORK });
                } catch (e) {
                    console.error("Invalid Private Key generated, retrying...", e);
                    throw new Error("เกิดข้อผิดพลาดในการสร้าง Private Key: ค่าไม่ถูกต้อง");
                }
                
                // 4. สร้าง WIF Private Key และ Address
                // toWIF() จะสร้าง WIF Compressed (K/L) เพราะ keyPair ถูกสร้างเป็น Compressed แล้ว
                const wif = keyPair.toWIF();
                const address = getLegacyAddress(keyPair.publicKey as Buffer); 

                setPrivateKeyWIF(wif);
                setBitcoinAddress(address);
                setEntropyPool([]); 
                
            } catch (error) {
                console.error("Wallet Generation Failed:", error);
                alert(`การสร้าง Wallet ล้มเหลว: ${(error as Error).message}`);
            } finally {
                setIsGenerating(false);
            }
        }, 100); 
    }, [currentEntropyBits, entropyPool]);

    
    // [RENDERING]
    const renderContent = useMemo(() => {
        if (privateKeyWIF && bitcoinAddress) {
            // โหมดแสดงผล Wallet ที่สร้างเสร็จแล้ว
            return (
                <div className="flex flex-col gap-6 w-full print:text-black">
                    <h2 className="text-3xl font-extrabold text-green-400 print:text-green-800">✅ สร้าง Wallet สำเร็จ!</h2>
                    <p className="text-xl print:text-lg">กรุณา <span className="font-bold">พิมพ์หน้านี้</span> หรือ <span className="font-bold">คัดลอกข้อมูล</span> แล้วบันทึกในที่ที่ปลอดภัย <span className="font-bold">ก่อนปิดหน้าเว็บ</span></p>
                    
                    {/* ข้อมูล Public Address */}
                    <div className="bg-blue-800/50 p-6 rounded-xl shadow-lg print:bg-white print:border print:border-gray-300">
                        <h3 className="text-2xl font-bold mb-4 print:text-black">Public Address (ที่อยู่สาธารณะ)</h3>
                        <p className="break-all font-mono text-xl mb-4 print:text-lg print:text-black">{bitcoinAddress}</p>
                        <div className="w-48 h-48 mx-auto p-2 bg-white rounded-lg print:w-64 print:h-64">
                            <QRCodeSVG 
                                value={bitcoinAddress} 
                                size={180} 
                                level="M"
                                className="w-full h-full"
                            />
                        </div>
                        <p className="mt-4 text-sm print:text-xs text-yellow-300 print:text-yellow-800">ใช้ที่อยู่ Public นี้ในการรับ Bitcoin</p>
                    </div>

                    {/* ข้อมูล Private Key (สำคัญที่สุด) */}
                    <div className="bg-red-800/50 p-6 rounded-xl shadow-lg print:bg-red-100 print:border-4 print:border-red-500">
                        <h3 className="text-2xl font-bold mb-4 text-red-400 print:text-red-700">PRIVATE KEY (กุญแจส่วนตัว - WIF Format)</h3>
                        <p className="break-all font-mono text-xl mb-4 font-extrabold print:text-lg print:text-red-900">{privateKeyWIF}</p>
                        <div className="w-48 h-48 mx-auto p-2 bg-white rounded-lg print:w-64 print:h-64">
                            <QRCodeSVG 
                                value={privateKeyWIF} 
                                size={180} 
                                level="M"
                                className="w-full h-full"
                            />
                        </div>
                        <p className="mt-4 text-sm font-bold text-red-300 print:text-red-900">🚨 คำเตือน: <span className="font-bold">ห้ามเปิดเผย</span> Private Key นี้ หากผู้อื่นได้ไป เงินของคุณจะหายไปทันที</p>
                    </div>

                    <button
                        onClick={() => window.print()}
                        className="mt-8 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg text-lg font-bold shadow-xl transition duration-300 print:hidden"
                    >
                        🖨️ พิมพ์ Paper Wallet
                    </button>
                    <button
                        onClick={() => { setPrivateKeyWIF(null); setBitcoinAddress(null); }}
                        className="px-6 py-3 border border-white hover:bg-white/10 rounded-lg text-lg transition duration-300 print:hidden"
                    >
                        สร้างใหม่
                    </button>
                </div>
            );
        }

        // โหมดสร้าง Entropy
        return (
            <div 
                className={`flex flex-col gap-6 items-center w-full p-8 rounded-xl transition duration-500 ${isGenerating ? 'opacity-50' : ''}`}
                onMouseMove={handleMouseMove} 
            >
                <h2 className="text-3xl font-extrabold">Bitcoin Paper Wallet Generator (BTC)</h2>
                <p className="text-lg text-center max-w-2xl">
                    กรุณา <span className="font-bold">เคลื่อนเมาส์</span> ไปมาบนพื้นที่นี้เพื่อ <span className="font-bold">สร้างความสุ่ม (Entropy)</span> สำหรับ Private Key ที่ปลอดภัยที่สุด
                    {isGenerating && <span className="block mt-2 text-yellow-300">กำลังสร้าง...</span>}
                </p>

                {/* Progress Bar */}
                <div 
                    className="w-full max-w-xl bg-blue-900 rounded-full h-8 shadow-inner progress-bar"
                >
                    <div 
                        className="bg-fuchsia-500 h-8 rounded-full text-center text-sm font-bold transition-all duration-300 flex items-center justify-center w-[var(--progress-width)]"
                    >
                        {/* แสดงผลตามค่า REQUIRED_ENTROPY ใหม่ */}
                        {progress < 100 ? `${progress}% Entropy ( ${currentEntropyBits} / ${REQUIRED_ENTROPY} bits )` : 'Entropy เพียงพอ!'}
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={generateWallet}
                    disabled={progress < 100 || isGenerating}
                    className={`mt-6 px-8 py-4 rounded-full text-xl font-bold shadow-2xl transition duration-300 
                        ${progress < 100 || isGenerating 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
                        }`
                    }
                >
                    {isGenerating ? '⏳ กำลังดำเนินการ...' : '🔑 สร้าง Bitcoin Wallet'}
                </button>

                {/* Safety Note */}
                <p className="mt-8 text-sm text-center text-red-300 p-4 border border-red-500 rounded-lg max-w-xl">
                    <span className="font-bold">ข้อควรระวัง:</span> เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ <span className="font-bold">ปลอดภัย</span> และควรพิจารณาใช้บนเครื่องที่ <span className="font-bold">ไม่ได้เชื่อมต่ออินเทอร์เน็ต</span> เพื่อความปลอดภัยสูงสุด
                </p>
            </div>
        );

    }, [privateKeyWIF, bitcoinAddress, progress, isGenerating, generateWallet, handleMouseMove, currentEntropyBits]);


    return (
        <div>
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
                    Bitcoin Paper Wallet Tool
                </h1>
                
                {renderContent}
             </main>
        </div>
    );
}