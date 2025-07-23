// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect (อยู่ใน DOM แต่ไม่แสดงผล) */}
      <svg className="absolute w-0 h-0"> {/* ใช้ Tailwind classes แทน inline style */}
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container สำหรับ Gradients ที่เคลื่อนไหวทั้งหมด */}
      {/* inset-0 คือ top-0, right-0, bottom-0, left-0 ทำให้ครอบคลุมพื้นที่ parent */}
      {/* z-0 เพื่อให้อยู่ด้านหลังเนื้อหาหลักของเว็บ */}
      {/* filter: 'url(#goo)' ใช้ SVG filter กับลูกๆ ของ div นี้ */}
      <div className="absolute inset-0 z-0" style={{ filter: 'url(#goo)' }}>
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
        {/* ปรับสี 'from-...' และ 'to-transparent' ได้ตามต้องการ */}
        <div className="gradient-circle circle-1 bg-radial from-purple-600 to-transparent"></div>
        <div className="gradient-circle circle-2 bg-radial from-blue-600 to-transparent"></div>
        <div className="gradient-circle circle-3 bg-radial from-pink-600 to-transparent"></div>
        <div className="gradient-circle circle-4 bg-radial from-green-600 to-transparent"></div> {/* เพิ่มวงกลม */}
        <div className="gradient-circle circle-5 bg-radial from-orange-600 to-transparent"></div> {/* เพิ่มวงกลม */}
      </div>
    </>
  );
};

export default AnimatedBackground;
