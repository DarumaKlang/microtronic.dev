// components/ProductSidebar.tsx
'use client';

import React, { useState } from 'react';
// ... (categories array เหมือนเดิม)
const categories = [
    { id: 'all', name: '📦 สินค้าทั้งหมด' },
    { id: 'websites', name: '🌐 เว็บไซต์' },
    { id: 'mobile-apps', name: '📱 แอปพลิเคชันมือถือ' },
    { id: 'backend-services', name: '⚙️ ระบบหลังบ้าน' },
    { id: 'consulting', name: '💡 บริการให้คำปรึกษา' },
];

interface ProductSidebarProps {
    onCategoryChange: (categoryId: string) => void;
}

export default function ProductSidebar({ onCategoryChange }: ProductSidebarProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    // State เพื่อจัดการการแสดง/ซ่อน Sidebar บนมือถือ
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const handleClick = (id: string) => {
        setActiveCategory(id);
        onCategoryChange(id);
        // ปิด Sidebar เมื่อเลือกหมวดหมู่บนมือถือ
        setIsSidebarOpen(false); 
    };

    return (
        <>
            {/* 🍔 ปุ่มสำหรับเปิด Sidebar บนมือถือ */}
            <button
                // (โค้ดสีคงเดิมตามที่คุณแก้ไข)
                className="lg:hidden fixed bottom-4 right-4 z-20 bg-blue-600 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? 'ปิดเมนู' : 'เลือกหมวดหมู่'}
            </button>

            {/* 🌫️ Overlay (สำหรับการทำงานบนมือถือ) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)} 
                />
            )}

            {/* ⬅️ Sidebar จริงๆ */}
            <aside 
                // 🎯 FIX: ลบ border-r และแทนที่ด้วย shadow-xl บนจอใหญ่
                className={`fixed top-0 left-0 max-h-screen w-64 p-4 bg-slate-800 z-20 transition-transform duration-300 ease-in-out 
                           lg:relative lg:translate-x-0 lg:shrink-0 lg:shadow-xl
                           ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
            >
                {/* 🎯 FIX: ลบ border-b ออกจาก h3 เพื่อความสอดคล้อง (ถ้าต้องการคงไว้ต้องเปลี่ยนเป็นสีอ่อน) */}
                <h3 className="text-lg font-bold mb-4 pb-2 text-white">เลือกหมวดหมู่</h3>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => handleClick(cat.id)}
                                className={`w-full text-left py-2 px-3 rounded-md transition duration-200 
                                    ${activeCategory === cat.id 
                                        ? 'bg-blue-600 text-white font-semibold' 
                                        : 'text-gray-200 hover:bg-gray-600'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}