import Link from 'next/link';

export default function BuddhaPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">Astrology Microtronic</h1>
      <p className="text-lg text-gray-700 mb-6">หน้านี้จะเกี่ยวกับโหราศาสตร์</p>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">สารบัญ</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>
            <Link href="/astrology/thursday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันพฤหัส
            </Link>
          </li>
          <li>
            <Link href="/astrology/friday/time" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              ไปที่หน้า ยามวันศุกร์
            </Link>
          </li>
        </ul>
      </div>

      {/* เนื้อหาอื่นๆ ของหน้า */}
      <div className="mt-8">
        {/* อาจเพิ่มเนื้อหาเกี่ยวกับพุทธศาสนาได้ที่นี่ */}
        <h1> </h1>
      </div>
    </div>
  );
}