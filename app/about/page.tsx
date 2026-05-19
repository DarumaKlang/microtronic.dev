'use client';

import React from 'react';
import GooeyBackground from '@/components/GooeyBackground';
import { Target, Users, Code2, Rocket } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Precision Architecture',
        description: 'เราออกแบบระบบด้วยความแม่นยำสูง เน้นโครงสร้างที่ยืดหยุ่นและรองรับการขยายตัวในอนาคต'
    },
    {
        icon: Users,
        title: 'Customer Success',
        description: 'ความสำเร็จของท่านคือเป้าหมายสูงสุดของเรา เราทำงานแบบเป็นพาร์ทเนอร์เพื่อเจริญเติบโตไปด้วยกัน'
    },
    {
        icon: Code2,
        title: 'Green Code Ethics',
        description: 'เราพัฒนาซอฟต์แวร์ที่ใช้ทรัพยากรอย่างคุ้มค่า ลดภาระของเซิร์ฟเวอร์และสิ่งแวดล้อม'
    },
    {
        icon: Rocket,
        title: '2026 Ready',
        description: 'ทุกเทคโนโลยีที่เราเลือกใช้คือนวัตกรรมระดับแถวหน้า เพื่อให้มั่นใจว่าธุรกิจของคุณจะนำหน้าคู่แข่งหนึ่งก้าวเสมอ'
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 relative overflow-hidden">
            <GooeyBackground />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-white to-pink-400">
                        WE_ARE_MICROTRONIC
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        ทีมวิศวกรซอฟต์แวร์ผู้ชื่นชอบในความเร็ว ความปลอดภัย และนวัตกรรมที่เปลี่ยนโลก
                        เราไม่ได้แค่พัฒนาโค้ด แต่เราสร้างรากฐานดิจิทัลที่แข็งแกร่งสำหรับอนาคต
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400">หัวใจไทย ในเทคโนโลยีระดับโลก</h2>
                        <p className="text-gray-300 leading-relaxed italic border-l-4 border-pink-500 pl-6">
                            &ldquo;เราเชื่อว่าการพัฒนาเทคโนโลยีที่ล้ำสมัยที่สุด ต้องมาพร้อมกับการรักษาวิถีชีวิตที่เรียบง่าย
                            การส่งต่อวัฒนธรรมที่มีเสน่ห์ และความรับผิดชอบต่อสิ่งแวดล้อม&rdquo;
                        </p>
                        <p className="text-gray-400">
                            Microtronic Dev ก่อตั้งขึ้นเพื่อเป็นจิ๊กซอว์ตัวสำคัญในการขับเคลื่อนอุตสาหกรรมเทคโนโลยีในประเทศไทย
                            โดยเน้นการใช้ Next.js และ AI มาเพิ่มศักยภาพให้ธุรกิจทุกขนาด
                        </p>
                    </div>
                    <div className="relative p-1 bg-linear-to-br from-blue-500/20 to-pink-500/20 rounded-[40px] overflow-hidden">
                        <div className="bg-slate-900/80 backdrop-blur-3xl rounded-[38px] p-12 text-center aspect-square flex flex-col justify-center border border-white/5 shadow-2xl">
                            <div className="text-8xl mb-6">🇹🇭</div>
                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Tech with Heart</h3>
                            <div className="h-1 w-24 bg-linear-to-r from-blue-500 to-pink-500 mx-auto rounded-full mt-4" />
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={index} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                                <Icon className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}
