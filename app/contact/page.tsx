// app/contact/page.tsx
'use client';

import React from 'react';
import GooeyBackground from '@/components/GooeyBackground';
import { Send, Clock, Phone, Github, Code } from 'lucide-react';

// ====================================================================
// !!! การตั้งค่าสำหรับ Formspree Email Submission !!!
// ====================================================================
// 1. Formspree Endpoint URL 
const FORMSPREE_ACTION = "https://formspree.io/f/mvgegzyk";
// ====================================================================

// Metadata สำหรับหน้านี้ (ใช้สำหรับ Server Component แต่ถูกครอบด้วย 'use client' จึงใช้ไม่ได้ตรงๆ)
// หากต้องการใช้ Metadata ใน client component ต้องนำไปใส่ใน layout.tsx ที่ครอบทับ
/*
export const metadata = {
  title: 'ติดต่อเรา | Microtronic Dev.',
  description: 'เริ่มต้นโปรเจกต์ของคุณกับ Microtronic Dev. ได้แล้ววันนี้',
};
*/

// Component ย่อย: Info Box (แก้ไข Type Safety)
interface InfoBoxProps {
    // FIX: ใช้ React.ElementType แทน any เพื่อ Type Safety
    icon: React.ElementType;
    title: string;
    description: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
        <Icon className="w-8 h-8 text-fuchsia-400 mx-auto mb-3" />
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
    </div>
);


export default function ContactPage() {

    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = React.useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        formData.append('_subject', 'การจองคิวนัดปรึกษาจาก Microtronic Website');
        formData.append('_replyto', formData.get('email') as string);

        try {
            const response = await fetch(FORMSPREE_ACTION, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
                setMessage('ส่งข้อความสำเร็จ! เราจะติดต่อกลับภายใน 1-2 ชั่วโมงทำการ');
                form.reset();
            } else {
                setStatus('error');
                setMessage('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง');
            }
        } catch {
            // หากต้องการ Debug สามารถใช้: console.error(error);
            setStatus('error');
            setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาตรวจสอบการเชื่อมต่อของคุณ');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative">

            <GooeyBackground />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">

                {/* Contact Form Section */}
                <section className="max-w-3xl mx-auto">
                    {/* FIX: เปลี่ยน bg-gradient-to-r เป็น bg-linear-to-r */}
                    <h1 className="text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-400 to-cyan-400">
                        ติดต่อเริ่มต้นโปรเจกต์
                    </h1>
                    <p className="text-xl text-center text-gray-400 mb-12">
                        กรุณากรอกข้อมูลเพื่อรับแผนกลยุทธ์การพัฒนาเว็บไซต์ฟรีจากผู้เชี่ยวชาญของเรา
                    </p>

                    <form onSubmit={handleSubmit} className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">

                        {/* ชื่อ */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">ชื่อ-นามสกุล</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-pink-500 focus:border-pink-500 transition"
                            />
                        </div>

                        {/* อีเมล */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">อีเมลติดต่อ</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-pink-500 focus:border-pink-500 transition"
                            />
                        </div>

                        {/* บริการที่สนใจ */}
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">บริการที่สนใจ</label>
                            <select
                                id="service"
                                name="service"
                                required
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-pink-500 focus:border-pink-500 transition appearance-none"
                            >
                                <option value="" disabled>-- เลือกบริการ --</option>
                                <option value="Web Development (Next.js)">พัฒนาเว็บไซต์/Web App (Next.js)</option>
                                <option value="System Migration (to Next.js/TS)">ย้ายระบบเดิมสู่ Next.js/TS</option>
                                <option value="Consulting & Audit">ให้คำปรึกษาด้าน Performance/Security</option>
                                <option value="Other">อื่นๆ</option>
                            </select>
                        </div>

                        {/* ข้อความ/รายละเอียดโปรเจกต์ */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">รายละเอียดโครงการโดยย่อ</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-pink-500 focus:border-pink-500 transition"
                            />
                        </div>

                        {/* สถานะการส่ง */}
                        {status === 'success' && (
                            <p className="text-green-400 font-semibold">{message}</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-400 font-semibold">{message}</p>
                        )}

                        {/* Terms Agreement */}
                        <div className="text-sm text-gray-400 text-center">
                            โดยการส่งข้อมูลนี้ คุณยอมรับ <a href="/terms" className="text-pink-400 hover:underline">ข้อกำหนดและเงื่อนไข</a> ของเรา
                        </div>

                        {/* ปุ่มส่ง: "ส่งข้อมูลเพื่อรับแผนกลยุทธ์" */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-3 px-4 text-lg font-bold rounded-full transition duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 ${status === 'loading'
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-pink-600 text-white hover:bg-pink-500 shadow-pink-600/50'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            {status === 'loading' ? 'กำลังส่ง...' : 'ส่งข้อมูลเพื่อรับแผนกลยุทธ์'}
                        </button>
                    </form>
                </section>

                {/* INFO SECTION (ส่วนแสดงความเป็น Developer) */}
                <section className="grid md:grid-cols-4 gap-8 text-center">
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