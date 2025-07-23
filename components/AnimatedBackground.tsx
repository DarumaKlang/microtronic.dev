// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect */}
      {/* ตั้งค่า style ให้มันไม่กินพื้นที่หน้าจอ */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container สำหรับ Gradients ที่เคลื่อนไหว */}
      {/* z-0 เพื่อให้อยู่ด้านหลังสุด */}
      <div className="absolute inset-0 z-0" style={{ filter: 'url(#goo)' }}>
        {/* วงกลม Gradient เคลื่อนไหวหลายๆ วง */}
        {/* คุณสามารถปรับสีจาก from-color หรือ to-transparent ได้ที่นี่ */}
        <div className="gradient-circle circle-1 bg-radial from-purple-600 to-transparent"></div>
        <div className="gradient-circle circle-2 bg-radial from-blue-600 to-transparent"></div>
        <div className="gradient-circle circle-3 bg-radial from-pink-600 to-transparent"></div>
        {/* เพิ่มวงกลมได้ตามต้องการ */}
      </div>
    </>
  );
};

export default AnimatedBackground;
