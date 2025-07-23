// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect */}
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container หลักของ Background ที่มี Gradient Circles */}
      {/* absolute inset-0: ครอบคลุมพื้นที่เต็ม parent (body) */}
      {/* Z-INDEX: ใช้ค่าลบที่ต่ำที่สุด เพื่อให้แน่ใจว่าอยู่ด้านหลังทุกอย่าง */}
      {/* bg-gradient-to-br from-blue-700 to-purple-800: กำหนดสีพื้นหลังเบื้องต้น */}
      {/* style={{ filter: 'url(#goo)' }}: ใช้ filter กับ container นี้ */}
      <div className="absolute inset-0 z-[-50] bg-gradient-to-br from-blue-700 to-purple-800" style={{ filter: 'url(#goo)' }}>
        {/*
          ส่วนของ Gradient Circles (ตอนนี้ยังไม่มี style หรือ animation ใน globals.css)
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
