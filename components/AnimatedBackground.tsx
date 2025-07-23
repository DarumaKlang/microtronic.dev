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
      {/* ลบ style={{ filter: 'url(#goo)' }} ออกจาก div นี้ */}
      <div className="absolute inset-0 z-0"> {/* <-- แก้ไขบรรทัดนี้: ลบ style ออก */}
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
        {/* เพิ่ม style={{ filter: 'url(#goo)' }} เข้าไปในแต่ละวงกลมแทน หรืออาจจะเพิ่มใน globals.css */}
        <div className="gradient-circle circle-1" style={{ filter: 'url(#goo)' }}></div> {/* <-- เพิ่ม style */}
        <div className="gradient-circle circle-2" style={{ filter: 'url(#goo)' }}></div> {/* <-- เพิ่ม style */}
        <div className="gradient-circle circle-3" style={{ filter: 'url(#goo)' }}></div> {/* <-- เพิ่ม style */}
        <div className="gradient-circle circle-4" style={{ filter: 'url(#goo)' }}></div> {/* <-- เพิ่ม style */}
        <div className="gradient-circle circle-5" style={{ filter: 'url(#goo)' }}></div> {/* <-- เพิ่ม style */}
      </div>
    </>
  );
};

export default AnimatedBackground;
