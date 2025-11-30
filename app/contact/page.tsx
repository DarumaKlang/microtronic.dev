// app/contact/page.tsx
'use client';

import React from 'react';
import GooeyBackground from '@/components/GooeyBackground'; 
import { Send, Clock, Phone, Github, Code } from 'lucide-react'; 

// ====================================================================
// !!! การตั้งค่าสำหรับ Formspree Email Submission !!!
// ====================================================================

// 1. Formspree Endpoint URL (สำหรับส่งข้อมูลเข้าอีเมล k.net.game01@gmail.com)
//    (ใช้ Fetch API แทน @formspree/react hook)
const FORMSPREE_ACTION = "https://formspree.io/f/mvgegzyk"; 

// เราไม่จำเป็นต้องใช้ Entry ID แล้ว แต่ใช้ชื่อ Field (name/email/service/message)
// ====================================================================

export default function ContactPage() {
    
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = React.useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // เพิ่มข้อมูลระบุแหล่งที่มา (Optional, แต่ดีสำหรับ Formspree)
        formData.append('_subject', 'การจองคิวนัดปรึกษาจาก Microtronic Website');
        formData.append('_replyto', formData.get('email') as string); // ใช้อีเมลผู้ใช้เป็น Reply-To

        try {
            // ส่งข้อมูลไปยัง Formspree Endpoint
            const response = await fetch(FORMSPREE_ACTION, {
                method: 'POST',
                // Formspree รองรับการส่ง FormData โดยตรง
                body: formData, 
                // กำหนด Header เพื่อให้ Formspree ส่ง response ที่เป็น JSON กลับมา
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
                setMessage('✅ นัดปรึกษาสำเร็จ! ข้อมูลถูกส่งเข้าอีเมล k.net.game01@gmail.com แล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด');
                form.reset();
            } else {
                // จัดการ Error ที่ Formspree อาจส่งกลับมา
                const data = await response.json();
                console.error('Formspree Error:', data);
                setStatus('error');
                setMessage(`❌ เกิดข้อผิดพลาดในการส่งข้อมูล: ${data.error || 'กรุณาลองใหม่อีกครั้ง'}`);
            }

        } catch (error) {
            console.error('Submission Exception:', error);
            setStatus('error');
            setMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
        }
    };

    const getButtonText = () => {
        switch (status) {
            case 'loading':
                return 'กำลังส่งข้อมูล...';
            case 'success':
                return 'ส่งข้อมูลเรียบร้อยแล้ว!';
            case 'error':
                return 'ลองส่งใหม่อีกครั้ง';
            default:
                return 'ส่งข้อมูลเพื่อนัดปรึกษา';
        }
    };

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-5xl flex flex-col gap-16 relative z-10">

                {/* HERO/HEADER SECTION */}
                <header className="text-center pt-10 pb-5">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        นัดปรึกษา <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">ฟรี!</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        มาเริ่มต้นโปรเจ็กต์แห่งอนาคตของคุณ ทีมงานผู้เชี่ยวชาญด้าน Next.js พร้อมให้คำปรึกษาฟรี 30 นาที
                    </p>
                </header>

                {/* CONTACT FORM SECTION */}
                <section className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/30 shadow-2xl">
                    
                    <h2 className="text-3xl font-bold mb-8 text-center">แจ้งความต้องการเบื้องต้น</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* ชื่อ-นามสกุล (Name) */}
                        <div>
                            <label htmlFor="name" className="block text-md font-medium text-gray-200 mb-2">
                                ชื่อ-นามสกุล หรือ ชื่อบริษัท <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name" // ชื่อ Field ต้องตรงกับ FormData
                                required
                                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                placeholder="เช่น คุณสมชาย หรือ บริษัท Microtronic จำกัด"
                            />
                        </div>
                        
                        {/* อีเมล (Email) */}
                        <div>
                            <label htmlFor="email" className="block text-md font-medium text-gray-200 mb-2">
                                อีเมลติดต่อกลับ <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email" // ชื่อ Field ต้องตรงกับ FormData
                                required
                                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>
                        
                        {/* บริการที่สนใจ (Service) */}
                        <div>
                            <label htmlFor="service" className="block text-md font-medium text-gray-200 mb-2">
                                บริการที่สนใจ
                            </label>
                            <select
                                id="service"
                                name="service" // ชื่อ Field ต้องตรงกับ FormData
                                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            >
                                <option value="ปรึกษาทั่วไป" className="text-gray-400">-- เลือกบริการหลัก --</option>
                                <option value="เว็บไซต์ Next.js/Vercel">เว็บไซต์ Next.js/Vercel</option>
                                <option value="ระบบชำระเงิน Lightning Network/LNbits">ระบบชำระเงิน Lightning Network/LNbits</option>
                                <option value="การตลาดดิจิทัล (SEO/Ads)">การตลาดดิจิทัล (SEO/Ads)</option>
                                <option value="ปรึกษาทั่วไป">ปรึกษาทั่วไป</option>
                            </select>
                        </div>
                        
                        {/* รายละเอียดโครงการ (Message) */}
                        <div>
                            <label htmlFor="message" className="block text-md font-medium text-gray-200 mb-2">
                                รายละเอียดโครงการโดยย่อ <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message" // ชื่อ Field ต้องตรงกับ FormData
                                rows={4}
                                required
                                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                placeholder="อธิบายสั้นๆ ว่าคุณต้องการให้ Microtronic ช่วยในด้านใด..."
                            />
                        </div>
                        
                        {/* ข้อความสถานะการส่ง */}
                        {message && (
                            <p className={`text-center font-bold p-3 rounded-lg ${status === 'success' ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'}`}>
                                {message}
                            </p>
                        )}

                        {/* ปุ่มส่งฟอร์ม (CTA) */}
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full flex items-center justify-center p-3 text-lg font-bold rounded-lg 
                                       bg-cyan-500 text-gray-900 hover:bg-cyan-400 transition duration-300 
                                       transform hover:scale-[1.01] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            {getButtonText()}
                        </button>
                    </form>
                </section>

                {/* INFO SECTION (ส่วนแสดงความเป็น Developer) */}
                <section className="grid md:grid-cols-4 gap-8 text-center">
                    
                    {/* เราเปลี่ยนคำอธิบายให้เข้ากับ Formspree/Developer */}
                    <InfoBox 
                        icon={Code} 
                        title="Formspree API" 
                        description="ส่งข้อมูลตรงสู่ Inbox โดยใช้ Formspree Endpoint (Serverless)" 
                    />

                    <InfoBox 
                        icon={Github} 
                        title="Open Source Mindset" 
                        description="โค้ดบางส่วนถูกพัฒนาแบบเปิดเผย และสามารถตรวจสอบได้บน GitHub" 
                    />

                    <InfoBox icon={Clock} title="ตอบกลับรวดเร็ว" description="ทีมงานจะติดต่อกลับภายใน 1-2 ชั่วโมงทำการ" />
                    <InfoBox icon={Phone} title="อีเมลโดยตรง" description="k.net.game01@gmail.com" />
                </section>

            </main>
        </div>
    );
}

// Component ย่อย: Info Box
const InfoBox: React.FC<{ icon: React.FC<any>; title: string; description: string }> = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
        <Icon className="w-8 h-8 text-fuchsia-400 mx-auto mb-3" />
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
    </div>
);