// src/app/astrologythursday/time/page.tsx
import React from 'react';

const ThursdayAuspiciousTimes = () => {
  // ข้อมูลฤกษ์ยามวันพฤหัสบดี
  const dayTimes = [
    { time: '06.01 น. - 07.30 น.', auspicious: 'ยามบริวาร ยามครู (๕) : ๕-๕ คู่เรียนรู้ คู่สอนสั่ง คู่มานะทิฐิ คู่บวชเรียน ลาออกจากงาน' },
    { time: '07.31 น. - 09.00 น.', auspicious: 'ยามอุตสาหะ ยามภูมะ (๓) : ๓-๕ คู่สมพล ได้ผลทางการงาน' },
    { time: '09.01 น. - 10.30 น.', auspicious: 'ยามศรี ยามสุริยะ (๑) : ๑-๕ คู่มิตร (ศิษย์ อาจารย์) ให้ผลด้านคู่ครอง คนช่วยเหลือ' },
    { time: '10.31 น. - 12.00 น.', auspicious: 'ยามเดช ยามศุกระ (๖) : ๖-๕ คู่สุภาพราบรื่น' },
    { time: '12.01 น. - 13.30 น.', auspicious: 'ยามมนตรี ยามพุทธะ (๔) : ๔-๕ คู่วิชาการ' },
    { time: '13.31 น. - 15.00 น.', auspicious: 'ยามมูละ ยามจันเทา (๒) : ๒-๕ คู่ธาตุดิน ทรัพย์สินมั่นคง กระทบกระทั่งเล็กน้อย (ถ้ารถยนต์ = ชน) ความหมายทางเสีย คือ งอล' },
    { time: '15.01 น. - 16.30 น.', auspicious: 'ยามกาลกิณี ยามเสารี (๗) : ๗-๕ คู่พระ คู่ โจร (มีคุณธรรม มีพวกยอะ) คิดการไกล มักมีปัญหาที่ขา' },
    { time: '16.31 น. - 18.00 น.', auspicious: 'ยามบริวารและยามอายุ ยามครู (๕) : ๕-๕ คู่เรียนรู้ คู่สอนสั่ง คู่มานะทิฐิ คู่บวชเรียน ลาออกจากงาน' },
  ];

  const nightTimes = [
    { time: '18.01 น. - 19.30 น.', auspicious: 'ยามบริวารและยามอายุ' },
    { time: '19.31 น. - 22.30 น.', auspicious: 'ยามเดช' },
    { time: '22.31 น. - 24.00 น.', auspicious: 'ยามอุตสาหะ' },
    { time: '24.01 น. - 01.30 น.', auspicious: 'ยามกาลกิณี' },
    { time: '01.31 น. - 03.00 น.', auspicious: 'ยามมนตรี' },
    { time: '03.01 น. - 04.30 น.', auspicious: 'ยามศรี' },
    { time: '04.31 น. - 06.00 น.', auspicious: 'ยามบริวารและยามอายุ' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ฤกษ์ยามวันพฤหัสบดี</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ฤกษ์ยาม (เวลากลางวัน)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dayTimes.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-bold text-lg">{item.time}</p>
              <p className="text-gray-600">{item.auspicious}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">ฤกษ์ยาม (เวลากลางคืน)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nightTimes.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-bold text-lg">{item.time}</p>
              <p className="text-gray-600">{item.auspicious}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThursdayAuspiciousTimes;
