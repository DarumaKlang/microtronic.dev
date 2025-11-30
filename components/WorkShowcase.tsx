// components/WorkShowcase.tsx
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export interface WorkExample {
    src: string;
    alt: string;
}

export interface WorkShowcaseProps {
    title: string;
    description: string;
    works: WorkExample[]; // ใช้ 'works' ตาม page.tsx
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ title, description, works }) => {
    return (
        <div className="p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
            <header className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-cyan-400">{title}</h3>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">{description}</p>
            </header>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {works.map((work, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-[1.05] border border-white/10">
                        <Image
                            src={work.src}
                            alt={work.alt}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                            sizes="(max-width: 768px) 50vw, 16.6vw"
                        />
                        <div className="absolute inset-0 bg-gray-900/70 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <span className="text-white text-sm text-center font-semibold">{work.alt}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link 
                    href="/portfolio" 
                    className="px-6 py-2 text-md font-semibold rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors duration-300"
                >
                    ดูผลงานทั้งหมด
                </Link>
            </div>
        </div>
    );
};