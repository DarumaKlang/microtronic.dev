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
      {/* ปรับ z-index จาก z-0 เป็น z-[-10] อีกครั้ง */}
      <div className="absolute inset-0 z-[-10]"> {/* <-- แก้ไขบรรทัดนี้: เปลี่ยน z-0 เป็น z-[-10] */}
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
        <div className="gradient-circle circle-1" style={{ filter: 'url(#goo)' }}></div>
        <div className="gradient-circle circle-2" style={{ filter: 'url(#goo)' }}></div>
        <div className="gradient-circle circle-3" style={{ filter: 'url(#goo)' }}></div>
        <div className="gradient-circle circle-4" style={{ filter: 'url(#goo)' }}></div>
        <div className="gradient-circle circle-5" style={{ filter: 'url(#goo)' }}></div>
      </div>
    </>
  );
};

export default AnimatedBackground;
