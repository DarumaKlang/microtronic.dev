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

      {/* Container สำหรับ Gradients ที่เคลื่อนไหวทั้งหมด (ยังคงมีสีน้ำเงินและ opacity เพื่อทดสอบ) */}
      <div className="absolute inset-0 z-0 bg-blue-500 opacity-50">
        {/* ส่วนนี้จะยังว่างเปล่า รอการเพิ่มวงกลม Gradient ในขั้นตอนถัดไป */}
      </div>
    </>
  );
};

export default AnimatedBackground;
