import Link from 'next/link';

export default function BuddhaPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">Buddha Microtronic</h1>
      
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-200 pb-2">
          บทสวดทำวัตรเช้า (พร้อมคำแปล)
        </h2>
        
        {/* ส่วนที่ 1: คำบูชาพระรัตนตรัย */}
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">คำบูชาพระรัตนตรัย</h3>
          <p className="text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">โย โส ภะคะวา อะระหัง สัมมาสัมพุทโธ</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">ส๎วากขาโต เยนะ ภะคะวะตา ธัมโม,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">สุปะฏิปันโน ยัสสะ ภะคะวะโต สาวะกะสังโฆ,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">ตัมมะยัง ภะคะวันตัง สะธัมมัง สะสังฆัง, อิเมหิ สักกาเรหิ ยะถาระหัง อาโรปิเตหิ อะภิปูชะยามะ,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">สาธุ โน ภันเต ภะคะวา สุจิระปะรินิพพุโตปิ,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">ปัจฉิมาชะนะตานุกัมปะมานะสา,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">อิเม สักกาเร ทุคคะตะปัณณาการะภูเต ปะฏิคคัณหาตุ,</span>
          </p>

          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">อัมหากัง ทีฆะรัตตัง หิตายะ สุขายะ.</span>
          </p>

          <div className="mt-4 border-t-2 border-gray-200 pt-4">
            <p className="text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">อะระหัง สัมมาสัมพุทโธ ภะคะวา,</span>
              <span className="text-gray-600 block pl-4">พระผู้มีพระภาคเจ้า, เป็นพระอรหันต์, ดับเพลิงกิเลส เพลิงทุกข์สิ้นเชิง, ตรัสรู้ชอบได้โดยพระองค์เอง,</span>
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">พุทธัง ภะคะวันตัง อะภิวาเทมิ,</span>
              <span className="text-gray-600 block pl-4">ข้าพเจ้าอภิวาทพระผู้มีพระภาคเจ้า, ผู้รู้ ผู้ตื่น ผู้เบิกบาน,</span>
              <span className="text-red-500 font-medium">(กราบ)</span>
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">ส๎วากขาโต ภะคะวะตา ธัมโม,</span>
              <span className="text-gray-600 block pl-4">พระธรรม เป็นธรรมที่พระผู้มีพระภาคเจ้า, ตรัสไว้ดีแล้ว,</span>
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">ธัมมัง นะมัสสามิ</span>
              <span className="text-gray-600 block pl-4">ข้าพเจ้านมัสการพระธรรม (กราบ)</span>
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</span>
              <span className="text-gray-600 block pl-4">พระสงฆ์สาวกของพระผู้มีพระภาคเจ้า, ปฏิบัติดีแล้ว,</span>
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-bold text-lg block text-indigo-900">สังฆัง นะมามิ</span>
              <span className="text-gray-600 block pl-4">ข้าพเจ้านอบน้อมพระสงฆ์ (กราบ)</span>
            </p>
          </div>
        </section>

        {/* ส่วนที่ 2: ปุพพภาคนมการ */}
        <section className="mt-8 mb-6 border-t-2 border-indigo-200 pt-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">ปุพพภาคนมการ</h3>
          <p className="italic text-gray-500 mb-2">(หันทะ มะยัง พุทธัสสะ ภะคะวะโต ปุพพะภาคะนะมะการัง กะโรมะ เส)</p>
          <p className="text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">นะโม ตัสสะ ภะคะวะโต,</span>
            <span className="text-gray-600 block pl-4">ขอนอบน้อมแด่พระผู้มีพระภาคเจ้า, พระองค์นั้น,</span>
          </p>
          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">อะระหะโต,</span>
            <span className="text-gray-600 block pl-4">ซึ่งเป็นผู้ไกลจากกิเลส,</span>
          </p>
          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">สัมมาสัมพุทธัสสะ,</span>
            <span className="text-gray-600 block pl-4">ตรัสรู้ชอบได้โดยพระองค์เอง.</span>
          </p>
          <p className="mt-2 text-sm text-red-500 font-medium">(ว่า ๓ จบ)</p>
        </section>

        {/* ส่วนที่ 3: พุทธาภิถุติ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">พุทธาภิถุติ</h3>
          <p className="italic text-gray-500 mb-2">(หันทะ มะยัง พุทธาภิถุติง กะโรมะ เส)</p>
          <p className="text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">โย โส ตะถาคะโต,</span>
            <span className="text-gray-600 block pl-4">พระตถาคตเจ้านั้น พระองค์ใด,</span>
          </p>
          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg block text-indigo-900">อะระหัง,</span>
            <span className="text-gray-600 block pl-4">เป็นผู้ไกลจากกิเลส,</span>
          </p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link href="/buddha/basesOfMeritoriousAction" className="inline-block px-6 py-3 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors">
          ไปที่หน้า Bases of Meritorious Action
        </Link>
      </div>
    </div>
  );
}
