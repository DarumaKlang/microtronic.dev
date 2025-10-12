import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import { IoIosDocument, IoIosApps, IoIosText, IoIosBrush, IoIosKey, IoIosSearch } from 'react-icons/io';
import { IconType } from 'react-icons';

// กำหนดประเภทข้อมูลสำหรับการ์ดแต่ละใบ
interface WalletTool {
    href: string;
    title: string;
    description: string;
    icon: IconType;
    iconBgColor: string;
}

// ข้อมูลการ์ดเครื่องมือทั้งหมด 6 ใบ
const walletTools: WalletTool[] = [
    {
        href: "/service/Wallet-Tools/paper-wallet",
        title: "กระเป๋าเงินกระดาษ (Paper Wallet)",
        description: "สร้าง Public Key และ Private Key ที่สามารถพิมพ์ออกมาเก็บไว้อย่างปลอดภัยแบบออฟไลน์",
        icon: IoIosDocument,
        iconBgColor: "bg-blue-500/80",
    },
    {
        href: "/service/Wallet-Tools/wallet-tools/bulk-wallet",
        title: "กระเป๋าเงินแบบกลุ่ม (Bulk Wallet)",
        description: "สร้างกระเป๋าเงินจำนวนมากในคราวเดียว เหมาะสำหรับการใช้งานในปริมาณมาก",
        icon: IoIosApps,
        iconBgColor: "bg-green-500/80",
    },
    {
        href: "/service/Wallet-Tools/brain-wallet",
        title: "กระเป๋าเงินจากข้อความ (Brain Wallet)",
        description: "สร้าง Private Key จากข้อความที่คุณจดจำได้ง่าย (ควรระมัดระวังเรื่องความปลอดภัย)",
        icon: IoIosText,
        iconBgColor: "bg-purple-500/80",
    },
    {
        href: "/service/Wallet-Tools/vanity-wallet",
        title: "กระเป๋าเงินมีดีไซน์ (Vanity Wallet)",
        description: "สร้าง Address ที่สามารถกำหนดข้อความนำหน้า Address เองได้เพื่อความสวยงาม",
        icon: IoIosBrush,
        iconBgColor: "bg-pink-500/80",
    },
    {
        href: "/service/Wallet-Tools/split-wallet",
        title: "กระเป๋าเงินแบบหลาย Key (Multisig)",
        description: "สร้างกระเป๋าเงินที่ต้องใช้ Key มากกว่า 1 Key ในการอนุมัติธุรกรรม เพิ่มความปลอดภัย",
        icon: IoIosKey,
        iconBgColor: "bg-orange-500/80",
    },
    {
        href: "/service/Wallet-Tools/wallet-details",
        title: "ตัวตรวจสอบข้อมูล Wallet",
        description: "ตรวจสอบรายละเอียดและสถานะของ Address หรือ Key เพื่อวิเคราะห์ข้อมูล",
        icon: IoIosSearch,
        iconBgColor: "bg-teal-500/80",
    },
];

export default function WalletToolsPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12 relative z-10">

                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        เครื่องมือจัดการ Wallet (Bitcoin/Crypto Tools)
                    </h1>
                    <p className="text-lg opacity-80 max-w-3xl mx-auto">
                        ชุดเครื่องมือขั้นสูงที่พัฒนาขึ้นเพื่อช่วยให้คุณสร้าง จัดการ และตรวจสอบกระเป๋าเงินดิจิทัลของคุณได้อย่างมีประสิทธิภาพและปลอดภัย
                    </p>
                </header>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {walletTools.map((tool) => (
                            <Link 
                                key={tool.href}
                                href={tool.href}
                                // เพิ่มเอฟเฟกต์เพื่อให้ดูเหมือนเป็นลิงก์ที่คลิกได้
                                className="block transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
                            >
                                <GlassmorphismCard className="h-full">
                                    <div className="flex flex-col items-start p-6 h-full">
                                        {/* Icon Section */}
                                        <div className={`w-14 h-14 mb-4 rounded-full ${tool.iconBgColor} flex items-center justify-center shadow-lg`}>
                                            <tool.icon className="text-3xl text-white" />
                                        </div>
                                        
                                        {/* Content */}
                                        <h2 className="text-xl font-bold mb-2 text-fuchsia-300">
                                            {tool.title}
                                        </h2>
                                        <p className="text-sm opacity-90 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>
                                </GlassmorphismCard>
                            </Link>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}