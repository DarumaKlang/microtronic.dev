import React from 'react';
import type { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import { GLASS_PANEL_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'ข้อกำหนดและข้อตกลง - Terms & Conditions | Microtronic',
    description: 'ข้อกำหนดและข้อตกลงการให้บริการ Next.js Solution ของ Microtronic สำหรับ Templates & Starter Kits และ Custom Enterprise Solutions',
    keywords: ['Terms and Conditions', 'T&C', 'ข้อตกลง', 'Template License', 'Custom Development Agreement', 'Microtronic'],
};

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen p-8 pb-20 mt-8 sm:p-20 pt-[120px] relative overflow-hidden bg-slate-950">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 opacity-95 z-0" />
            <GooeyBackground />

            <main className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        📄 ข้อกำหนดและข้อตกลง
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        Terms & Conditions for Next.js Solutions
                    </p>
                    <p className="text-sm text-gray-400">
                        อัปเดตล่าสุด: 16 ธันวาคม 2025 | Last Updated: December 16, 2025
                    </p>
                </div>

                {/* Introduction */}
                <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl mb-8`}>
                    <p className="text-gray-300 leading-relaxed">
                        ยินดีต้อนรับสู่ Microtronic! ข้อกำหนดและข้อตกลงนี้กำหนดเงื่อนไขในการให้บริการของเรา
                        โดยแบ่งออกเป็น <span className="font-bold text-pink-400">2 ส่วนหลัก</span> ตามประเภทบริการ:
                    </p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/30 rounded-xl p-4">
                            <div className="text-2xl mb-2">📦</div>
                            <h3 className="font-bold text-pink-300 mb-1">ส่วนที่ 1</h3>
                            <p className="text-sm text-gray-300">Template & Starter Kits (5,000 - 22,900 บาท)</p>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-4">
                            <div className="text-2xl mb-2">🏢</div>
                            <h3 className="font-bold text-emerald-300 mb-1">ส่วนที่ 2</h3>
                            <p className="text-sm text-gray-300">Custom Enterprise Solution (120,000+ บาท)</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: Templates */}
                <section id="templates-terms" className="mb-12">
                    <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl border-pink-500/20`}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">📦</span>
                            <h2 className="text-4xl font-bold text-pink-300">
                                ส่วนที่ 1: Template & Starter Kits
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            ข้อตกลงนี้ใช้สำหรับบริการที่ลูกค้าซื้อ Source Code และดำเนินการด้วยตนเองเป็นหลัก (Self-Service Model)
                        </p>

                        {/* 1.1 Licensing & Purchase */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                1.1 การซื้อขายและสิทธิ์การใช้งาน (Licensing & Purchase)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-pink-500/30">
                                        <tr>
                                            <th className="text-left p-3 text-pink-400 font-semibold w-1/3">ข้อกำหนด</th>
                                            <th className="text-left p-3 text-gray-400 font-semibold">รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                A. รูปแบบสินค้า
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                สินค้าเป็นรูปแบบดิจิทัล (Source Code) และถูกส่งมอบผ่านลิงก์ดาวน์โหลดทันทีหลังการชำระเงิน
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                B. สิทธิ์การใช้งาน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                อนุญาตให้ใช้งานได้บน <span className="font-bold text-white">1 โครงการ (Single Project License)</span> เท่านั้น
                                                ลูกค้าสามารถแก้ไขและปรับแต่งโค้ดได้ตามต้องการ
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                C. ข้อจำกัดการใช้งาน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                <span className="font-bold text-red-400">ห้าม</span>จำหน่ายต่อ, ให้เช่า, ส่งต่อ, หรือแจกจ่าย Source Code ของ Template
                                                ไม่ว่าจะมีการดัดแปลงหรือไม่ก็ตาม
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                D. การคืนเงิน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                <span className="font-bold text-red-400">ไม่มีนโยบายการคืนเงิน (No Refund Policy)</span>
                                                เนื่องจากเป็นสินค้าดิจิทัลที่ได้รับทันที
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 1.2 Scope & Support */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                1.2 ขอบเขตบริการและการสนับสนุน (Scope & Support)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-pink-500/30">
                                        <tr>
                                            <th className="text-left p-3 text-pink-400 font-semibold w-1/3">ข้อกำหนด</th>
                                            <th className="text-left p-3 text-gray-400 font-semibold">รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                A. ขอบเขตสินค้า
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ครอบคลุมเฉพาะ <span className="font-bold text-white">Source Code</span> และ
                                                <span className="font-bold text-white"> คู่มือการติดตั้งพื้นฐาน</span> ตามที่ระบุในรายละเอียดสินค้าแต่ละเซ็ต
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                B. การติดตั้ง
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ลูกค้าต้องดำเนินการติดตั้ง, การปรับแต่งเนื้อหา, และการ Deploy บน Hosting ด้วยตนเอง
                                                (ยกเว้นกรณีที่ซื้อเซ็ตคอมโบที่รวมบริการเหล่านี้)
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                C. การสนับสนุนฟรี
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                จำกัดเฉพาะการแก้ไข <span className="font-bold text-white">บั๊ก (Bugs)</span> ที่พิสูจน์ได้ว่าเกิดจากโค้ดหลักของ Template
                                                เป็นเวลา <span className="font-bold text-white">7 วัน</span> นับจากวันที่ซื้อ
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-pink-300 font-medium align-top">
                                                D. บริการเสริม
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                การแก้ไขโค้ด, การสอน, การบำรุงรักษา, หรือการจัดการ Hosting/Domain
                                                ถือเป็นบริการเสริมที่มีค่าใช้จ่ายเพิ่มเติม
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Enterprise */}
                <section id="enterprise-terms" className="mb-12">
                    <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl border-emerald-500/20`}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">🏢</span>
                            <h2 className="text-4xl font-bold text-emerald-300">
                                ส่วนที่ 2: Custom Enterprise Solution
                            </h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            ข้อตกลงนี้ใช้สำหรับงานพัฒนาโครงการเต็มรูปแบบ ที่มีการออกแบบและฟังก์ชันเฉพาะเจาะจง
                        </p>

                        {/* 2.1 Project Scope & Payment */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                2.1 ขอบเขตงานและการชำระเงิน (Project Scope & Payment)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-emerald-500/30">
                                        <tr>
                                            <th className="text-left p-3 text-emerald-400 font-semibold w-1/3">ข้อกำหนด</th>
                                            <th className="text-left p-3 text-gray-400 font-semibold">รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                A. ขอบเขตงาน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                เป็นไปตาม <span className="font-bold text-white">เอกสารใบเสนอราคา (Quotation)</span> หรือ
                                                <span className="font-bold text-white"> เอกสารข้อกำหนดความต้องการ (SOW)</span> ที่ลงนามร่วมกันเท่านั้น
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                B. การชำระเงิน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                <p className="mb-2">แบ่งเป็นงวดตามความคืบหน้า (Milestones) โดยทั่วไปคือ:</p>
                                                <ul className="list-disc list-inside space-y-1 ml-2">
                                                    <li><span className="font-bold text-white">งวดที่ 1: มัดจำ 30%</span> (เริ่มงาน)</li>
                                                    <li><span className="font-bold text-white">งวดที่ 2: 40%</span> (ส่งมอบงาน Design และ Core Development)</li>
                                                    <li><span className="font-bold text-white">งวดที่ 3: 30%</span> (ส่งมอบงานขั้นสุดท้ายและ Deploy)</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                C. การเปลี่ยนแปลงงาน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                การเปลี่ยนแปลงขอบเขตงาน (Scope Creep) หลังการเริ่มโครงการจะต้องมีการประเมินราคาและระยะเวลาเพิ่มเติม
                                                (Change Request)
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 2.2 Delivery & Warranty */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                2.2 การส่งมอบและการรับประกัน (Delivery & Warranty)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-emerald-500/30">
                                        <tr>
                                            <th className="text-left p-3 text-emerald-400 font-semibold w-1/3">ข้อกำหนด</th>
                                            <th className="text-left p-3 text-gray-400 font-semibold">รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                A. การส่งมอบ
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ส่งมอบ Source Code ทั้งหมด, สิทธิ์การเป็นเจ้าของ, เอกสารทางเทคนิค (Technical Documentation),
                                                และคู่มือการใช้งาน (User Manual)
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                B. การรับประกัน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                รับประกันการทำงานของระบบ (Code Warranty) เป็นเวลา <span className="font-bold text-white">3-6 เดือน</span>
                                                นับจากวันที่ส่งมอบงานขั้นสุดท้าย (UAT Approved)
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                C. ข้อยกเว้นการรับประกัน
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ไม่รวมปัญหาที่เกิดจากการเปลี่ยนแปลงโค้ดของลูกค้า, การใช้งานผิดวัตถุประสงค์,
                                                หรือปัญหาที่เกิดจากบริการภายนอก (เช่น API ล่ม, Hosting มีปัญหา)
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                D. SLA
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                มีการกำหนด <span className="font-bold text-white">Service Level Agreement (SLA)</span> สำหรับการแก้ไขปัญหาเร่งด่วน
                                                โดยมีค่าบริการบำรุงรักษา (Maintenance Fee) รายเดือน/รายปี
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 2.3 Intellectual Property */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                2.3 ทรัพย์สินทางปัญญา (Intellectual Property - IP)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-emerald-500/30">
                                        <tr>
                                            <th className="text-left p-3 text-emerald-400 font-semibold w-1/3">ข้อกำหนด</th>
                                            <th className="text-left p-3 text-gray-400 font-semibold">รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                A. สิทธิ์ในโค้ด
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ลูกค้าจะได้รับ <span className="font-bold text-white">สิทธิ์ความเป็นเจ้าของ (Ownership)</span> ใน Source Code
                                                ที่พัฒนาขึ้นโดยสมบูรณ์ หลังจากการชำระเงินงวดสุดท้ายเสร็จสิ้น
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="p-3 text-emerald-300 font-medium align-top">
                                                B. การอ้างอิง
                                            </td>
                                            <td className="p-3 text-gray-300">
                                                ผู้พัฒนาอาจขอสงวนสิทธิ์ในการแสดงโลโก้ของลูกค้าและข้อมูลโครงการโดยสรุปใน Portfolio
                                                เพื่อวัตถุประสงค์ทางการตลาด
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <div className={`${GLASS_PANEL_CLASS} p-6 rounded-2xl text-center`}>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        <span className="font-bold text-white">หมายเหตุ:</span> ข้อกำหนดและข้อตกลงนี้สามารถเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                        โปรดตรวจสอบหน้านี้เป็นระยะเพื่อดูการอัปเดตล่าสุด หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม
                        กรุณาติดต่อเราที่ <a href="/contact" className="text-cyan-400 hover:underline">หน้าติดต่อ</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
