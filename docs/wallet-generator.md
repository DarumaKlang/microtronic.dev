# เป้าหมายสร้าง Paper Wallet Generator สำหรับ Bitcoin (BTC) โดยใช้ TypeScript/Next.js ที่ Path: `/app/asset/sup-menu/wallet-generator`

เรามาเริ่มขั้นตอนการพัฒนาโค้ดกันเลยครับ\!

-----

## 1\. การติดตั้ง Library ที่จำเป็น

การสร้าง Paper Wallet สำหรับ Bitcoin ใน TypeScript/Next.js เราจะต้องใช้ Library มาตรฐานในการจัดการกุญแจและการเข้ารหัส

กรุณาเปิด Terminal ในโปรเจ็กต์ของคุณ แล้วรันคำสั่งเหล่านี้เพื่อติดตั้ง Library หลัก ๆ ที่ใช้ในการทำงานด้าน Bitcoin Cryptography:

```bash
# Library หลักสำหรับ Bitcoin Wallet Generation
npm install bitcoinjs-lib tiny-secp256k1

# Library สำหรับการสร้าง QR Code (สำคัญสำหรับการพิมพ์ Paper Wallet)
npm install qrcode.react

# ติดตั้ง Types สำหรับ Library เหล่านี้ (สำหรับ TypeScript)
npm install --save-dev @types/qrcode.react
```

### 🚨 หมายเหตุสำคัญ: การจัดการ Crypto ใน Next.js

`bitcoinjs-lib` และ Library ที่เกี่ยวข้องต้องการสภาพแวดล้อมที่รองรับ Node.js Crypto Standard แต่เนื่องจากเราจะรันโค้ดบนเบราว์เซอร์ (Client-Side) เราอาจจำเป็นต้องติดตั้ง Polyfills บางตัวเพื่อทำให้ทำงานได้สมบูรณ์ในสภาพแวดล้อม Next.js:

```bash
# ติดตั้ง Polyfill สำหรับ Buffer (จำเป็นสำหรับ bitcoinjs-lib)
npm install buffer
npm install ecpair
```

จากนั้น เราต้องบอกให้ Next.js ทราบว่าควรใช้ `buffer` ในเบราว์เซอร์ด้วยการแก้ไขไฟล์ **`next.config.ts`** ของคุณครับ

### **การแก้ไขไฟล์: `next.config.ts`**

กรุณาเพิ่มการตั้งค่า `webpack` เพื่อให้ `buffer` ถูก Polyfill ในโค้ดฝั่ง Client-Side:

```typescript
// next.config.ts

import type { NextConfig } from 'next';

// 🛑 FIX 1: แก้ Type Error 2344 โดยการระบุให้ TypeScript รู้ว่า 'webpack' function มีอยู่
// เราใช้ Parameters<NonNullable<NextConfig['webpack']>>[1]
// - NonNullable: เพื่อลบ 'null' ออกจาก Type ของ NextConfig['webpack']
// - Parameters<...>[1]: เพื่อดึง Type ของ Context Object ออกมา (พารามิเตอร์ที่ 2)
type NextJsWebpackConfigContext = Parameters<NonNullable<NextConfig['webpack']>>[1];


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // [PRESERVED CONFIG]
    reactStrictMode: false, 
    
    // [PRESERVED CONFIG]
    images: { 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '**',
            },
        ],
    },

    // ----------------------------------------------------------------
    // [FIXED] การตั้งค่า Webpack
    // ----------------------------------------------------------------
    // 🛑 FIX 2: ใช้ 'any' สำหรับ config เพื่อหลีกเลี่ยง Cannot find module 'webpack' (2307)
    webpack: (config: any, context: NextJsWebpackConfigContext) => { 
        const { isServer } = context;

        // เฉพาะสำหรับ Client-side Bundle เท่านั้น
        if (!isServer) {
            config.resolve = {
                ...(config.resolve || {}), 
                fallback: {
                    ...(config.resolve?.fallback || {}), 
                    // เพิ่ม 'buffer' เข้ามาใน fallback สำหรับ bitcoinjs-lib
                    buffer: require.resolve('buffer/'),
                },
            };
        }

        return config;
    },
    // ----------------------------------------------------------------
};

module.exports = nextConfig;
```

-----

## 2\. การสร้าง Component `GooeyBackground`

-----

## 3\. การสร้างหน้า Paper Wallet Generator

ตอนนี้เราจะสร้างไฟล์ Page ที่ Path ที่คุณต้องการ และสร้าง Logic สำหรับการสร้าง Bitcoin Paper Wallet (BTC) ครับ

### **ขั้นตอนที่ 3.1: สร้างโครงสร้างโฟลเดอร์**

สร้างโครงสร้างโฟลเดอร์ใน `app` ให้ตรงกับ Path ที่คุณต้องการ:

1. สร้างโฟลเดอร์ `asset` ภายใน `app`
2. สร้างโฟลเดอร์ `sup-menu` ภายใน `asset`
3. สร้างโฟลเดอร์ `wallet-generator` ภายใน `sup-menu`
4. สร้างไฟล์ `page.tsx` ภายใน `wallet-generator`

Path สุดท้ายจะเป็น: `app/asset/sup-menu/wallet-generator/page.tsx`

### **ขั้นตอนที่ 3.2: โค้ดสำหรับ `page.tsx`**

โค้ดนี้ประกอบด้วย Logic การสร้าง Address/Key, การจัดการ Entropy ผ่านการเคลื่อนไหวของเมาส์, และการแสดงผล QR Code

#### **ไฟล์: `app/asset/sup-menu/wallet-generator/page.tsx`**

```tsx
// app/asset/sup-menu/wallet-generator/page.tsx
'use client'; 

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as bitcoin from 'bitcoinjs-lib'; 
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory, ECPairInterface } from 'ecpair'; 
import { QRCodeSVG } from 'qrcode.react';

// Import GooeyBackground component
import GooeyBackground from '@/components/GooeyBackground'; 

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

export default function WalletGeneratorPage() {
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
                    keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { compressed: false, network: BTC_NETWORK });
                } catch (e) {
                    console.error("Invalid Private Key generated, retrying...", e);
                    throw new Error("เกิดข้อผิดพลาดในการสร้าง Private Key: ค่าไม่ถูกต้อง");
                }
                
                // 4. สร้าง WIF Private Key และ Address
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
                    <p className="text-xl print:text-lg">กรุณา **พิมพ์หน้านี้** หรือ **คัดลอกข้อมูล** แล้วบันทึกในที่ที่ปลอดภัย **ก่อนปิดหน้าเว็บ**</p>
                    
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
                        <p className="mt-4 text-sm font-bold text-red-300 print:text-red-900">🚨 คำเตือน: **ห้ามเปิดเผย** Private Key นี้ หากผู้อื่นได้ไป เงินของคุณจะหายไปทันที</p>
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
                    กรุณา **เคลื่อนเมาส์** ไปมาบนพื้นที่นี้เพื่อ **สร้างความสุ่ม (Entropy)** สำหรับ Private Key ที่ปลอดภัยที่สุด
                    {isGenerating && <span className="block mt-2 text-yellow-300">กำลังสร้าง...</span>}
                </p>

                {/* Progress Bar */}
                <div 
                    className="w-full max-w-xl bg-blue-900 rounded-full h-8 shadow-inner"
                    style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
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
                    **ข้อควรระวัง:** เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ **ปลอดภัย** และควรพิจารณาใช้บนเครื่องที่ **ไม่ได้เชื่อมต่ออินเทอร์เน็ต** เพื่อความปลอดภัยสูงสุด
                </p>
            </div>
        );

    }, [privateKeyWIF, bitcoinAddress, progress, isGenerating, generateWallet, handleMouseMove, currentEntropyBits]);


    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
                    Bitcoin Paper Wallet Tool
                </h1>
                
                {renderContent}
             </main>
        </div>
    );
}
```

-----

## 4\. คำแนะนำการใช้งานและการศึกษา

### 📝 การนำไปใช้งาน (Implementation)

1. **ติดตั้ง Library:** รันคำสั่ง `npm install` ทั้งหมดที่ระบุใน **ขั้นตอนที่ 1**
2. **แก้ไข `next.config.ts`:** คัดลอกโค้ด `webpack` ไปใส่ในไฟล์ `next.config.ts` ของคุณเพื่อรองรับ `buffer` Polyfill
3. **สร้าง Component `GooeyBackground.tsx`:** คัดลอกโค้ดใน **ขั้นตอนที่ 2.2** ไปวางในไฟล์ `src/components/GooeyBackground.tsx` (คุณอาจต้องสร้างโฟลเดอร์ `components` หากยังไม่มี)
4. **สร้าง Page `page.tsx`:** คัดลอกโค้ดใน **ขั้นตอนที่ 3.2** ไปวางในไฟล์ `app/asset/sup-menu/wallet-generator/page.tsx`
5. **ทดสอบ:** รัน `npm run dev` แล้วเข้าถึง Path: `http://localhost:3000/asset/sup-menu/wallet-generator`

### 💡 การศึกษาและคำอธิบายโค้ด

* **`'use client';` (Client-Side Rendering)**: นี่คือสิ่งที่ **สำคัญที่สุด** ในไฟล์ `page.tsx` มันบังคับให้โค้ดทั้งหมด (โดยเฉพาะการสร้าง Private Key) รันในเบราว์เซอร์ของผู้ใช้เท่านั้น เพื่อป้องกันการรั่วไหลไปยังเซิร์ฟเวอร์ Vercel ของคุณ
* **`bitcoinjs-lib` และ `tiny-secp256k1`**:
* `tiny-secp256k1` เป็น Implementation ที่เบาและเร็วของ Curve **secp256k1** ที่ใช้ใน Bitcoin
* `bitcoinjs-lib` ใช้ Library นี้ในการสร้าง **Key Pair** (Private/Public Key) และแปลงเป็น **WIF (Wallet Import Format)** รวมถึง **Address (P2PKH Legacy)**
* **Entropy Pool**: เราใช้ `useState` เพื่อเก็บค่าความสุ่มที่ได้จากการเคลื่อนไหวของเมาส์ (`event.clientX`, `event.clientY`, `Date.now()`)
* **Buffer XOR**: เมื่อผู้ใช้สร้าง Wallet โค้ดจะเอา **ค่าความสุ่มหลัก** จาก `window.crypto.getRandomValues()` (ซึ่งเป็นแหล่งความสุ่มที่ดีที่สุดของเบราว์เซอร์) มา **XOR** (Exclusive OR) กับ **ค่าความสุ่มที่ได้จากเมาส์ของผู้ใช้** การทำเช่นนี้เป็นการ **เสริม** ความแข็งแกร่งของ Private Key ทำให้มีโอกาสน้อยลงที่จะถูกคาดเดาได้
* **QRCodeSVG**: ใช้สำหรับแสดงผล Public Address และ Private Key ในรูปแบบ **QR Code** ซึ่งจำเป็นอย่างยิ่งสำหรับการพิมพ์ Paper Wallet ครับ

ตอนนี้คุณก็มีโครงสร้างพื้นฐานของ Paper Wallet Generator ที่เน้นความปลอดภัยและใช้งานได้จริงแล้วครับ\! หากมีส่วนไหนที่อยากให้ปรับปรุงหรือเพิ่มเติมฟีเจอร์ บอกผมได้เลยครับ 😊

## Updated : การสร้างเครื่องมือ Wallet Generator ที่เน้นความโปร่งใสและทำงานแบบ Client-Side

การสร้างเครื่องมือ Wallet Generator ที่เน้นความโปร่งใสและทำงานแบบ Client-Side ล้วนๆ สอดคล้องกับหลักการด้านความปลอดภัยของ Bitcoin เป็นอย่างดี

ผมจะเพิ่ม Component ต่างๆ และ สร้างหน้า Page สำหรับแต่ละ Component ในโครงสร้าง Next.js ของคุณครับ โดยจะใช้ Component ที่มีอยู่แล้วคือ `WalletGeneratorPage.tsx` เป็นต้นแบบสำหรับ **Paper Wallet** และเพิ่ม Component อื่นๆ เข้าไป

## 🛠️ โครงสร้างไฟล์ที่จะเพิ่ม

ผมจะเพิ่มไฟล์ต่าง ๆ ดังนี้:

| Component File | Page File | คำอธิบาย |
| :--- | :--- | :--- |
| **`PaperWalletGenerator.tsx`** | `paper-wallet/page.tsx` | สร้าง Single Wallet (ใช้โค้ดเดิมที่ปรับปรุงแล้ว) |
| **`BulkWalletGenerator.tsx`** | `bulk-wallet/page.tsx` | สร้าง Wallet หลาย ๆ อันในครั้งเดียว |
| **`BrainWalletGenerator.tsx`** | `brain-wallet/page.tsx` | สร้าง Wallet จาก Passphrase |
| **`VanityWalletGenerator.tsx`** | `vanity-wallet/page.tsx` | ค้นหา Address ที่มี Prefix ตามต้องการ |
| **`SplitWalletGenerator.tsx`** | `split-wallet/page.tsx` | สร้าง Wallet แบบแบ่งกุญแจ (M of N) |
| **`WalletDetailsChecker.tsx`** | `wallet-details/page.tsx` | ตรวจสอบ Private Key / Address (ไม่สร้าง) |

เนื่องจาก Component **`WalletGeneratorPage.tsx`** ได้ถูกพัฒนามาอย่างดีแล้ว ผมจะเปลี่ยนชื่อไฟล์นี้เป็น **`PaperWalletGenerator.tsx`** และย้ายไปไว้ในโฟลเดอร์ Component เพื่อให้เรียกใช้ได้ง่ายขึ้น

-----

## 1\. การปรับโครงสร้าง (Refactoring)

### 1.1. ➡️ ย้ายและเปลี่ยนชื่อไฟล์ :

1. เปลี่ยนชื่อไฟล์: **`/app/asset/sup-menu/wallet-generator/page.tsx`**
2. เป็น: **`/components/wallet-tools/PaperWalletGenerator.tsx`**
3. สร้าง Page ใหม่สำหรับ Paper Wallet: **`/app/asset/sup-menu/wallet-tools/paper-wallet/page.tsx`**

### 1.2. 🛠️ `PaperWalletGenerator.tsx` (Single Wallet)

โค้ดนี้คือโค้ดเดิมที่ผมพัฒนาไว้ แต่ เปลี่ยนชื่อไฟล์ และ ปรับโครงสร้างเป็น Component ที่ export ได้แทน

```tsx
// components/wallet-tools/PaperWalletGenerator.tsx
'use client'; 

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as bitcoin from 'bitcoinjs-lib'; 
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory, ECPairInterface } from 'ecpair'; 
import { QRCodeSVG } from 'qrcode.react';

// Import GooeyBackground component
import GooeyBackground from '@/components/GooeyBackground'; 

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

export default function WalletGeneratorPage() {
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
                    keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { compressed: false, network: BTC_NETWORK });
                } catch (e) {
                    console.error("Invalid Private Key generated, retrying...", e);
                    throw new Error("เกิดข้อผิดพลาดในการสร้าง Private Key: ค่าไม่ถูกต้อง");
                }
                
                // 4. สร้าง WIF Private Key และ Address
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
                    <p className="text-xl print:text-lg">กรุณา **พิมพ์หน้านี้** หรือ **คัดลอกข้อมูล** แล้วบันทึกในที่ที่ปลอดภัย **ก่อนปิดหน้าเว็บ**</p>
                    
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
                        <p className="mt-4 text-sm font-bold text-red-300 print:text-red-900">🚨 คำเตือน: **ห้ามเปิดเผย** Private Key นี้ หากผู้อื่นได้ไป เงินของคุณจะหายไปทันที</p>
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
                    กรุณา **เคลื่อนเมาส์** ไปมาบนพื้นที่นี้เพื่อ **สร้างความสุ่ม (Entropy)** สำหรับ Private Key ที่ปลอดภัยที่สุด
                    {isGenerating && <span className="block mt-2 text-yellow-300">กำลังสร้าง...</span>}
                </p>

                {/* Progress Bar */}
                <div 
                    className="w-full max-w-xl bg-blue-900 rounded-full h-8 shadow-inner"
                    style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
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
                    **ข้อควรระวัง:** เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ **ปลอดภัย** และควรพิจารณาใช้บนเครื่องที่ **ไม่ได้เชื่อมต่ออินเทอร์เน็ต** เพื่อความปลอดภัยสูงสุด
                </p>
            </div>
        );

    }, [privateKeyWIF, bitcoinAddress, progress, isGenerating, generateWallet, handleMouseMove, currentEntropyBits]);


    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
                    Bitcoin Paper Wallet Tool
                </h1>
                
                {renderContent}
             </main>
        </div>
    );
}
```

-----

## 2\. Component อื่นๆ ที่ต้องการ

เนื่องจาก Component อื่นๆ มีหลักการที่ซับซ้อน และ ใช้โค้ดคล้ายกัน ผมจะสร้าง **Template Component** สำหรับแต่ละประเภทพร้อมคำอธิบายหลักการทำงานและคำเตือนที่จำเป็นไว้ในโฟลเดอร์ **`/components/wallet-tools/`**

### 2.1. ➡️ `BulkWalletGenerator.tsx`

```tsx
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
```

### 2.2. ➡️ `BrainWalletGenerator.tsx`

```tsx
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
```

### 2.3. ➡️ `VanityWalletGenerator.tsx`

```tsx
// components/wallet-tools/VanityWalletGenerator.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
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

export default function VanityWalletGenerator() {
    const [prefix, setPrefix] = useState('1A');
    const [foundWallet, setFoundWallet] = useState<{ address: string, privateKeyWIF: string } | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const workerRef = useRef<Worker | null>(null);

    const startSearch = () => {
        if (isSearching) {
            workerRef.current?.terminate();
            workerRef.current = null;
            setIsSearching(false);
            return;
        }

        const normalizedPrefix = prefix.toUpperCase().trim();
        // ตรวจสอบความถูกต้องของ Prefix (Base58 characters)
        if (normalizedPrefix.length === 0 || !normalizedPrefix.match(/^[13bc]{1}[1-9A-HJ-NP-Za-km-z]*$/)) {
             alert('Prefix ไม่ถูกต้อง ต้องเป็น Base58 Character และควรขึ้นต้นด้วย 1, 3, หรือ bc1');
             return;
        }
        if (normalizedPrefix.length > 8) {
            alert('คำนำหน้ายาวเกินไป (ไม่เกิน 8 ตัวอักษร)');
            return;
        }

        setFoundWallet(null);
        setIsSearching(true);
        setAttempts(0);

        // Web Worker Code (ใช้ Imports Scripts สำหรับไลบรารีใน Worker เพื่อความเสถียร)
        // NOTE: ต้องมั่นใจว่า URLs เหล่านี้เข้าถึงได้
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
                    const { address } = self.bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK });
                    return address;
                };

                while (!found) {
                    attempts++;
                    // Key generation uses crypto.getRandomValues() which is secure
                    const keyPair = ECPair.makeRandom({ compressed: false, network: BTC_NETWORK }); 
                    
                    const address = getLegacyAddress(keyPair);

                    if (address && address.startsWith(targetPrefix)) {
                        found = { address, privateKeyWIF: keyPair.toWIF() };
                        postMessage({ type: 'found', wallet: found, attempts });
                        break;
                    }

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
                **หลักการทำงาน:** สร้างกุญแจส่วนตัวแบบสุ่มซ้ำ ๆ โดยใช้ **Web Worker** เพื่อไม่ให้เบราว์เซอร์ค้าง จนกว่าจะเจอ Public Address (Legacy P2PKH) ที่ขึ้นต้นด้วยคำนำหน้าที่คุณระบุ
                <br/>(ยิ่งคำนำหน้ายาวและซับซ้อน ยิ่งใช้เวลานานมาก)
            </p>

            <div className='flex gap-2 w-full'>
                <input 
                    type="text"
                    placeholder="Prefix (e.g., 1Micro)"
                    value={prefix} 
                    onChange={(e) => setPrefix(e.target.value.replace(/[^1-9A-HJ-NP-Za-km-z]/gi, ''))} // Base58 check
                    className="p-3 w-2/3 text-black rounded uppercase"
                    disabled={isSearching}
                />
                <button 
                    onClick={startSearch} 
                    className={`px-6 py-3 rounded-lg font-bold w-1/3 transition ${isSearching ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isSearching ? 'หยุดค้นหา' : 'ค้นหา'}
                </button>
            </div>
            
            <p className="text-sm">พยายาม: {attempts.toLocaleString()} ครั้ง</p>

            {foundWallet && (
                <div className="w-full bg-gray-700/50 p-6 rounded-lg mt-4">
                    <h3 className="text-xl font-bold mb-2 text-green-400">Address ที่พบ:</h3>
                    <p className="font-mono break-all text-lg font-extrabold">{foundWallet.address}</p>
                    <h3 className="text-xl font-bold mb-2 mt-4 text-red-400">Private Key (WIF):</h3>
                    <p className="font-mono break-all">{foundWallet.privateKeyWIF}</p>
                </div>
            )}
            <Disclaimer />
        </div>
    );
}
```

### 2.4. ➡️ `SplitWalletGenerator.tsx`

```tsx
// components/wallet-tools/SplitWalletGenerator.tsx
'use client';
import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinySecp from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair'; 
import { Buffer } from 'buffer'; // Buffer polyfill is needed for client-side multisig

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
        const pubKeys: Buffer[] = [];
        
        // 1. สร้าง N Key Pairs โดยใช้ค่าสุ่มที่ปลอดภัย
        for (let i = 0; i < n; i++) {
            const keyPair = ECPair.makeRandom({ network: BTC_NETWORK });
            keyPairs.push({ 
                WIF: keyPair.toWIF(),
                pubkey: keyPair.publicKey.toString('hex')
            });
            pubKeys.push(keyPair.publicKey);
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
                **หลักการทำงาน:** สร้างที่อยู่ Multisignature Wallet (P2SH) ที่ต้องใช้กุญแจส่วนตัวจำนวน M ดอกจาก N ดอกทั้งหมดในการถอนเงินเพื่อเพิ่มความปลอดภัยและความทนทานต่อการสูญหายของกุญแจ
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
```

### 2.5. ➡️ `WalletDetailsChecker.tsx`

```tsx
// components/wallet-tools/WalletDetailsChecker.tsx
'use client';
import React, { useState } from 'react';
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

export default function WalletDetailsChecker() {
    const [inputKey, setInputKey] = useState('');
    const [details, setDetails] = useState<{ 
        address: string; 
        isValid: boolean; 
        isWIF: boolean; 
        type?: string; 
        linkedAddresses?: { legacy: string, segwit: string, taproot: string } 
    } | null>(null);

    const checkDetails = () => {
        setDetails(null);
        if (!inputKey) return;

        try {
            // 1. ลองถอดรหัสเป็น WIF Private Key
            const keyPair = ECPair.fromWIF(inputKey, BTC_NETWORK);
            
            // 2. ถ้าสำเร็จ, คำนวณ Address ทุกประเภท
            const { address: legacyAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK });
            const { address: segwitAddress } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: BTC_NETWORK });
            
            setDetails({ 
                address: inputKey, 
                isValid: true, 
                isWIF: true, 
                type: "Private Key (WIF)",
                linkedAddresses: { 
                    legacy: legacyAddress || 'N/A', 
                    segwit: segwitAddress || 'N/A',
                    taproot: 'Requires BIP86/Taproot implementation' // แสดง Placeholder สำหรับ Taproot
                }
            });

        } catch (e) {
            // 3. ถ้าไม่ใช่ WIF, ลองตรวจสอบว่าเป็น Address สาธารณะ
            let isValidAddress = false;
            let addressType = 'N/A';
            
            try {
                // ตรวจสอบ Bech32 (SegWit)
                bitcoin.address.fromBech32(inputKey); 
                addressType = 'Public Address (Bech32/SegWit)';
                isValidAddress = true;
            } catch (e2) {
                try {
                    // ตรวจสอบ Base58 (Legacy / P2SH)
                    bitcoin.address.fromBase58Check(inputKey);
                    addressType = 'Public Address (Legacy/P2SH)';
                    isValidAddress = true;
                } catch (e3) {
                    // ไม่ถูกต้อง
                }
            }
            
            setDetails({ 
                address: inputKey, 
                isValid: isValidAddress, 
                isWIF: false,
                type: addressType
            });
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold">Wallet Details / Key Checker</h2>
            <p className="text-lg text-center">
                **หลักการทำงาน:** ตรวจสอบ Private Key (WIF) หรือ Public Address ว่าถูกต้องตามรูปแบบของ Bitcoin หรือไม่ และแสดง Public Address ที่เชื่อมโยงกับ Private Key นั้น
            </p>

            <input 
                type="text"
                placeholder="กรอก Private Key (WIF) หรือ Public Address"
                value={inputKey} 
                onChange={(e) => setInputKey(e.target.value)} 
                className="p-3 w-full text-black rounded"
            />
            <button 
                onClick={checkDetails} 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold"
            >
                ตรวจสอบ
            </button>
            
            {details && (
                <div className={`w-full p-6 rounded-lg mt-4 ${details.isValid ? 'bg-green-700/50' : 'bg-red-700/50'}`}>
                    <h3 className="text-xl font-bold mb-2">สถานะ: {details.isValid ? '✅ ถูกต้อง' : '❌ ไม่ถูกต้อง'}</h3>
                    {details.isValid && (
                         <>
                            <p className="text-md text-yellow-300">ประเภทที่พบ: **{details.type}**</p>
                         </>
                    )}
                    
                    {details.isValid && details.isWIF && details.linkedAddresses && (
                        <div className='mt-4'>
                            <h4 className="text-lg font-bold mt-2">Public Addresses ที่เชื่อมโยง:</h4>
                            <p className="font-mono break-all text-sm mt-1">
                                **Legacy (P2PKH):** {details.linkedAddresses.legacy}
                            </p>
                            <p className="font-mono break-all text-sm mt-1">
                                **Native SegWit (Bech32):** {details.linkedAddresses.segwit}
                            </p>
                            <p className="font-mono break-all text-sm mt-1 text-gray-400">
                                **Taproot (P2TR):** {details.linkedAddresses.taproot}
                            </p>
                        </div>
                    )}
                </div>
            )}
            <Disclaimer />
        </div>
    );
}
```

-----

## 3\. การสร้างหน้า Page และการปรับ NavBar

### 3.1. 📁 Page Files

สร้างไฟล์เหล่านี้ในโฟลเดอร์ `/app/asset/sup-menu/` (ตามโครงสร้างเดิม):

* `/app/asset/sup-menu/wallet-tools/paper-wallet/page.tsx`
* `/app/asset/sup-menu/wallet-tools/bulk-wallet/page.tsx`
* `/app/asset/sup-menu/wallet-tools/brain-wallet/page.tsx`
* `/app/asset/sup-menu/wallet-tools/vanity-wallet/page.tsx`
* `/app/asset/sup-menu/wallet-tools/split-wallet/page.tsx`
* `/app/asset/sup-menu/wallet-tools/wallet-details/page.tsx`

**ตัวอย่างโค้ดสำหรับ Page File (ใช้รูปแบบเดียวกันทั้งหมด):**

```tsx
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
```

(คุณสามารถคัดลอกและเปลี่ยนชื่อ Component และ `metadata.title` สำหรับ Page อื่น ๆ ได้ทันที)

### 3.2. 🧭 อัปเดต `NavBar.tsx`

เราต้องรวมเมนูใหม่เหล่านี้เข้าใน **`NavBar.tsx`** ภายใต้เมนู **`การลงทุน`** (`/asset`) หรือสร้างเมนูใหม่ **`Wallet Tools`**

ผมจะเพิ่ม Dropdown ใหม่ชื่อ **`Wallet Tools`**

```tsx
// src/components/NavBar.tsx (ส่วนที่แก้ไข)

// ... (Imports & State Unchanged)

// ภายใน: <div className="hidden md:flex space-x-4 items-center">
    <Link href="/asset" className="hover:text-gray-300">
        การลงทุน
    </Link>

    {/* เมนูดรอปดาวน์สำหรับ Wallet Tools (Desktop) */}
    <div 
        className="relative"
        onMouseEnter={() => setIsWalletToolsDropdownOpen(true)}
        onMouseLeave={() => setIsWalletToolsDropdownOpen(false)}
    >
        <button 
            className="hover:text-gray-300 focus:outline-none"
            onClick={() => setIsWalletToolsDropdownOpen(!isWalletToolsDropdownOpen)}
        >
            Wallet Tools
        </button>
        {isWalletToolsDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-30">
                <Link href="/asset/sup-menu/paper-wallet" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    📄 Paper Wallet
                </Link>
                <Link href="/asset/sup-menu/bulk-wallet" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    📦 Bulk Wallet
                </Link>
                <Link href="/asset/sup-menu/brain-wallet" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    🧠 Brain Wallet
                </Link>
                <Link href="/asset/sup-menu/vanity-wallet" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    ✨ Vanity Wallet
                </Link>
                <Link href="/asset/sup-menu/split-wallet" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    ✂️ Split Wallet (M-of-N)
                </Link>
                <Link href="/asset/sup-menu/wallet-details" className="block px-4 py-2 hover:bg-gray-600" onClick={() => setIsWalletToolsDropdownOpen(false)}>
                    🔍 Wallet Checker
                </Link>
            </div>
        )}
    </div>
    {/* ... (เมนู LNbits เดิม) */}
// ...
```

**หมายเหตุ:** คุณต้องเพิ่ม State ใหม่ใน `NavBar.tsx`:

```typescript
const [isWalletToolsDropdownOpen, setIsWalletToolsDropdownOpen] = useState(false);
```

### 3.3. 🚨 เพิ่ม GitHub Disclaimer

กรุณาเพิ่มข้อความด้านล่างนี้ใน **`Disclaimer`** Component ที่ผมสร้างไว้ด้านบน และในส่วนท้ายของไฟล์ Page ที่เกี่ยวข้อง เพื่อให้เป็นไปตามที่คุณต้องการ:

> "คุณสามารถดู GitHub Repository โครงการ Open Source JavaScript Client-Side Bitcoin Wallet Generator"

เนื่องจากผมไม่มี URL Repository ของคุณ ผมได้เพิ่มข้อความนี้ใน Component `Disclaimer` แล้ว และได้รวม `Disclaimer` ไว้ในทุก Component ที่สร้างใหม่ด้านบนครับ 😊

ยอดเยี่ยมครับ\! เพื่อให้ชุดเครื่องมือ Wallet Tools ของคุณมีความแข็งแกร่งและปลอดภัยสูงสุด ผมได้ดำเนินการแก้ไขและปรับปรุง Component ทั้งสี่ตัวตามแนวทางที่คุณต้องการ พร้อมทั้งสรุปเนื้อหาและคุณสมบัติของแต่ละ Component ดังนี้ครับ

-----

## 💡 สรุปเนื้อหาและคุณสมบัติของ Components

### 1\. Bulk Wallet Generator (📦)

| คุณสมบัติ | คำอธิบาย |
| :--- | :--- |
| **หลักการทำงาน** | สร้าง **Private Key** หลายชุดพร้อมกันในครั้งเดียว โดยใช้ **`window.crypto.getRandomValues()`** API ที่ปลอดภัยของเบราว์เซอร์ เพื่อให้ได้ค่าสุ่มที่สูงสำหรับแต่ละ Wallet |
| **ความแข็งแกร่ง** | ใช้ค่าสุ่ม 32 Bytes (256 Bits) จาก Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) ของระบบปฏิบัติการ |
| **ความโปร่งใส** | Component ถูกปรับปรุงให้ใช้ `createSingleWallet` helper function เพื่อยืนยันว่า Private Key ถูกสร้างจากค่าสุ่มโดยตรง |
| **การใช้งาน** | เหมาะสำหรับการเตรียม Paper Wallet จำนวนมาก (เช่น สำหรับแจกหรือเก็บในระยะยาว) |

### 2\. Vanity Wallet Generator (✨)

| คุณสมบัติ | คำอธิบาย |
| :--- | :--- |
| **หลักการทำงาน** | ค้นหา **Public Address (Legacy P2PKH)** ที่ขึ้นต้นด้วยคำนำหน้า (Prefix) ที่กำหนด โดยการสร้าง Private Key แบบสุ่มซ้ำๆ |
| **ความแข็งแกร่ง** | ใช้ **Web Worker** ในการประมวลผลการสุ่มซ้ำๆ ซึ่ง: 1) ป้องกันไม่ให้เบราว์เซอร์ค้าง (Non-blocking) 2) การสร้าง Key ภายใน Worker ยังคงใช้ฟังก์ชันการสุ่มที่ปลอดภัยของ `bitcoinjs-lib` |
| **คำเตือน** | ยิ่ง Prefix ยาวและซับซ้อนมากเท่าไหร่ จะยิ่งใช้เวลานานขึ้นแบบทวีคูณ (Exponentially) |

### 3\. Split Wallet Generator (✂️)

| คุณสมบัติ | คำอธิบาย |
| :--- | :--- |
| **หลักการทำงาน** | สร้าง **Multisignature Wallet (M-of-N)** ที่ต้องใช้กุญแจส่วนตัวจำนวน M ดอก จาก N ดอกทั้งหมดในการใช้จ่ายจริง |
| **ความแข็งแกร่ง** | ใช้มาตรฐาน **P2SH (Pay-to-Script-Hash)** ของ Bitcoin ในการสร้าง Address ที่มีความปลอดภัยสูง และทนทานต่อการสูญหายของกุญแจ (เช่น 2-of-3 Wallet สามารถทำกุญแจหายได้ 1 ดอก) |
| **การใช้งาน** | ผู้ใช้สามารถกำหนดค่า M (Keys Required) และ N (Total Keys) ได้เอง (สูงสุด 15) |

### 4\. Wallet Details Checker (🔍)

| คุณสมบัติ | คำอธิบาย |
| :--- | :--- |
| **หลักการทำงาน** | ตรวจสอบว่าข้อความที่ป้อนเข้ามาเป็น **Private Key (WIF)** หรือ **Public Address** ที่ถูกต้องตามรูปแบบของ Bitcoin หรือไม่ |
| **ฟีเจอร์ใหม่** | รองรับการตรวจสอบ **Public Address** รูปแบบใหม่ (Bech32/SegWit) นอกเหนือจาก Legacy/P2SH |
| **ข้อมูลที่แสดง** | หากป้อน Private Key (WIF) จะแสดง Address ที่เชื่อมโยงทั้งหมด (Legacy, Native SegWit) เพื่อความยืดหยุ่นในการใช้งาน |

-----
