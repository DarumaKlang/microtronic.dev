// src/app/buddha/basesOfMeritoriousAction/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Buddha Microtronic</h1>
      <p className="text-lg text-gray-700 mb-8">
        หน้านี้จะเกี่ยวกับพุทธศาสนา และ คำสอนจากครูบาร์อาจารย์
      </p>

      {/* เนื้อหา บุญกิริยาวัตถุ 10 */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">
          บุญกิริยาวัตถุ 10
        </h2>
        <p className="text-gray-800 mb-4">
          คือ หลักธรรมคำสอนทางพระพุทธศาสนาที่ว่าด้วยหนทางแห่งการทำความดี 10 ประการ เพื่อนำไปสู่ความสุขและความเจริญในชีวิต
          เป็นการสร้างบุญ สร้างกุศล และพัฒนาจิตใจให้สูงขึ้น
        </p>

        <ul className="space-y-4">
          {/* ทานมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              1. ทานมัย (<span className="font-normal text-blue-600">การให้ทาน</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การให้ การเสียสละ หรือการเผื่อแผ่แบ่งปันสิ่งของ ทรัพย์สิน หรือความช่วยเหลือแก่ผู้อื่น
            </p>
          </li>

          {/* สีลมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              2. สีลมัย (<span className="font-normal text-blue-600">การรักษาศีล</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การงดเว้นจากความชั่วทางกาย วาจา และใจ ตามที่พระพุทธศาสนากำหนดไว้ เช่น ศีล 5 ศีล 8
            </p>
          </li>
          
          {/* ภาวนามัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              3. ภาวนามัย (<span className="font-normal text-blue-600">การเจริญภาวนา</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การฝึกอบรมจิตใจให้สงบจากกิเลสและความฟุ้งซ่าน ด้วยการทำสมาธิและเจริญปัญญา
            </p>
          </li>

          {/* อปจายนมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              4. อปจายนมัย (<span className="font-normal text-blue-600">การอ่อนน้อมถ่อมตน</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การแสดงความเคารพและถ่อมตนต่อผู้ที่มีอาวุโสกว่า หรือผู้ที่มีคุณธรรมสูงกว่า
            </p>
          </li>

          {/* ไวยยาวัจจมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              5. ไวยยาวัจจมัย (<span className="font-normal text-blue-600">การขวนขวายในการทำความดี</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การขวนขวายช่วยเหลือผู้อื่นในการทำความดี หรือการบำเพ็ญประโยชน์ส่วนรวม
            </p>
          </li>

          {/* ปัตติทานมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              6. ปัตติทานมัย (<span className="font-normal text-blue-600">การอุทิศส่วนบุญ</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การแบ่งบุญกุศลที่ตนได้กระทำแล้ว ให้แก่ผู้อื่น
            </p>
          </li>

          {/* ปัตตานุโมทนามัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              7. ปัตตานุโมทนามัย (<span className="font-normal text-blue-600">การอนุโมทนาบุญ</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การยินดีในบุญกุศลที่ผู้อื่นได้กระทำแล้ว
            </p>
          </li>
          
          {/* ธัมมัสสวนมัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              8. ธัมมัสสวนมัย (<span className="font-normal text-blue-600">การฟังธรรม</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การฟังคำสอนของพระพุทธเจ้า หรือคำสอนทางศาสนา เพื่อนำมาประพฤติปฏิบัติ
            </p>
          </li>

          {/* ธัมมเทสนามัย */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              9. ธัมมเทสนามัย (<span className="font-normal text-blue-600">การแสดงธรรม</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การแสดงธรรม หรือการเผยแพร่คำสอนของพระพุทธเจ้า เพื่อให้ผู้อื่นได้เข้าใจและนำไปปฏิบัติ
            </p>
          </li>

          {/* ทิฏฐุชุกัมม์ */}
          <li className="p-4 bg-gray-50 rounded-md shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">
              10. ทิฏฐุชุกัมม์ (<span className="font-normal text-blue-600">การทำความเห็นให้ถูกต้อง</span>)
            </h3>
            <p className="mt-1 text-gray-600">
              การทำความเห็นให้ถูกต้องตามหลักธรรมคำสอนของพระพุทธเจ้า เช่น การเห็นว่าทำดีได้ดี ทำชั่วได้ชั่ว
            </p>
          </li>
        </ul>

        <p className="mt-6 text-gray-800">
          การทำบุญกิริยาวัตถุ 10 ประการนี้ เป็นหนทางในการสร้างความดีงามทั้งแก่ตนเองและผู้อื่น
          เป็นการพัฒนาจิตใจให้สูงขึ้น และนำไปสู่ความสุขและความเจริญในชีวิตอย่างแท้จริง
        </p>
      </div>

    </div>
  );
}
