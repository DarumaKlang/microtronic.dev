// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* SVG Filter สำหรับ Goo Effect */}
      {/* Absolute, w-0, h-0 เพื่อไม่ให้ SVG กินพื้นที่บนหน้าจอ */}
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Container หลักของ Background ที่มี Gradient Circles */}
      {/* absolute inset-0: ครอบคลุมพื้นที่เต็ม parent (body) */}
      {/* z-[-10]: สำคัญมาก! ต้องเป็นค่าลบเพื่อให้ AnimatedBackground อยู่ด้านหลังทุกอย่าง */}
      {/* bg-gradient-to-br from-blue-700 to-purple-800: กำหนดสีพื้นหลังเบื้องต้น (สามารถปรับเปลี่ยนได้ภายหลัง) */}
      {/* เพิ่ม style={{ filter: 'url(#goo)' }} ไปที่ container ที่ครอบ circles ทั้งหมด */}
      <div className="absolute inset-0 z-[-10] bg-gradient-to-br from-blue-700 to-purple-800" style={{ filter: 'url(#goo)' }}>
        {/*
          ส่วนของ Gradient Circles จะถูกเพิ่มเข้ามาในขั้นตอนถัดไป
          ตอนนี้ยังคงเป็น div ว่างเปล่า หรือถ้ามี div circles อยู่แล้ว
          แต่ไม่มี animation หรือ class อื่นๆ ก็สามารถคงไว้ได้
        */}
        {/* ตัวอย่าง div สำหรับวงกลม (ตอนนี้ยังไม่มี style หรือ animation) */}
        {/* class gradient-circle และ circle-x จะถูกกำหนดใน globals.css */}
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
