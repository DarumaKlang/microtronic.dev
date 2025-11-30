// components/ServiceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// New props interface matching the user's uploaded page.tsx usage
export interface ServiceCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    reverse?: boolean; // reverse เป็น optional
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    imageSrc,
    imageAlt,
    title,
    description,
    linkText,
    linkHref,
    reverse = false,
}) => {
    const flexOrder = reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row';

    return (
        <div className="w-full max-w-7xl px-4">
            <div className={`flex ${flexOrder} items-center gap-8 md:gap-12 bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-xl border border-white/20 shadow-2xl transition-all duration-500 hover:shadow-cyan-400/50`}>
                
                {/* ส่วนรูปภาพ */}
                <div className="w-full md:w-1/2 flex-shrink-0 relative aspect-[4/3]">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                </div>

                {/* ส่วนเนื้อหา */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold mb-4 text-cyan-400">{title}</h3>
                    <p className="text-gray-300 text-lg mb-6">{description}</p>
                    
                    <Link 
                        href={linkHref} 
                        className="px-6 py-2 text-md font-semibold rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-300 transform hover:scale-[1.05]"
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </div>
    );
};