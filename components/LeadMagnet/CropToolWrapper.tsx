// src/components/LeadMagnet/CropToolWrapper.tsx
'use client'; 

import React, { useState } from 'react';
// สมมติว่านี่คือ Component เครื่องมือ Crop Tool ที่คุณมีอยู่แล้ว
// (ไฟล์นี้ต้องมีอยู่จริง หรือถูกแทนที่ด้วย Component ที่ใช้งานได้จริง)
// import CropToolComponent from './CropToolComponent'; 

export default function CropToolWrapper() { 
    
    // State เพื่อควบคุมการแสดงเครื่องมือ
    const [isGated, setIsGated] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // 1. ส่ง Email ไปยัง Route Handler ที่สร้างไว้: /api/leads
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // 2. สำเร็จ: บันทึก Lead และเปิด Content
                setMessage('🥳 ขอบคุณครับ! เครื่องมือพร้อมใช้งานแล้ว');
                // ตั้งค่าใน Local Storage หรือ Cookie เพื่อจดจำผู้ใช้
                localStorage.setItem('lead_access_granted', 'true'); 
                setIsGated(false);
            } else {
                // 3. ข้อผิดพลาดจาก Server
                setMessage(`😞 ผิดพลาด: ${data.message || 'ไม่สามารถบันทึก Email ได้'}`);
            }
        } catch { // 4. ข้อผิดพลาดในการเชื่อมต่อ
            // เราไม่ได้ใช้ค่าของ error โดยตรง แต่ใช้แค่ตั้งค่าข้อความทั่วไป
            setMessage('🚫 การเชื่อมต่อล้มเหลว กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsLoading(false);
        }
    };

    if (isGated) {
        // แสดง Gated Form
        return (
            <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
                    🔓 ปลดล็อกเครื่องมือ Crop Tool ฟรี!
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    รับเครื่องมือฟรี และรับเทคนิคการทำ Web Performance ลับๆ ตรงถึง Inbox
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            required
                            placeholder="Email ของคุณ"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 text-white font-semibold rounded-lg transition-colors ${
                            isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'กำลังบันทึก...' : 'เริ่มใช้งานฟรีทันที'}
                    </button>
                    {message && (
                        <p className={`text-center text-sm ${message.startsWith('🥳') ? 'text-green-600' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        );
    }

    // แสดงเครื่องมือ Crop Tool จริงเมื่อ Lead ถูกบันทึกแล้ว
    return (
        <div className="mt-10">
            {/* **ต้องแทนที่ด้วย Component เครื่องมือ Crop Tool จริง** */}
            {/* <CropToolComponent /> */}
            <div className="text-center p-10 border-2 border-dashed border-green-300 bg-green-50 rounded-lg">
                <p className="font-bold text-lg text-green-700">Crop Tool Component (Placeholder)</p>
                <p className="text-gray-600">— ใส่โค้ดเครื่องมือ Crop Tool ของคุณที่นี่ —</p>
            </div>
        </div>
    );
}