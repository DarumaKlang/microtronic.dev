// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect */}
      {/* className="absolute w-0 h-0": ทำให้ SVG element ไม่กินพื้นที่บนหน้าจอ */}
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container สำหรับ Gradients ที่เคลื่อนไหวทั้งหมด */}
      {/* absolute inset-0: ทำให้ div นี้ครอบคลุม parent (body) เต็มพื้นที่ */}
      {/* z-0: ทำให้ div นี้อยู่ด้านหลังเนื้อหาหลัก */}
      {/* style={{ filter: 'url(#goo)' }}: เรียกใช้ SVG filter ที่เรากำหนดไว้ */}
      <div className="absolute inset-0 z-0" style={{ filter: 'url(#goo)' }}>
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
        {/* bg-radial from-[color] to-transparent: สร้าง Radial Gradient ด้วย Tailwind CSS */}
        <div className="gradient-circle circle-1 bg-radial from-purple-600 to-transparent"></div>
        <div className="gradient-circle circle-2 bg-radial from-blue-600 to-transparent"></div>
        <div className="gradient-circle circle-3 bg-radial from-pink-600 to-transparent"></div>
        <div className="gradient-circle circle-4 bg-radial from-green-600 to-transparent"></div>
        <div className="gradient-circle circle-5 bg-radial from-orange-600 to-transparent"></div>
      </div>
    </>
  );
};

export default AnimatedBackground;
