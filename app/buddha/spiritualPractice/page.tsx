import Link from 'next/link';

export default function BuddhaPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">Buddha Microtronic</h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-200 pb-2">
          บทสวดทำวัตรเช้า
        </h2>

        {/* ส่วนที่ 1: คำบูชาพระรัตนตรัย */}
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">คำบูชาพระรัตนตรัย</h3>
          <p className="font-bold text-lg mb-2 text-indigo-900">โย โส ภะคะวา อะระหัง สัมมาสัมพุทโธ</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">ส๎วากขาโต เยนะ ภะคะวะตา ธัมโม,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">สุปะฏิปันโน ยัสสะ ภะคะวะโต สาวะกะสังโฆ,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">ตัมมะยัง ภะคะวันตัง สะธัมมัง สะสังฆัง, อิเมหิ สักกาเรหิ ยะถาระหัง อาโรปิเตหิ อะภิปูชะยามะ,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">สาธุ โน ภันเต ภะคะวา สุจิระปะรินิพพุโตปิ,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">ปัจฉิมาชะนะตานุกัมปะมานะสา,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">อิเม สักกาเร ทุคคะตะปัณณาการะภูเต ปะฏิคคัณหาตุ,</p>
          <p className="font-bold text-lg text-indigo-900">อัมหากัง ทีฆะรัตตัง หิตายะ สุขายะ.</p>

          <div className="mt-4 border-t-2 border-gray-200 pt-4">
            <p className="font-bold text-lg mb-2 text-indigo-900">อะระหัง สัมมาสัมพุทโธ ภะคะวา,</p>
            <p className="font-bold text-lg mb-1 text-indigo-900">พุทธัง ภะคะวันตัง อะภิวาเทมิ,</p>
            <p className="text-red-500 font-medium mb-4">(กราบ)</p>
            <p className="font-bold text-lg mb-2 text-indigo-900">ส๎วากขาโต ภะคะวะตา ธัมโม,</p>
            <p className="font-bold text-lg mb-1 text-indigo-900">ธัมมัง นะมัสสามิ</p>
            <p className="text-red-500 font-medium mb-4">(กราบ)</p>
            <p className="font-bold text-lg mb-2 text-indigo-900">สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
            <p className="font-bold text-lg mb-1 text-indigo-900">สังฆัง นะมามิ</p>
            <p className="text-red-500 font-medium">(กราบ)</p>
          </div>
        </section>

        {/* ส่วนที่ 2: ปุพพภาคนมการ */}
        <section className="mt-8 mb-6 border-t-2 border-indigo-200 pt-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">ปุพพภาคนมการ</h3>
          <p className="italic text-gray-500 mb-2">(หันทะ มะยัง พุทธัสสะ ภะคะวะโต ปุพพะภาคะนะมะการัง กะโรมะ เส)</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">นะโม ตัสสะ ภะคะวะโต,</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">อะระหะโต,</p>
          <p className="font-bold text-lg text-indigo-900">สัมมาสัมพุทธัสสะ,</p>
          <p className="mt-2 text-sm text-red-500 font-medium">(ว่า ๓ จบ)</p>
        </section>

        {/* ส่วนที่ 3: พุทธาภิถุติ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-500">พุทธาภิถุติ</h3>
          <p className="italic text-gray-500 mb-2">(หันทะ มะยัง พุทธาภิถุติง กะโรมะ เส)</p>
          <p className="font-bold text-lg mb-2 text-indigo-900">โย โส ตะถาคะโต,</p>
          <p className="font-bold text-lg text-indigo-900">อะระหัง,</p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/buddha/basesOfMeritoriousAction" className="inline-block px-6 py-3 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors">
          ไปที่หน้า Bases of Meritorious Action
        </Link>
      </div>
    </div>
  );
}
