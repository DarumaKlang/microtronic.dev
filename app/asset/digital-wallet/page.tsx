// src/app/asset/digital-wallet/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground';

// หากคุณมี Component GlassmorphismCard ที่สามารถนำมาใช้ได้ ก็สามารถ import มาใช้ได้เลย
// import GlassmorphismCard from '@/components/GlassmorphismCard';

export const metadata: Metadata = {
    title: 'Digital Wallet: ประตูสู่โลกสินทรัพย์ดิจิทัล - Microtronic',
    description: 'ทำความเข้าใจ Digital Wallet (Crypto Wallet) การแยกประเภท, เทคโนโลยี, ข้อดี-ข้อเสีย, และความน่าเชื่อถือ',
};

// Component เสริมสำหรับแสดงประเภท Wallet (Hot/Cold)
interface WalletTypeProps {
    title: string;
    definition: string;
    convenience: string;
    technology: string;
    examples: string[];
    security: string;
    isHot: boolean;
}

const WalletTypeCard: React.FC<WalletTypeProps> = ({
    title,
    definition,
    convenience,
    technology,
    examples,
    security,
    isHot
}) => {
    // ใช้สี g1-end สำหรับ Hot (ส้ม/แดง) และ g3-end สำหรับ Cold (ชมพู/อ่อน) ตามที่กำหนดใน tailwind.config.ts
    const bgColor = isHot ? 'bg-g1-start/20 border-g1-end' : 'bg-g3-start/20 border-g3-end';
    const titleColor = isHot ? 'text-g1-end' : 'text-g3-end';
    
    return (
        <div className={`p-6 rounded-xl border-2 ${bgColor} backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl`}>
            <h4 className={`text-2xl font-extrabold mb-3 ${titleColor} border-b border-white/30 pb-2`}>
                {title}
            </h4>
            <p className="mb-2 text-sm opacity-90"><strong className="font-semibold">คำจำกัดความ:</strong> {definition}</p>
            <p className="mb-2 text-sm opacity-90"><strong className="font-semibold">ความสะดวก:</strong> {convenience}</p>
            <p className="mb-2 text-sm opacity-90"><strong className="font-semibold">เทคโนโลยี:</strong> {technology}</p>
            <p className="mb-2 text-sm opacity-90"><strong className="font-semibold">ตัวอย่าง:</strong> {examples.join(', ')}</p>
            <p className="text-sm opacity-90"><strong className="font-semibold">ความปลอดภัย:</strong> {security}</p>
        </div>
    );
};

// Component สำหรับแสดงประเภท Wallet (Custodial/Non-Custodial)
interface KeyControlRowProps {
    type: string;
    controller: string;
    backup: string;
    pros: string;
    cons: string;
    isHeader?: boolean;
}

const KeyControlRow: React.FC<KeyControlRowProps> = ({
    type,
    controller,
    backup,
    pros,
    cons,
    isHeader = false
}) => {
    const baseClasses = "py-3 px-2 border-b border-white/20 break-words";
    const headerClasses = isHeader ? "font-bold bg-white/10" : "opacity-90 text-sm";
    
    return (
        <div className={`grid grid-cols-5 gap-1 ${headerClasses}`}>
            <div className={`${baseClasses} col-span-1`}>{type}</div>
            <div className={`${baseClasses} col-span-1`}>{controller}</div>
            <div className={`${baseClasses} col-span-1`}>{backup}</div>
            <div className={`${baseClasses} col-span-1 text-green-300`}>{pros}</div>
            <div className={`${baseClasses} col-span-1 text-red-300`}>{cons}</div>
        </div>
    );
};


export default function DigitalWalletPage() {
    return (
        // ใช้ class สำหรับ gradient background และ text-white เหมือนกับหน้าหลัก
        // เพิ่ม padding ด้านบนและล่างเพื่อหลีกเลี่ยง NavBar และ BottomNavbar
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                
                {/* Header Section */}
                <section className="text-center w-full">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-fuchsia-400">
                        Digital Wallet
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-light opacity-95">
                        ประตูสู่โลกสินทรัพย์ดิจิทัล
                    </h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg opacity-85 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        Digital Wallet (หรือ Crypto Wallet) คือซอฟต์แวร์หรือฮาร์ดแวร์ที่ใช้ในการจัดการและเก็บรักษา 
                        <strong className="text-yellow-300">กุญแจส่วนตัว (Private Keys)</strong> ซึ่งเป็นรหัสลับที่พิสูจน์ความเป็นเจ้าของและอนุญาตให้คุณสามารถใช้จ่ายหรือโอนสินทรัพย์ดิจิทัลของคุณได้
                    </p>
                </section>

                {/* --- 1. การแยกประเภทของ Digital Wallet (ตามเทคโนโลยีการจัดเก็บ) --- */}
                <section className="w-full">
                    <h3 className="text-3xl font-bold mb-8 border-b-2 border-fuchsia-500 pb-2">
                        1. การแยกประเภทของ Digital Wallet (ตามเทคโนโลยีการจัดเก็บ)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Hot Wallet Card */}
                        <WalletTypeCard
                            title="1.1 Hot Wallets (กระเป๋าสตางค์ร้อน) 🔥"
                            definition="Wallet ที่เชื่อมต่ออินเทอร์เน็ตอยู่ตลอดเวลา"
                            convenience="สูงมาก เข้าถึงได้ง่ายและรวดเร็วสำหรับทำธุรกรรมบ่อยครั้ง"
                            technology="ซอฟต์แวร์ที่ติดตั้งบนอุปกรณ์ หรือใช้บริการออนไลน์"
                            examples={['Mobile Wallets (BlueWallet, Muun)', 'Desktop Wallets (Electrum)', 'Web/Exchange Wallets (Binance, Coinbase)']}
                            security="ค่อนข้างต่ำกว่า Cold Wallet เสี่ยงจากการโจมตีทางอินเทอร์เน็ต (Hacking, Malware)"
                            isHot={true}
                        />

                        {/* Cold Wallet Card */}
                        <WalletTypeCard
                            title="1.2 Cold Wallets (กระเป๋าสตางค์เย็น) ❄️"
                            definition="Wallet ที่ไม่ได้เชื่อมต่ออินเทอร์เน็ตอยู่ตลอดเวลา"
                            convenience="ต่ำกว่า Hot Wallet แต่เน้นความปลอดภัยสูงสุด"
                            technology="อุปกรณ์ฮาร์ดแวร์โดยเฉพาะ หรือการบันทึกข้อมูลแบบออฟไลน์"
                            examples={['Hardware Wallets (Ledger, Trezor)', 'Paper Wallets (ไม่แนะนำแล้ว)']}
                            security="สูงที่สุด เหมาะสำหรับการจัดเก็บสินทรัพย์จำนวนมากในระยะยาว"
                            isHot={false}
                        />
                    </div>
                </section>

                {/* --- 2. การแยกประเภทของ Digital Wallet (ตามลักษณะการควบคุมกุญแจ) --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        2. การแยกประเภทของ Digital Wallet (ตามลักษณะการควบคุมกุญแจ)
                    </h3>
                    <div className="w-full overflow-x-auto bg-white/10 p-4 rounded-xl shadow-lg">
                        <div className="min-w-[800px]"> {/* กำหนด min-width เพื่อไม่ให้ตารางย่อมากเกินไปบนมือถือ */}
                            <KeyControlRow
                                type="ประเภท"
                                controller="ผู้ควบคุม Private Key"
                                backup="การสำรองข้อมูล (Seed Phrase)"
                                pros="ข้อดี"
                                cons="ข้อเสีย"
                                isHeader={true}
                            />
                            <KeyControlRow
                                type="Custodial Wallet"
                                controller="บุคคลที่สาม (เช่น เว็บเทรด)"
                                backup="เว็บเทรดดูแล"
                                pros="ใช้งานง่าย, กู้รหัสผ่านได้"
                                cons="ไม่ได้ควบคุมเงินเต็มที่, เสี่ยงหากเว็บเทรดถูกแฮ็กหรือปิดตัว"
                            />
                            <KeyControlRow
                                type="Non-Custodial Wallet"
                                controller="คุณเองเท่านั้น"
                                backup="คุณต้องรับผิดชอบเอง 100%"
                                pros="ควบคุมเงินเต็มที่ (Decentralized)"
                                cons="หากทำ Seed Phrase หาย เงินจะหายตลอดไป, ต้องรับผิดชอบความปลอดภัยเอง"
                            />
                        </div>
                    </div>
                </section>

                {/* --- 3. เทคโนโลยีพื้นฐานและกลไกความปลอดภัย --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        3. เทคโนโลยีพื้นฐานและกลไกความปลอดภัย 🔐
                    </h3>
                    <p className="text-lg opacity-90 mb-6">
                        Digital Wallet ไม่ได้เก็บ Bitcoin หรือ Crypto จริง ๆ แต่เก็บชุดข้อมูลที่จำเป็นในการสร้างลายเซ็นธุรกรรม (Digital Signature)
                    </p>
                    <ul className="space-y-4">
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-yellow-400">
                            <strong className="text-xl font-semibold block mb-1 text-yellow-300">3.1 Private Key (กุญแจส่วนตัว)</strong>
                            <p className="text-sm opacity-90">คือชุดรหัสลับที่ใช้ในการ <strong className="font-bold">เซ็นชื่อ (Sign) ธุรกรรม</strong> เพื่ออนุญาตการใช้จ่าย โดยพื้นฐานแล้วเป็นตัวเลขขนาดใหญ่ที่ไม่ซ้ำกัน</p>
                        </li>
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-fuchsia-400">
                            <strong className="text-xl font-semibold block mb-1 text-fuchsia-300">3.2 Seed Phrase / Mnemonic (วลีเมล็ดพันธุ์)</strong>
                            <p className="text-sm opacity-90">เป็นชุดคำศัพท์ (มักจะ 12 หรือ 24 คำ) ใช้สำหรับ <strong className="font-bold">สำรอง (Backup) และ กู้คืน (Recovery)</strong> Private Key ทั้งหมดของ Wallet <strong className="text-red-400">วลีนี้คือรหัสผ่านหลักในการเข้าถึงเงินทั้งหมด ห้ามเปิดเผย!</strong></p>
                        </li>
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-blue-400">
                            <strong className="text-xl font-semibold block mb-1 text-blue-300">3.3 Multi-Signature (Multi-sig)</strong>
                            <p className="text-sm opacity-90">เทคโนโลยีที่กำหนดให้ต้องมีการลงนามจากหลายกุญแจส่วนตัว (เช่น 2 ใน 3 คน) เพื่ออนุมัติธุรกรรม <strong className="font-bold">เพิ่มระดับความปลอดภัยสูงขึ้น</strong> เหมาะสำหรับองค์กรหรือเงินกองกลาง</p>
                        </li>
                    </ul>
                </section>

                {/* --- 4. ข้อดีและข้อเสียโดยสรุป --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        4. ข้อดีและข้อเสียโดยสรุป
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pros Card */}
                        <div className="p-6 rounded-xl border-2 border-green-500 bg-green-500/20 backdrop-blur-sm shadow-xl">
                            <h4 className="text-2xl font-extrabold mb-3 text-green-300">ด้านข้อดี (Pros) ✅</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm opacity-95">
                                <li><strong className="font-semibold">ความสะดวก:</strong> ทำธุรกรรมได้ทันที (Hot Wallet), เข้าถึงได้ทุกที่</li>
                                <li><strong className="font-semibold">ความปลอดภัย:</strong> Non-Custodial ให้การควบคุมเงินแบบ 100%</li>
                                <li><strong className="font-semibold">ต้นทุน:</strong> Wallet ส่วนใหญ่ (Software) ใช้งานได้ฟรี</li>
                            </ul>
                        </div>
                        {/* Cons Card */}
                        <div className="p-6 rounded-xl border-2 border-red-500 bg-red-500/20 backdrop-blur-sm shadow-xl">
                            <h4 className="text-2xl font-extrabold mb-3 text-red-300">ข้อเสีย (Cons) ❌</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm opacity-95">
                                <li><strong className="font-semibold">การใช้งาน:</strong> Cold Wallet ค่อนข้างซับซ้อน</li>
                                <li><strong className="font-semibold">ความเสี่ยง:</strong> หาก Private Key หรือ Seed Phrase หาย จะ <strong className="text-yellow-400">สูญเสียเงินตลอดไป</strong></li>
                                <li><strong className="font-semibold">ต้นทุน:</strong> Hardware Wallet มีค่าใช้จ่าย</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 5. ความน่าเชื่อถือของ Wallet --- */}
                <section className="w-full mt-8 text-center p-8 bg-white/10 rounded-xl shadow-2xl backdrop-blur-lg border border-white/20">
                    <h3 className="text-3xl font-bold mb-4 text-fuchsia-300">
                        5. ความน่าเชื่อถือของ Wallet 💡
                    </h3>
                    <p className="text-xl font-light max-w-4xl mx-auto opacity-95">
                        ความน่าเชื่อถือไม่ได้ขึ้นอยู่กับชื่อเสียงของ Wallet เท่านั้น แต่ขึ้นอยู่กับ <strong className="text-yellow-300">การควบคุมกุญแจส่วนตัว (Key Control)</strong>
                    </p>
                    <ul className="mt-6 space-y-3 text-left max-w-3xl mx-auto">
                        <li className="text-lg">
                            <strong className="font-semibold text-green-400">Non-Custodial (น่าเชื่อถือสูงสุด):</strong> Wallet ที่อนุญาตให้คุณควบคุม Seed Phrase และ Private Key เอง ถือว่าน่าเชื่อถือที่สุดในแง่ของการควบคุมทรัพย์สิน
                        </li>
                        <li className="text-lg">
                            <strong className="font-semibold text-blue-400">Open Source (ความโปร่งใส):</strong> Wallet ที่มีโค้ดเป็นสาธารณะ (Open Source) มักจะมีความน่าเชื่อถือสูง
                        </li>
                    </ul>
                    <div className="mt-8 p-4 bg-fuchsia-800 rounded-lg shadow-xl inline-block">
                        <p className="text-2xl font-extrabold text-white italic">
                            กฎทอง: "Not your keys, not your coins."
                        </p>
                    </div>
                </section>

                <footer className="w-full mt-12 text-center text-sm opacity-70">
                    <p>
                        ข้อมูลนี้จัดทำขึ้นเพื่อการศึกษาเกี่ยวกับการจัดการสินทรัพย์ดิจิทัล โปรดศึกษาข้อมูลเพิ่มเติมและทำความเข้าใจความเสี่ยงก่อนตัดสินใจลงทุน
                    </p>
                </footer>

            </main>
        </div>
    );
}