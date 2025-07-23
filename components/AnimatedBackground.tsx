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
      {/* z-index: -10 เพื่อให้แน่ใจว่าอยู่ด้านหลังสุดของทุกสิ่ง */}
      <div className="absolute inset-0 z-[-10]" style={{ filter: 'url(#goo)' }}> {/* <-- แก้ไข z-0 เป็น z-[-10] */}
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
