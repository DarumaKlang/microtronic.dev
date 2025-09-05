// src/components/ServiceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ServiceCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    // เพิ่ม prop ใหม่เพื่อควบคุมการสลับฝั่ง
    reverse?: boolean; // ทำให้เป็น optional
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    imageSrc,
    imageAlt,
    title,
    description,
    linkText,
    linkHref,
    reverse = false, // กำหนดค่า default เป็น false (ไม่สลับฝั่ง)
}) => {
    return (
        // ใช้ class 'md:flex-row-reverse' เมื่อ reverse เป็น true
        <div
            className={`flex flex-col items-center justify-center p-8 rounded-lg shadow-md max-w-7xl mx-auto 
                  ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 p-4 flex justify-center items-center">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Background circle effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 opacity-50 rounded-full blur-3xl w-full h-full -z-10" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    {description}
                </p>

                <Link
                    href={linkHref}
                    className="inline-block px-6 py-3 border border-white text-white font-medium rounded-full transition-colors hover:bg-white hover:text-fuchsia-800"
                >
                    {linkText}
                </Link>
            </div>
        </div>
    );
};