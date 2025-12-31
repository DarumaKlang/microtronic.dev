'use client';

import React, { useState, useMemo, useCallback } from 'react';
import ProductFilterGlass from '@/components/ProductFilterGlass';
import ProductGrid from '@/components/ProductGrid';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleCategoryChange = useCallback((categoryId: string) => {
        setSelectedCategory(categoryId);
    }, []);

    const filteredProducts: Product[] = useMemo(() => {
        const allProducts = productsData as Product[];
        if (selectedCategory === 'all') return allProducts;
        return allProducts.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />

            <main className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <header className="mb-12">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs font-bold uppercase tracking-[0.3em]">
                        Project Showcase v2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight">
                        PRODUCT CATALOG
                    </h1>
                    <p className="text-xl text-gray-400 font-medium">
                        ค้นหาโซลูชันที่เหมาะสมกับ <span className="text-white italic">Architecture</span> ของคุณ
                    </p>
                </header>

                {/* New Glass Filter Bar */}
                <ProductFilterGlass onCategoryChange={handleCategoryChange} />

                {/* Product Grid */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <ProductGrid products={filteredProducts} />
                </div>
            </main>
        </div>
    );
}