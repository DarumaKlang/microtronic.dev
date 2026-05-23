'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, TrendingUp, Shield, Zap, BarChart3, FileText } from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: 'Dashboard สรุปงบการเงิน Real-time',
        description: 'ดูภาพรวมรายรับ-รายจ่าย กำไร-ขาดทุน และ Cash Flow ได้ทันทีในหน้าเดียว',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
    },
    {
        icon: FileText,
        title: 'รายงานภาษีมูลค่าเพิ่ม (VAT) อัตโนมัติ',
        description: 'ระบบคำนวณและสร้างรายงาน VAT ตามมาตรฐานกรมสรรพากรไทยโดยอัตโนมัติ',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
    {
        icon: TrendingUp,
        title: 'AI คำนวณยอดและพยากรณ์รายได้',
        description: 'ใช้ AI วิเคราะห์ pattern การเงินและพยากรณ์ Cash Flow ล่วงหน้าได้ถึง 3 เดือน',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
    },
    {
        icon: Shield,
        title: 'ความปลอดภัยระดับ Enterprise',
        description: 'ข้อมูลเข้ารหัส AES-256 พร้อม Role-based Access Control สำหรับทีมบัญชี',
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
    },
    {
        icon: Zap,
        title: 'โหลดเร็ว ใช้งานได้ทุกอุปกรณ์',
        description: 'สร้างด้วย Next.js 16 + Cloud Native Architecture โหลดภายใน 1.5s ทุกหน้าจอ',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
    },
    {
        icon: CheckCircle,
        title: 'ทะเบียนลูกค้า สินค้า และ Invoice',
        description: 'จัดการข้อมูลลูกค้า สินค้า และออก Invoice / ใบเสร็จได้ในระบบเดียว',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
    },
];

const plans = [
    {
        name: 'Starter',
        price: 'ฟรี',
        period: 'ตลอดไป',
        description: 'เหมาะสำหรับธุรกิจขนาดเล็กที่เพิ่งเริ่มต้น',
        features: ['ธุรกรรมสูงสุด 100 รายการ/เดือน', 'รายงานพื้นฐาน', 'ผู้ใช้ 1 คน', 'Support ทาง Email'],
        cta: 'เริ่มใช้ฟรี',
        href: '/contact?product=micro-account-starter',
        highlight: false,
    },
    {
        name: 'Business',
        price: '15,000 THB',
        period: 'ต่อเดือน',
        description: 'สำหรับธุรกิจที่ต้องการระบบบัญชีครบวงจร',
        features: ['ธุรกรรมไม่จำกัด', 'รายงาน VAT อัตโนมัติ', 'ผู้ใช้สูงสุด 5 คน', 'AI Cash Flow Forecast', 'Support ทาง Line & Email'],
        cta: 'สอบถามราคา',
        href: '/contact?product=micro-account-business',
        highlight: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'ราคาพิเศษ',
        description: 'สำหรับองค์กรที่ต้องการ Custom Integration',
        features: ['ทุกอย่างใน Business', 'Custom ERP Integration', 'ผู้ใช้ไม่จำกัด', 'Dedicated Support', 'SLA Agreement', 'On-premise option'],
        cta: 'นัดปรึกษาฟรี',
        href: '/contact?product=micro-account-enterprise',
        highlight: false,
    },
];

export default function MicroAccountLandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* Hero */}
            <section className="relative pt-36 pb-24 px-4">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.15),transparent_60%)] pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-xs font-bold uppercase tracking-[0.3em]">
                        SaaS Solution — Micro-Account Platform
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                        ระบบบัญชี{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Formula
                        </span>
                        <br />สำหรับธุรกิจไทย
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        จัดการบัญชีครบวงจร ตั้งแต่รายรับ-รายจ่าย ไปจนถึงรายงาน VAT อัตโนมัติ
                        พร้อม AI ช่วยพยากรณ์ Cash Flow ล่วงหน้า
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact?product=micro-account-business"
                            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition shadow-xl shadow-purple-500/20 text-lg"
                        >
                            สอบถามราคา
                        </Link>
                        <Link
                            href="/contact?product=micro-account-demo"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition border border-white/20 text-lg"
                        >
                            ขอ Demo ฟรี
                        </Link>
                    </div>
                </div>
            </section>

            {/* Preview Image */}
            <section className="px-4 pb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                        <Image
                            src="/images/micro-account-preview.svg"
                            alt="Micro-Account Platform Preview"
                            fill
                            sizes="(max-width: 1024px) 100vw, 1000px"
                            className="object-cover object-top"
                            unoptimized
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">ฟีเจอร์ครบ ใช้งานง่าย</h2>
                        <p className="text-gray-400 text-lg">ออกแบบมาเพื่อธุรกิจไทยโดยเฉพาะ</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className={`p-6 rounded-2xl border ${f.border} ${f.bg} hover:scale-105 transition-transform duration-300`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.bg} border ${f.border}`}>
                                        <Icon className={`w-6 h-6 ${f.color}`} />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="px-4 pb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">เลือกแพ็กเกจที่เหมาะกับคุณ</h2>
                        <p className="text-gray-400 text-lg">ยืดหยุ่น ปรับได้ตามขนาดธุรกิจ</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                                    plan.highlight
                                        ? 'bg-purple-600/20 border-purple-500/50 shadow-xl shadow-purple-500/10 scale-105'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                                        แนะนำ
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-1">
                                        {plan.price}
                                    </div>
                                    <div className="text-xs text-gray-500 mb-3">{plan.period}</div>
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                </div>
                                <ul className="space-y-2 mb-8 flex-grow">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.href}
                                    className={`block text-center py-3 rounded-xl font-bold transition ${
                                        plan.highlight
                                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                                    }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Back */}
            <div className="text-center pb-16">
                <Link href="/products" className="text-gray-500 hover:text-white transition text-sm">
                    ← กลับหน้า Products
                </Link>
            </div>

        </div>
    );
}
