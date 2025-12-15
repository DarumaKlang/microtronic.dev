// components/ServicesSection.tsx
'use client';

import React, { useState } from 'react';
// นำเข้า Data, Type และ Class จาก Constants
import { SERVICES_DATA, ServiceDataMap, GLASS_PANEL_CLASS } from '@/constants/data';

// เราสามารถย้าย Logic การหา Keys มาไว้ที่นี่ได้เลย
const serviceKeys = Object.keys(SERVICES_DATA) as (keyof ServiceDataMap)[];

/**
 * ServicesSection Component: ส่วนแสดงบริการหลักที่มีระบบ Tabs
 * Component นี้เป็นแบบ Client Component เนื่องจากมีการใช้ useState
 */
const ServicesSection: React.FC = () => {
    // จัดการสถานะแท็บที่ถูกเลือก (ไม่ต้องรับ props services เข้ามาแล้ว)
    const [activeService, setActiveService] = useState<keyof ServiceDataMap>(serviceKeys[0] || 'nextjs');
    const currentService = SERVICES_DATA[activeService];

    return (
        <section id="services">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">บริการของเราที่สร้างผลกระทบ</h2>
            <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl`}>
                {/* Service Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {serviceKeys.map((key) => {
                        const isActive = activeService === key;
                        const buttonClass = isActive
                            ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/30'
                            : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-white/10';

                        return (
                            <button
                                key={key}
                                onClick={() => setActiveService(key)}
                                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${buttonClass}`}
                            >
                                {SERVICES_DATA[key].title}
                            </button>
                        );
                    })}
                </div>

                {/* Service Content Display */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[300px] animate-in fade-in duration-500">
                    <h3 className="text-4xl font-extrabold text-pink-400">{currentService.title}</h3>
                    <p className="text-xl font-semibold text-cyan-400 mb-4">{currentService.subtitle}</p>
                    <p className="text-gray-300 mb-6">{currentService.description}</p>

                    <h4 className="text-lg font-bold text-white mb-2">ประโยชน์หลัก:</h4>
                    <ul className="space-y-2 text-gray-400 list-inside">
                        {currentService.keyBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-green-400 text-lg">✓</span>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {currentService.link && (
                        <div className="mt-8">
                            <a
                                href={currentService.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-3 bg-linear-to-r from-pink-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                {currentService.linkText || 'Learn More'}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;