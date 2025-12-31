'use client';

import React from 'react';
import Link from 'next/link';
import { TEMPLATE_GROUP_DATA, TEMPLATES_SHOWCASE, Template } from '@/constants/data';
import { GLASS_PANEL_CLASS } from '@/constants/data';
import PackageComboSection from '@/components/PackageComboSection';

/**
 * TemplateGroupSection - Component สำหรับแสดง Group I: Templates & Starter Kits
 * เน้นความคุ้มค่า ความรวดเร็ว และ Self-Service
 */
export default function TemplateGroupSection() {
    return (
        <section id="templates" className="relative py-20 px-4">
            {/* Background Gradient - Group I (Pink/Cyan Theme) */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30 -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400">
                        {TEMPLATE_GROUP_DATA.headline}
                    </h2>
                    <p className="text-2xl sm:text-3xl font-semibold text-pink-300 mb-6">
                        {TEMPLATE_GROUP_DATA.subheadline}
                    </p>
                    <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {TEMPLATE_GROUP_DATA.description}
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl mb-12`}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        ทำไมต้องเลือก Templates จาก Microtronic?
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TEMPLATE_GROUP_DATA.benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 hover:bg-white/10"
                            >
                                <span className="text-2xl">{benefit.split(' ')[0]}</span>
                                <p className="text-gray-200 font-medium">{benefit.substring(benefit.indexOf(' ') + 1)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Template Showcase Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {TEMPLATES_SHOWCASE.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>

                {/* Package Combo Section */}
                <PackageComboSection />

                {/* Main CTA Button */}
                <div className="text-center mt-12">
                    <Link
                        href={TEMPLATE_GROUP_DATA.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-12 py-5 text-xl font-extrabold rounded-full 
                                   bg-gradient-to-r from-pink-500 to-cyan-500 
                                   hover:from-pink-600 hover:to-cyan-600
                                   text-white shadow-2xl shadow-pink-500/30
                                   transform hover:scale-110 transition-all duration-300
                                   ring-4 ring-pink-400/50 hover:ring-cyan-400/50"
                    >
                        {TEMPLATE_GROUP_DATA.ctaText}
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">
                        ✅ ซื้อง่าย ดาวน์โหลดทันที | 💳 ปลอดภัยด้วย Payment Gateway มาตรฐาน
                    </p>
                </div>
            </div>
        </section>
    );
}

// ===== Template Card Component =====
interface TemplateCardProps {
    template: Template;
}

function TemplateCard({ template }: TemplateCardProps) {
    return (
        <div
            itemScope
            itemType="https://schema.org/Product"
            className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20"
        >
            {/* Metadata for AI */}
            <meta itemProp="brand" content="Microtronic Dev" />
            <meta itemProp="sku" content={template.id} />

            {/* Preview Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-xl mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">🎨</div>
                </div>
                {/* Badge / Price */}
                <div
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                    className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold"
                >
                    <meta itemProp="priceCurrency" content={template.currency} />
                    <span itemProp="price" content={template.price.toString()}>
                        {template.currency === 'THB' ? '฿' : '$'}{template.price.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Content */}
            <h4 itemProp="name" className="text-2xl font-bold text-pink-300 mb-2 group-hover:text-pink-200 transition-colors">
                {template.name}
            </h4>
            <p className="text-sm text-cyan-400 font-semibold mb-3">
                {template.tagline}
            </p>
            <p itemProp="description" className="text-gray-300 text-sm mb-4 leading-relaxed">
                {template.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
                {template.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex gap-3">
                {template.demoLink && (
                    <a
                        itemProp="url"
                        href={template.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 rounded-lg border border-pink-500/50 text-pink-300 hover:bg-pink-500/10 transition-colors text-sm font-semibold"
                    >
                        ดูตัวอย่าง
                    </a>
                )}
                <a
                    href={template.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500 text-white hover:from-pink-600 hover:to-cyan-600 transition-all text-sm font-bold shadow-lg"
                >
                    ซื้อเลย
                </a>
            </div>
        </div>
    );
}
