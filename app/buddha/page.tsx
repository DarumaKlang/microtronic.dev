// src/app/buddha/page.tsx
import Link from 'next/link'; // Import Link

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Buddha Microtronic</h1>
      <p>หน้านี้จะเกี่ยวกับพุทธศาสนา และ คำสอนจากครูบาร์อาจารย์</p>
      {/* เพิ่มลิงก์ที่นี่ */}
      <div className="mt-4">
        <Link href="/buddha/basesOfMeritoriousAction" className="text-blue-500 hover:underline">
          ไปที่หน้า Bases of Meritorious Action
        </Link>
      </div>
      {/* เนื้อหาอื่นๆ */}
    </div>
  );
}
