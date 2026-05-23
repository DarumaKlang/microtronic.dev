'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import templatesData from '@/data/templates.json';

interface Template {
    id: string;
    name: string;
    category: string;
    price: number;
    preview_image: string;
    tags: string[];
    demo_url: string;
    buy_url: string;
}

const CATEGORIES = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'saas', label: 'SaaS' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'realestate', label: 'Real Estate' },
];

export default function TemplateGallery() {
    const [activeCategory, setActiveCategory] = useState('all');
    const templates = templatesData as Template[];

    const filtered = activeCategory === 'all'
        ? templates
        : templates.filter(t => t.category === activeCategory);

    return (
        <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-white/10" />
                <h2 className="text-xl font-black uppercase tracking-widest text-blue-400">
                    เลือก Template
                </h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                            activeCategory === cat.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(tpl => (
                    <div
                        key={tpl.id}
                        className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                    >
                        {/* Preview Image */}
                        <div className="relative w-full h-48 bg-slate-800 overflow-hidden flex-shrink-0">
                            <Image
                                src={tpl.preview_image}
                                alt={`Preview of ${tpl.name}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover object-top transition duration-500 group-hover:scale-105"
                                unoptimized
                            />
                            {/* Hover overlay with Preview button */}
                            <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                {tpl.demo_url && (
                                    <a
                                        href={tpl.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white text-slate-900 font-bold text-sm rounded-full hover:bg-blue-100 transition"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        Preview
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {tpl.name}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {tpl.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                    ฿{tpl.price.toLocaleString()}
                                </span>
                                <Link
                                    href={tpl.buy_url}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-500/20"
                                >
                                    สั่งซื้อ
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
