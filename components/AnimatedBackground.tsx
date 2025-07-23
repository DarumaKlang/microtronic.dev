// src/components/AnimatedBackground.tsx
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    // เพิ่มสีพื้นหลังและ opacity เข้าไปใน div หลัก
    <div className="absolute inset-0 z-0 bg-blue-500 opacity-50"> {/* <-- เพิ่ม bg-blue-500 และ opacity-50 */}
      {/* ส่วนนี้จะยังว่างเปล่า */}
    </div>
  );
};

export default AnimatedBackground;
