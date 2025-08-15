import Link from 'next/link';
import React from 'react';

export default function AstrologyPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">Astrology Microtronic</h1>
      <p className="text-lg text-gray-700 mb-6">หน้านี้จะเกี่ยวกับโหราศาสตร์</p>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">สารบัญฤกษ์ยาม</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>
            <Link href="/astrology/sunday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันอาทิตย์
            </Link>
          </li>
          <li>
            <Link href="/astrology/monday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันจันทร์
            </Link>
          </li>
          <li>
            <Link href="/astrology/tuesday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันอังคาร
            </Link>
          </li>
          <li>
            <Link href="/astrology/wednesday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันพุธ
            </Link>
          </li>
          <li>
            <Link href="/astrology/thursday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันพฤหัสบดี
            </Link>
          </li>
          <li>
            <Link href="/astrology/friday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันศุกร์
            </Link>
          </li>
          <li>
            <Link href="/astrology/saturday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันเสาร์
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <h1> </h1>
      </div>
    </div>
  );
}
