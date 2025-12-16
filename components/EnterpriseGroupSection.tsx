'use client';

import React from 'react';
import Link from 'next/link';
import { ENTERPRISE_GROUP_DATA, ENTERPRISE_FEATURES, EnterpriseFeature } from '@/constants/data';
import { GLASS_PANEL_CLASS } from '@/constants/data';
import { ComparisonTable } from '@/components/ComparisonTable';

/**
 * EnterpriseGroupSection - Component สำหรับแสดง Group II: Custom Enterprise Solutions
 * เน้น ROI, ความปลอดภัย และผลลัพธ์ทางธุรกิจที่วัดผลได้
 */
export default function EnterpriseGroupSection() {
    return (
        <section id="enterprise" className="relative py-16 px-4">
            {/* Background Gradient - Group II (Green/Blue Theme - ตัดกับ Group I) */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-blue-900/20 to-indigo-900/30 -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                        {ENTERPRISE_GROUP_DATA.headline}
                    </h2>
                    <p className="text-2xl sm:text-3xl font-semibold text-emerald-300 mb-6">
                        {ENTERPRISE_GROUP_DATA.subheadline}
                    </p>
                    <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {ENTERPRISE_GROUP_DATA.description}
                    </p>
                </div>

                {/* Guarantees / Trust Badges */}
                <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl mb-12 border-emerald-500/20`}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        รับประกันผลลัพธ์ที่วัดผลได้จริง
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ENTERPRISE_GROUP_DATA.guarantees.map((guarantee, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:bg-white/10"
                            >
                                <span className="text-2xl">{guarantee.split(' ')[0]}</span>
                                <p className="text-gray-200 font-medium">{guarantee.substring(guarantee.indexOf(' ') + 1)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {ENTERPRISE_FEATURES.map((feature, index) => (
                        <EnterpriseFeatureCard key={index} feature={feature} />
                    ))}
                </div>

                {/* Value Proposition Box */}
                <div className={`${GLASS_PANEL_CLASS} p-8 sm:p-12 rounded-3xl mb-16 border-blue-500/20`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                ทำไมองค์กรชั้นนำเลือก Microtronic?
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span><strong>ประสบการณ์ 10+ ปี</strong> ในการพัฒนาระบบองค์กร</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span><strong>Technology Stack ทันสมัย</strong> (Next.js, TypeScript, Cloud-Native)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span><strong>Agile Development</strong> - รับผลลัพธ์เร็วขึ้น 40%</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span><strong>Full Transparency</strong> - รายงานความคืบหน้าทุกวัน</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/30">
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-2">เฉลี่ย ROI ที่ลูกค้าได้รับ</p>
                                <p className="text-6xl font-extrabold text-emerald-400 mb-2">2.5x</p>
                                <p className="text-sm text-gray-300">ภายใน 6 เดือนแรก</p>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">150+</p>
                                    <p className="text-xs text-gray-400">โปรเจกต์</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">99.9%</p>
                                    <p className="text-xs text-gray-400">Uptime</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">24/7</p>
                                    <p className="text-xs text-gray-400">Support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Value Quote - เน้นย้ำคุณค่าการลงทุน */}
                    <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl mb-12 mt-12 border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-blue-900/20`}>
                        <div className="text-center max-w-5xl mx-auto">
                            <div className="text-5xl mb-4">💎</div>
                            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-4">
                                "การจ่ายหลักแสนบาท คือการ <span className="text-emerald-400">ซื้อความมั่นใจ, ความเสถียร</span>, และ<span className="text-blue-400"> ระบบที่ถูกออกแบบมาเพื่อสร้างรายได้และลดต้นทุน</span> ให้กับองค์กรของคุณโดยเฉพาะ ซึ่งถือเป็น<span className="text-emerald-400"> สินทรัพย์ดิจิทัลที่สำคัญที่สุด</span>ของธุรกิจในระยะยาว"
                            </blockquote>
                            <p className="text-gray-400 text-sm">— Microtronic Development Team</p>
                        </div>
                    </div>

                    {/* Comparison: Template vs Custom System */}
                    <div className="mb-12">
                        <h3 className="text-4xl font-bold text-center text-white mb-4">
                            💎 ทำไมต้องลงทุนหลักแสนสำหรับ Custom System?
                        </h3>
                        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
                            การลงทุนใน Custom E-commerce/System คือการลงทุนใน<span className="font-bold text-emerald-400">โครงสร้างพื้นฐานของธุรกิจ</span> ไม่ใช่แค่การซื้อเว็บไซต์
                        </p>

                        {/* Comparison Tables */}
                        <div className="space-y-8">
                            {/* 1. Custom UX/UI & Branding */}
                            <ComparisonTable
                                title="1. การออกแบบและประสบการณ์ผู้ใช้ (Custom UX/UI & Branding)"
                                rows={[
                                    {
                                        aspect: "เอกลักษณ์ของแบรนด์",
                                        template: "ใช้โครงสร้างสำเร็จรูป (Generic)",
                                        custom: "สร้างสรรค์ใหม่ทั้งหมด (Custom Design) เพื่อสะท้อนภาพลักษณ์และอัตลักษณ์ขององค์กรอย่างสมบูรณ์"
                                    },
                                    {
                                        aspect: "User Experience (UX)",
                                        template: "การใช้งานตามมาตรฐาน Template",
                                        custom: "วิเคราะห์และออกแบบ UX/UI เพื่อให้เหมาะสมกับพฤติกรรมลูกค้าเฉพาะกลุ่มของคุณโดยเฉพาะ เพิ่ม Conversion Rate"
                                    },
                                    {
                                        aspect: "การปรับแต่ง Workflow",
                                        template: "ฟังก์ชันที่ตายตัว",
                                        custom: "ออกแบบหน้าตาและ Workflow ของระบบหลังบ้าน (Admin/CMS) ให้ตรงกับกระบวนการทำงานขององค์กรคุณ 100%"
                                    }
                                ]}
                            />

                            {/* 2. Scalability & Reliability */}
                            <ComparisonTable
                                title="2. ความเสถียรและความสามารถในการขยายตัว (Scalability & Reliability)"
                                rows={[
                                    {
                                        aspect: "ความเร็ว/ประสิทธิภาพ",
                                        template: "ดี (แต่ไม่ Optimized 100%)",
                                        custom: "Optimized สูงสุด โดยผู้เชี่ยวชาญ Next.js เพื่อให้เว็บไซต์โหลดเร็วที่สุด แม้ในยามที่มีผู้เข้าชมพร้อมกันจำนวนมาก"
                                    },
                                    {
                                        aspect: "การรองรับการเติบโต",
                                        template: "จำกัด (อาจต้องเขียนใหม่เมื่อธุรกิจขยาย)",
                                        custom: "สถาปัตยกรรม (Architecture) รองรับการขยายตัว (Scalable) ในอนาคต เช่น เพิ่มตลาด, เพิ่มภาษา, หรือเชื่อมต่อระบบอื่น ๆ ได้ง่าย"
                                    },
                                    {
                                        aspect: "ความเสถียร",
                                        template: "ไม่มีการทดสอบโหลดหนัก",
                                        custom: "มีการทดสอบ Load Testing เพื่อรับประกันความเสถียรในช่วงแคมเปญใหญ่หรือ Peak Season"
                                    }
                                ]}
                            />

                            {/* 3. Integrated Systems & Security */}
                            <ComparisonTable
                                title="3. ระบบจัดการที่สมบูรณ์และปลอดภัย (Integrated Systems & Security)"
                                rows={[
                                    {
                                        aspect: "ระบบ Payment Gateway",
                                        template: "ลูกค้าต้องเชื่อมต่อเอง",
                                        custom: "เชื่อมต่อ Payment Gateway ระดับองค์กร อย่างมืออาชีพพร้อมการรับประกันความปลอดภัยของข้อมูลบัตร (PCI Compliance)"
                                    },
                                    {
                                        aspect: "ระบบหลังบ้าน (CMS)",
                                        template: "ไม่มี หรือใช้ระบบฟรีพื้นฐาน",
                                        custom: "ระบบจัดการออเดอร์, สต็อก, ลูกค้า, และรายงาน ที่สมบูรณ์แบบ ตอบโจทย์ทีมงานหลายแผนก (เช่น การออกใบกำกับภาษี, การจัดการโปรโมชั่นซับซ้อน)"
                                    },
                                    {
                                        aspect: "การเชื่อมต่อ API",
                                        template: "จำกัด/ไม่มี",
                                        custom: "เชื่อมต่อกับระบบภายในองค์กร (เช่น ERP, CRM, Inventory) ของลูกค้าได้อย่างราบรื่นและปลอดภัย"
                                    }
                                ]}
                            />

                            {/* 4. Risk Management & Warranty */}
                            <ComparisonTable
                                title="4. การบริหารความเสี่ยงและการรับประกัน (Risk Management & Warranty)"
                                rows={[
                                    {
                                        aspect: "การรับประกัน",
                                        template: "7 วัน (เฉพาะบั๊กโค้ด)",
                                        custom: "รับประกันโค้ด (Warranty) 3-6 เดือน พร้อม SLA (Service Level Agreement) ในการแก้ไขปัญหาเร่งด่วน"
                                    },
                                    {
                                        aspect: "ทีมงาน",
                                        template: "ผู้พัฒนาคนเดียว",
                                        custom: "ทีมงานมืออาชีพ (PM, Designer, Tester, Developer) ดูแลโครงการตั้งแต่ต้นจนจบ"
                                    },
                                    {
                                        aspect: "เอกสาร",
                                        template: "คู่มือติดตั้งพื้นฐาน",
                                        custom: "เอกสารทางเทคนิค (Technical Documentation) และคู่มือการใช้งานที่ครบถ้วน (User Manual)"
                                    }
                                ]}
                            />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            พร้อมยกระดับธุรกิจของคุณแล้วหรือยัง?
                        </h3>
                        <p className="text-gray-300 mb-8">
                            นัดหมายปรึกษาฟรี 30 นาที กับทีม Solution Architect ของเรา
                        </p>
                        <Link
                            href={ENTERPRISE_GROUP_DATA.ctaLink}
                            className="inline-flex items-center gap-2 px-12 py-5 text-xl font-extrabold rounded-full 
                                   bg-gradient-to-r from-emerald-500 to-blue-500 
                                   hover:from-emerald-600 hover:to-blue-600
                                   text-white shadow-2xl shadow-emerald-500/30
                                   transform hover:scale-110 transition-all duration-300
                                   ring-4 ring-emerald-400/50 hover:ring-blue-400/50"
                        >
                            {ENTERPRISE_GROUP_DATA.ctaText}
                        </Link>
                        <p className="mt-4 text-sm text-gray-400">
                            📞 หรือโทร: 065-541-9166 | 📧 Email: grids@microtronic.biz
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            อ่าน <a href="/terms" className="text-emerald-400 hover:underline">ข้อกำหนดและเงื่อนไขการให้บริการ</a> สำหรับ Enterprise
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ===== Enterprise Feature Card Component =====
interface EnterpriseFeatureCardProps {
    feature: EnterpriseFeature;
}

function EnterpriseFeatureCard({ feature }: EnterpriseFeatureCardProps) {
    return (
        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
            {/* Icon */}
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
            </div>

            {/* Title with ROI Badge */}
            <div className="flex items-start justify-between mb-3">
                <h4 className="text-2xl font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                    {feature.title}
                </h4>
            </div>

            {/* ROI Indicator */}
            <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full px-3 py-1 mb-4">
                <span className="text-sm font-bold text-emerald-300">{feature.roi}</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
            </p>
        </div>
    );
}
