// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect - คอมเมนต์ออกไปก่อน */}
      {/* <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg> */}

      {/* Container สำหรับ Gradients ที่เคลื่อนไหว */}
      {/* คอมเมนต์ style={{ filter: 'url(#goo)' }} ออกไป */}
      <div className="absolute inset-0 z-0">
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
