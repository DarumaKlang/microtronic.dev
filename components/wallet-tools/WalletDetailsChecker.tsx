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
        <span className="font-bold">ข้อควรระวัง:</span> เครื่องมือนี้ทำงานบนเบราว์เซอร์ (Client-Side) เท่านั้น Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใด ๆ กรุณาใช้ในสภาพแวดล้อมที่ <span className="font-bold">ปลอดภัย</span> และควรพิจารณาใช้บนเครื่องที่ <span className="font-bold">ไม่ได้เชื่อมต่ออินเทอร์เน็ต</span> เพื่อความปลอดภัยสูงสุด
        <br/><br/>
        <span className="font-bold">เราไม่มีการเก็บข้อมูลใดๆ ดังนั้นก่อนจะปิดเบราเซอร์ ควรปริ้น หรือ เซฟข้อมูลเก็บไว้</span> <br/>
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
        linkedAddresses?: { legacy: string, segwit: string, taproot: string };
        errorReason?: string;
        solutionGuide?: string;
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
                    taproot: 'Requires BIP86/Taproot implementation' 
                }
            });

        } catch (eWIF) {
            // 3. ถ้าไม่ใช่ WIF, ลองตรวจสอบว่าเป็น Address สาธารณะ
            let isValidAddress = false;
            let addressType = 'N/A';
            let failureReason = 'รูปแบบ WIF ไม่ถูกต้อง (Checksum ล้มเหลว)'; 
            let guide = 'ตรวจสอบให้แน่ใจว่าเป็น WIF (ขึ้นต้นด้วย 5, K, หรือ L) และมี Checksum ถูกต้อง';

            // 🎯 Logic: ตรวจสอบ WIF แบบ Uncompressed ที่ถูกต้อง (ที่ขึ้นต้นด้วย 5 และยาว 51 ตัวอักษร)
            if (inputKey.length === 51 && inputKey.startsWith('5')) {
                // Key เป็น WIF แบบ Uncompressed ที่ถูกต้องตามไวยากรณ์ (Syntax) แต่อาจมีปัญหาเรื่องการใช้งานร่วมกับ Address สมัยใหม่
                failureReason = 'Private Key (WIF) ถูกต้องตามรูปแบบ Uncompressed (ขึ้นต้นด้วย 5)';
                guide = 'Key นี้ถูกต้องตามรูปแบบเดิม แต่เครื่องมือนี้อาจพยายามสร้าง Public Key แบบ Compressed โปรดลองใช้ WIF ที่ขึ้นต้นด้วย K หรือ L (52 ตัวอักษร) เพื่อการใช้งานร่วมกันกับ Address สมัยใหม่';
            } 
            // Logic: ตรวจสอบความยาว WIF ที่ผิดพลาดชัดเจน
            else if (inputKey.length > 0 && inputKey.length !== 51 && inputKey.length !== 52) {
                failureReason = 'ความยาวของ Private Key (WIF) ไม่ถูกต้อง';
                guide = 'WIF ควรมีความยาว 51 หรือ 52 ตัวอักษร (รวม Checksum) กรุณาตรวจสอบว่าไม่มีการ Copy เกินมา';
            }
            // Logic: ตรวจสอบ Private Key ที่ขึ้นต้นด้วย K/L แต่มี Checksum ผิดพลาด
            else if (inputKey.startsWith('K') || inputKey.startsWith('L')) {
                failureReason = 'Private Key (WIF Compressed) Checksum ผิดพลาด';
                guide = 'รูปแบบ WIF ถูกต้อง แต่ Checksum ไม่ตรง Key นี้อาจมีตัวอักษรผิดพลาด';
            }
            

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
                    // 4. ไม่ถูกต้องทั้ง Address และ WIF (แสดง Error ตามที่วิเคราะห์ไว้ก่อนหน้า)
                    if (inputKey.startsWith('1') || inputKey.startsWith('3')) {
                        failureReason = 'Address ไม่ถูกต้อง (Base58 Checksum ล้มเหลว)';
                        guide = 'Address อาจมีตัวอักษรผิดพลาด, มี Checksum ไม่ตรง, หรือเป็น Address ของเครือข่ายอื่นที่ไม่ใช่ Bitcoin หลัก';
                    } else if (inputKey.startsWith('bc1') || inputKey.startsWith('tb1')) {
                        failureReason = 'Address ไม่ถูกต้อง (Bech32 Checksum ล้มเหลว)';
                        guide = 'Address อาจมีตัวอักษรผิดพลาด, มี Checksum ไม่ตรง, หรือเป็น Address ของเครือข่ายอื่นที่ไม่ใช่ Bitcoin หลัก';
                    } else if (!inputKey.startsWith('5') && !inputKey.startsWith('K') && !inputKey.startsWith('L')) {
                        failureReason = 'ไม่ใช่ Private Key (WIF) และไม่ใช่ Public Address Bitcoin ที่ถูกต้อง';
                        guide = 'โปรดป้อน Private Key (WIF) หรือ Public Address ที่สมบูรณ์และถูกต้องเท่านั้น (ห้ามใส่ Seed Phrase)';
                    }
                }
            }
            
            // Set error details only if validation failed for all types
            if (!isValidAddress) {
                setDetails({ 
                    address: inputKey, 
                    isValid: false, 
                    isWIF: false,
                    errorReason: failureReason,
                    solutionGuide: guide
                });
            } else {
                // Address validation success
                setDetails({ 
                    address: inputKey, 
                    isValid: true, 
                    isWIF: false,
                    type: addressType
                });
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold">Wallet Details / Key Checker</h2>
            <p className="text-lg text-center">
                <span className="font-bold">หลักการทำงาน:</span> ตรวจสอบ Private Key (WIF) หรือ Public Address ว่าถูกต้องตามรูปแบบของ Bitcoin หรือไม่ และแสดง Public Address ที่เชื่อมโยงกับ Private Key นั้น
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
                    
                    {/* แสดงรายละเอียดปัญหาเมื่อไม่ถูกต้อง */}
                    {!details.isValid && details.errorReason && (
                        <div className="mt-4 p-3 bg-red-800 rounded-lg">
                            <h4 className="text-lg font-bold text-red-300">🔎 สาเหตุของปัญหาที่พบ:</h4>
                            <p className="mt-1 text-sm">{details.errorReason}</p>
                            
                            <h4 className="text-lg font-bold text-yellow-300 mt-4">💡 แนวทางแก้ไข/ตรวจสอบ:</h4>
                            <p className="mt-1 text-sm">{details.solutionGuide}</p>
                        </div>
                    )}

                    {details.isValid && (
                         <>
                            <p className="text-md text-yellow-300">ประเภทที่พบ: <span className="font-bold">{details.type}</span></p>
                         </>
                    )}
                    
                    {details.isValid && details.isWIF && details.linkedAddresses && (
                        <div className='mt-4'>
                            <h4 className="text-lg font-bold mt-2">Public Addresses ที่เชื่อมโยง:</h4>
                            <p className="font-mono break-all text-sm mt-1">
                                <span className="font-bold">Legacy (P2PKH):</span> {details.linkedAddresses.legacy}
                            </p>
                            <p className="font-mono break-all text-sm mt-1">
                                <span className="font-bold">Native SegWit (Bech32):</span> {details.linkedAddresses.segwit}
                            </p>
                            <p className="font-mono break-all text-sm mt-1 text-gray-400">
                                <span className="font-bold">Taproot (P2TR):</span> {details.linkedAddresses.taproot}
                            </p>
                        </div>
                    )}
                </div>
            )}
            <Disclaimer />
        </div>
    );
}