'use client';

import React from 'react';
import Link from 'next/link';
import { PACKAGE_COMBOS, PackageCombo } from '@/constants/data';

/**
 * PackageComboSection - Component สำหรับแสดงเซ็ตคอมโบสุดคุ้ม
 * แสดง 3 packages: Starter, Business, Premium
 */
export default function PackageComboSection() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                        🛍️ เซ็ตคอมโบสุดคุ้ม
                    </h3>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        จ่ายทีเดียวจบ! ประหยัดมากกว่าซื้อแยก พร้อมบริการครบวงจร
                    </p>
                </div>

                {/* Package Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {PACKAGE_COMBOS.map((pkg) => (
                        <PackageCard key={pkg.id} package={pkg} />
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center text-sm text-gray-400 mt-8">
                    <p>💳 รับชำระผ่าน โอนเงิน / Promptpay / บัตรเครดิต</p>
                    <p className="mt-2">📞 สอบถามเพิ่มเติม: <a href="/contact" className="text-pink-400 hover:underline">ติดต่อเรา</a></p>
                </div>
            </div>
        </section>
    );
}

// ===== Package Card Component =====
interface PackageCardProps {
    package: PackageCombo;
}

function PackageCard({ package: pkg }: PackageCardProps) {
    const isRecommended = pkg.recommended;

    return (
        <div className={`
            relative group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border 
            ${isRecommended ? 'border-pink-500 ring-2 ring-pink-500/50' : 'border-white/10 hover:border-pink-500/50'}
            transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20
        `}>
            {/* Recommended Badge */}
            {isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-linear-to-r from-pink-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ แนะนำ
                    </div>
                </div>
            )}

            {/* Icon & Name */}
            <div className="text-center mb-4">
                <div className="text-5xl mb-2">{pkg.icon}</div>
                <h4 className="text-2xl font-bold text-pink-300">{pkg.name}</h4>
                <p className="text-sm text-cyan-400 font-semibold">{pkg.tagline}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-gray-500 line-through text-lg">
                        ฿{pkg.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold">
                        ประหยัด ฿{pkg.savings.toLocaleString()}
                    </span>
                </div>
                <div className="text-4xl font-extrabold text-white">
                    ฿{pkg.price.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    {pkg.id === 'premium' ? 'ชำระครั้งเดียว / ปี' : 'ชำระครั้งเดียว'}
                </p>
            </div>

            {/* Target Customer */}
            <div className="bg-white/5 rounded-lg p-3 mb-4 border border-pink-500/20">
                <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="font-semibold text-pink-400">เหมาะสำหรับ:</span> {pkg.targetCustomer}
                </p>
            </div>

            {/* What's Included - Collapsible */}
            <details className="mb-4 group/details">
                <summary className="cursor-pointer text-sm font-semibold text-white hover:text-pink-400 transition-colors flex items-center gap-2">
                    <span className="group-open/details:rotate-90 transition-transform">▶</span>
                    รายการในแพ็คเกจ ({pkg.includes.length} รายการ)
                </summary>
                <div className="mt-3 space-y-2 pl-4">
                    {pkg.includes.map((include, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-gray-300">{include.item}</span>
                                <span className="text-pink-400 ml-2">฿{include.value.toLocaleString()}</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-0.5">{include.description}</p>
                        </div>
                    ))}
                </div>
            </details>

            {/* Features List */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-white mb-2">สิ่งที่คุณจะได้รับ:</p>
                <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5 flex-shrink-0">{feature.includes('✅') ? '' : '✓'}</span>
                            <span>{feature.replace('✅ ', '')}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Button */}
            <Link
                href={pkg.ctaLink}
                className={`
                    block text-center px-6 py-3 rounded-lg font-bold text-white
                    transition-all duration-300 shadow-lg
                    ${isRecommended
                        ? 'bg-linear-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 hover:shadow-pink-500/50'
                        : 'bg-linear-to-r from-pink-600/80 to-cyan-600/80 hover:from-pink-600 hover:to-cyan-600'}
                `}
            >
                {pkg.ctaText}
            </Link>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>
    );
}
