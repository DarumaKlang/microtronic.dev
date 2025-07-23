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

      {/* Container สำหรับ Gradients ที่เคลื่อนไหวทั้งหมด */}
      {/* ลบ bg-blue-500 และ opacity-50 ออก และเพิ่ม style={{ filter: 'url(#goo)' }} เพื่อเรียกใช้ filter */}
      <div className="absolute inset-0 z-0" style={{ filter: 'url(#goo)' }}> {/* <-- แก้ไขบรรทัดนี้ */}
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
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
