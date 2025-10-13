// src/components/HomeCoreServicesSection.tsx
import React from 'react';
import Link from 'next/link';
import GlassmorphismCard from './GlassmorphismCard'; // ต้องแน่ใจว่า GlassmorphismCard ถูก import อย่างถูกต้อง

export default function HomeCoreServicesSection() {
    return (
        <section className="w-full max-w-7xl mt-16 px-4">
            <h3 className="text-3xl font-bold text-center mb-12">บริการของเรา</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* การ์ดบริการ: มืออาชีพ */}
                <Link href="/service/Professional" className="block transform transition-transform duration-300 hover:scale-[1.02]">
                    <GlassmorphismCard>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                {/* Bootstrap Icon: Star/Badge/Professional (bi-award-fill) */}
                                <i className="bi bi-award-fill text-3xl text-white"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-2">มืออาชีพ</h4>
                            <p className="text-sm opacity-80">
                                รับออกแบบและพัฒนาเว็บไซต์ด้วยมาตรฐานสูงสุด เพื่อให้เว็บไซต์ของคุณมีประสิทธิภาพและน่าเชื่อถือ
                            </p>
                        </div>
                    </GlassmorphismCard>
                </Link>

                {/* การ์ดบริการ: ทันสมัย */}
                <Link href="/service/Modern" className="block transform transition-transform duration-300 hover:scale-[1.02]">
                    <GlassmorphismCard>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                {/* Bootstrap Icon: Rocket/Modern (bi-rocket-fill) */}
                                <i className="bi bi-rocket-fill text-3xl text-white"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-2">ทันสมัย</h4>
                            <p className="text-sm opacity-80">
                                ใช้เทคโนโลยีล่าสุดและดีไซน์ที่ล้ำสมัย เพื่อให้เว็บไซต์ของคุณโดดเด่นและสร้างความประทับใจ
                            </p>
                        </div>
                    </GlassmorphismCard>
                </Link>

                {/* การ์ดบริการ: เครื่องมือจัดการ Wallet */}
                <Link href="/service/Wallet-Tools" className="block transform transition-transform duration-300 hover:scale-[1.02]">
                    <GlassmorphismCard>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                {/* Bootstrap Icon: Wallet/Gear (bi-wallet-fill) */}
                                <i className="bi bi-wallet-fill text-3xl text-white"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-2">เครื่องมือจัดการ Wallet</h4>
                            <p className="text-sm opacity-80">
                                เครื่องมือจัดการ Bitcoin Wallet ที่ทันสมัย และเป็น OpenSource ที่รองรับการใช้งานทุกอุปกรณ์
                            </p>
                        </div>
                    </GlassmorphismCard>
                </Link>

                {/* การ์ดบริการ: เป็นมิตรกับสิ่งแวดล้อม */}
                <Link href="/service/Environmentally" className="block transform transition-transform duration-300 hover:scale-[1.02]">
                    <GlassmorphismCard>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                {/* Bootstrap Icon: Leaf/Environmentally (bi-tree-fill) */}
                                <i className="bi bi-tree-fill text-3xl text-white"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-2">เป็นมิตรกับสิ่งแวดล้อม</h4>
                            <p className="text-sm opacity-80">
                                การออกแบบที่เน้นประสิทธิภาพ ช่วยลดการใช้พลังงานของเซิร์ฟเวอร์ และลดผลกระทบต่อสิ่งแวดล้อม
                            </p>
                        </div>
                    </GlassmorphismCard>
                </Link>
            </div>
        </section>
    );
}