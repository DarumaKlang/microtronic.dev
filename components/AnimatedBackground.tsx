// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect */}
      {/* Absolute, w-0, h-0 เพื่อไม่ให้ SVG กินพื้นที่บนหน้าจอ */}
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container หลักของ Background ที่มี Gradient Circles */}
      {/* absolute inset-0: ครอบคลุมพื้นที่เต็ม parent (body) */}
      {/* Z-INDEX: ใช้ค่าลบที่ต่ำกว่าเดิม (เช่น -50 หรือ -99) เพื่อให้แน่ใจว่าอยู่ด้านหลังทุกอย่าง */}
      {/* bg-gradient-to-br from-blue-700 to-purple-800: กำหนดสีพื้นหลังเบื้องต้น */}
      {/* style={{ filter: 'url(#goo)' }}: ใช้ filter กับ container นี้ */}
      <div className="absolute inset-0 z-[-50] bg-gradient-to-br from-blue-700 to-purple-800" style={{ filter: 'url(#goo)' }}> {/* <-- แก้ไขบรรทัดนี้: เปลี่ยน z-[-10] เป็น z-[-50] */}
        {/*
          ส่วนของ Gradient Circles จะถูกเพิ่มเข้ามาในขั้นตอนถัดไป
          ตอนนี้ยังคงเป็น div ว่างเปล่า หรือถ้ามี div circles อยู่แล้ว
          แต่ไม่มี animation หรือ class อื่นๆ ก็สามารถคงไว้ได้
        */}
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="gradient-circle circle-4"></div>
        <div className="gradient-circle circle-5"></div>
      </div>
    </>
  );
};

export default AnimatedBackground;
