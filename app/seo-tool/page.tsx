// app/seo-tool/page.tsx
'use client'; // กำหนดให้เป็น Client Component เพื่อใช้ Hooks เช่น useState, useMemo

import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';

// --- Constants (สำหรับ Character Limits) ---
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 155;

// --- Mockup Email Capture Logic (แทนการเรียก API จริง) ---
const handleEmailSubmit = (email: string) => {
    // ใน Production: ตรงนี้จะเรียก Server Action หรือ API Route เพื่อบันทึกอีเมล
    console.log(`Lead Captured: ${email}. Thank you!`);
    return true; // สมมติว่าสำเร็จ
};

// --- Core Meta Tag Generation Logic ---
const generateMetaTags = (keyword: string, audience: string, tone: string) => {
    // 1. Logic การสร้าง Title (เน้นความกระชับและ Keyword)
    let generatedTitle = `${keyword} | บริการ ${audience} ${tone} [microtronic]`;
    if (generatedTitle.length > MAX_TITLE_LENGTH) {
        generatedTitle = `${keyword} ${tone} | microtronic`;
    }
    generatedTitle = generatedTitle.substring(0, MAX_TITLE_LENGTH);

    // 2. Logic การสร้าง Description (เน้น CTA และ Character Limit)
    let generatedDescription = `ค้นพบวิธีที่ดีที่สุดในการสร้างเว็บไซต์ Next.js และ TypeScript สำหรับ ${audience} เพื่อให้ได้ Core Web Vitals Score 95+ ด้วยทีมงานผู้เชี่ยวชาญ ${tone} เริ่มต้นเลย!`;
    
    // ใส่ Keyword ในส่วนต้น
    if (keyword) {
        generatedDescription = `[${keyword}] ${generatedDescription}`;
    }

    generatedDescription = generatedDescription.substring(0, MAX_DESCRIPTION_LENGTH);

    return {
        title: generatedTitle,
        description: generatedDescription,
        titleLength: generatedTitle.length,
        descriptionLength: generatedDescription.length,
    };
};

export default function SEOToolPage() {
    // --- States ---
    const [keyword, setKeyword] = useState('Next.js SEO');
    const [audience, setAudience] = useState('SME ที่ต้องการเว็บไซต์เร็ว');
    const [tone, setTone] = useState('เพิ่มยอดขาย');
    const [email, setEmail] = useState('');
    const [isLeadCaptured, setIsLeadCaptured] = useState(false);
    const [emailError, setEmailError] = useState('');

    // --- Memoized Meta Tags (คำนวณใหม่เมื่อ Input เปลี่ยน) ---
    const metaTags = useMemo(() => generateMetaTags(keyword, audience, tone), [keyword, audience, tone]);

    // --- Handle Email Form Submission ---
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError('');

        if (!email.includes('@')) {
            setEmailError('กรุณาป้อนอีเมลที่ถูกต้อง');
            return;
        }

        const success = handleEmailSubmit(email);
        if (success) {
            setIsLeadCaptured(true);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            {/* Header / Intro */}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">🚀 SEO Meta Tag Generator</h1>
            <p className="text-xl mb-10 text-gray-600">
                สร้าง Title และ Description ที่ถูกหลัก SEO และดึงดูดลูกค้า
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 1. Input Panel */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">ป้อนข้อมูลเว็บไซต์</h2>
                    
                    {/* Input: Keyword */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">คำหลัก (Primary Keyword)</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="เช่น: Next.js Development, Website Performance"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {/* Input: Target Audience */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">กลุ่มเป้าหมาย (Audience)</label>
                        <input
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="เช่น: SME ไทย, ธุรกิจขนาดเล็ก, E-commerce"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {/* Input: Tone/CTA */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">น้ำเสียง/Call to Action (CTA)</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="เพิ่มยอดขาย">เพิ่มยอดขาย (Sales-focused)</option>
                            <option value="เพิ่มความเร็ว">เพิ่มความเร็ว (Performance-focused)</option>
                            <option value="สร้างความน่าเชื่อถือ">สร้างความน่าเชื่อถือ (Trust-focused)</option>
                        </select>
                    </div>

                </div>

                {/* 2. Output Panel (The Lead Gate) */}
                <div className="relative">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">ผลลัพธ์ Meta Tag (ตัวอย่าง)</h2>

                    <div className={`p-6 border-2 border-dashed rounded-xl bg-white transition-all duration-300 
                                     ${!isLeadCaptured ? 'blur-sm pointer-events-none' : 'blur-none'}`}>
                        
                        {/* Title Result */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-blue-700 mb-2">Title Tag ({metaTags.titleLength}/{MAX_TITLE_LENGTH} อักขระ)</h3>
                            <div className={`p-3 bg-gray-100 rounded-md whitespace-pre-wrap ${metaTags.titleLength > MAX_TITLE_LENGTH ? 'text-red-500' : 'text-green-700'}`}>
                                {metaTags.title}
                            </div>
                        </div>

                        {/* Description Result */}
                        <div>
                            <h3 className="text-lg font-bold text-blue-700 mb-2">Description Tag ({metaTags.descriptionLength}/{MAX_DESCRIPTION_LENGTH} อักขระ)</h3>
                            <div className={`p-3 bg-gray-100 rounded-md whitespace-pre-wrap ${metaTags.descriptionLength > MAX_DESCRIPTION_LENGTH ? 'text-red-500' : 'text-gray-900'}`}>
                                {metaTags.description}
                            </div>
                        </div>

                    </div>
                    
                    {/* --- Lead Gate Overlay (แสดงผลเมื่อยังไม่ Capture Lead) --- */}
                    {!isLeadCaptured && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-6 rounded-xl shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                ปลดล็อกผลลัพธ์ & รับคู่มือ SEO ฟรี!
                            </h3>
                            <p className="text-center text-gray-600 mb-6">
                                กรุณาป้อนอีเมลเพื่อดู Meta Tag ฉบับเต็มและรับ **คู่มือ Next.js SEO Performance (Core Web Vitals)** จาก microtronic
                            </p>
                            
                            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    required
                                    className="w-full p-3 mb-3 border-2 border-blue-500 rounded-lg text-center"
                                />
                                {emailError && <p className="text-red-500 text-sm mb-3">{emailError}</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                                >
                                    รับผลลัพธ์ & คู่มือทันที
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Footer / Authority Statement */}
            <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">เหตุผลที่เราทำได้ดี:</span> เราเชี่ยวชาญในการพัฒนาเว็บไซต์ Next.js และ Vercel ที่ให้ความสำคัญกับ Performance และ SEO เพื่อช่วยให้ธุรกิจของคุณเติบโต
                </p>
            </div>
        </div>
    );
}

// --- End of File ---