'use client';

import React, { useState, useMemo, useCallback } from 'react';
import ProductSidebar from '@/components/ProductSidebar';
// import ProductTable from '@/components/ProductTable';
import ProductGrid from '@/components/ProductGrid';
import productsData from '@/data/products.json'; // Import ข้อมูลสินค้าที่สร้างไว้ก่อนหน้า
import { Product } from '@/types/product'; // ⬅️ นำเข้า Product Interface

// เนื่องจาก Next.js App Router อนุญาตให้เรา Fetch/Import Data ได้โดยตรง
// แต่เนื่องจากเราต้องการ State เพื่อ Filter เราจึงใช้ 'use client' ที่นี่

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 1. Function สำหรับจัดการการเปลี่ยนแปลงหมวดหมู่จาก Sidebar
    const handleCategoryChange = useCallback((categoryId: string) => {
        setSelectedCategory(categoryId);
    }, []);

    // 2. ใช้ useMemo ในการกรองข้อมูลสินค้า (Filtering Logic)
    const filteredProducts: Product[] = useMemo(() => {
        const allProducts = productsData as Product[];
        
        if (selectedCategory === 'all') {
            return allProducts;
        }
        
        // กรองตามหมวดหมู่ (ใช้ชื่อหมวดหมู่ที่ตรงกับ ID ใน Sidebar)
        // NOTE: ต้องมั่นใจว่า Product.category ตรงกับ category ID ใน ProductSidebar.tsx
        return allProducts;
    }, [selectedCategory]);

    return (
        <div className="flex flex-col mt-20 lg:flex-row min-h-screen bg-slate-900 relative"> 
            
            <ProductSidebar onCategoryChange={handleCategoryChange} />
            
            <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
                <h1 className="text-2xl lg:text-3xl font-extrabold mb-6">แคตตาล็อกสินค้าและบริการ</h1>
                
                <div className="p-0">
                    {/* 🎯 เรียกใช้ ProductGrid แทน ProductTable */}
                    <ProductGrid products={filteredProducts} />
                </div>
            </main>
        </div>
    );
}