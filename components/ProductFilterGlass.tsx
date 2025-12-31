'use client';

import React, { useState } from 'react';
import { LayoutGrid, Cloud, Utensils, Cpu, Globe, Smartphone, Filter } from 'lucide-react';

const categories = [
    { id: 'all', name: 'All Products', icon: LayoutGrid },
    { id: 'saas', name: 'Cloud SaaS', icon: Cloud },
    { id: 'restaurant', name: 'Restaurant', icon: Utensils },
    { id: 'iot', name: 'IoT & Tech', icon: Cpu },
    { id: 'websites', name: 'Websites', icon: Globe },
    { id: 'mobile-apps', name: 'Mobile Apps', icon: Smartphone },
];

interface ProductFilterGlassProps {
    onCategoryChange: (categoryId: string) => void;
}

export default function ProductFilterGlass({ onCategoryChange }: ProductFilterGlassProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const handleClick = (id: string) => {
        setActiveCategory(id);
        onCategoryChange(id);
    };

    return (
        <div className="w-full mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-full">
                {/* Mode Indicator */}
                <div className="flex items-center gap-3 px-6 py-3 border-r border-white/10 hidden md:flex">
                    <Filter className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filter Engine</span>
                </div>

                {/* Categories List */}
                <div className="flex-1 overflow-x-auto no-scrollbar py-2 md:py-0">
                    <div className="flex items-center gap-2 px-4 whitespace-nowrap">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleClick(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold translate-y-[-2px]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-125 ${isActive ? 'scale-110' : ''}`} />
                                    <span className="text-sm">{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Status Badge */}
                <div className="px-6 py-3 border-l border-white/10 hidden lg:flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-500">SYSTEM_READY</span>
                </div>
            </div>
        </div>
    );
}
