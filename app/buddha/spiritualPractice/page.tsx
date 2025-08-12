import Link from 'next/link';

export default function SpiritualPracticePage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">บทสวดทำวัตรเช้า</h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">

        <h2 className="text-3xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-200 pb-2">บทสวดทำวัตรเช้า</h2>

        {/* ส่วนที่ 1: คำบูชาพระรัตนตรัย */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">คำบูชาพระรัตนตรัย</h2>
          <p className="text-gray-800 mb-4">โย โส ภะคะวา อะระหัง สัมมาสัมพุทโธ</p>
          <p className="text-gray-800 mb-4">ส๎วากขาโต เยนะ ภะคะวะตา ธัมโม,</p>
          <p className="text-gray-800 mb-4">สุปะฏิปันโน ยัสสะ ภะคะวะโต สาวะกะสังโฆ,</p>
          <p className="text-gray-800 mb-4">ตัมมะยัง ภะคะวันตัง สะธัมมัง สะสังฆัง, อิเมหิ สักกาเรหิ ยะถาระหัง อาโรปิเตหิ อะภิปูชะยามะ,</p>
          <p className="text-gray-800 mb-4">สาธุ โน ภันเต ภะคะวา สุจิระปะรินิพพุโตปิ,</p>
          <p className="text-gray-800 mb-4">ปัจฉิมาชะนะตานุกัมปะมานะสา,</p>
          <p className="text-gray-800 mb-4">อิเม สักกาเร ทุคคะตะปัณณาการะภูเต ปะฏิคคัณหาตุ,</p>
          <p className="text-gray-800 mb-4">อัมหากัง ทีฆะรัตตัง หิตายะ สุขายะ.</p>

          <div className="mt-4 border-t-2 border-gray-200 pt-4">
            <p className="text-gray-800 mb-4">อะระหัง สัมมาสัมพุทโธ ภะคะวา,</p>
            <p className="text-gray-800 mb-1">พุทธัง ภะคะวันตัง อะภิวาเทมิ,</p>
            <p className="text-red-500 font-medium mb-4">(กราบ)</p>
            <p className="text-gray-800 mb-4">ส๎วากขาโต ภะคะวะตา ธัมโม,</p>
            <p className="text-gray-800 mb-1">ธัมมัง นะมัสสามิ</p>
            <p className="text-red-500 font-medium mb-4">(กราบ)</p>
            <p className="text-gray-800 mb-4">สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
            <p className="text-gray-800 mb-1">สังฆัง นะมามิ</p>
            <p className="text-red-500 font-medium">(กราบ)</p>
          </div>
        </section>

        {/* ส่วนที่ 2: ปุพพภาคนมการ */}
        <section className="mt-8 mb-6 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ปุพพภาคนมการ</h2>
          <p className="italic text-gray-500 mb-4">(หันทะ มะยัง พุทธัสสะ ภะคะวะโต ปุพพะภาคะนะมะการัง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">นะโม ตัสสะ ภะคะวะโต,</p>
          <p className="text-gray-800 mb-4">อะระหะโต,</p>
          <p className="text-gray-800 mb-4">สัมมาสัมพุทธัสสะ,</p>
          <p className="mt-2 text-sm text-red-500 font-medium">(ว่า ๓ จบ)</p>
        </section>

        {/* ส่วนที่ 3: พุทธาภิถุติ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">พุทธาภิถุติ</h2>
          <p className="italic text-gray-500 mb-4">(ผู้สวดนำเริ่มว่า หันทะ มะยัง พุทธาภิถุติง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">โย โส ตะถาคะโต อะระหัง สัมมาสัมพุทโธ</p>
          <p className="text-gray-800 mb-4">วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู อะนุตตะโร</p>
          <p className="text-gray-800 mb-4">ปุริสะทัมมะสาระถิ สัตถา เทวะมะนุสสานัง</p>
          <p className="text-gray-800 mb-4">พุทโธ ภะคะวา โย อิมัง โลกัง สะเทวะกัง สะมาระกัง</p>
          <p className="text-gray-800 mb-4">สะพรหมะกัง สัสสะมะณะพราหมะณิง ปะชัง สะเทวะมะนุสสัง</p>
          <p className="text-gray-800 mb-4">สะยัง อะภิญญา สัจฉิกัตวา ปะเวเทสิ โย ธัมมัง เทเสสิ อาทิกัลยาณัง</p>
          <p className="text-gray-800 mb-4">มัชเฌกัลยาณัง ปะริโยสานะกัลยาณัง สาตถัง สะพยัญชะนัง เกวะละปะริปุณณัง</p>
          <p className="text-gray-800 mb-4">ปะริสุทธัง พรหมะจะริยัง ปะกาเสสิ ตะมะหัง ภะคะวันตัง อะภิปูชะยามิ</p>
          <p className="text-gray-800 mb-1">ตะมะหัง ภะคะวันตัง สิระสา นะมามิ</p>
          <p className="text-red-500 font-medium mb-4">(กราบ)</p>
        </section>

        {/* ส่วนที่ 4: ธัมมาภิถุติ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ธัมมาภิถุติ</h2>
          <p className="italic text-gray-500 mb-4">(ผู้สวดนำเริ่มว่า หันทะ มะยัง ธัมมาภิถุติง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">โย โส สวากขาโต ภะคะวะตา ธัมโม</p>
          <p className="text-gray-800 mb-4">สันทิฏฐิโก อะกาลิโก เอหิปัสสิโก โอปะนะยิโก</p>
          <p className="text-gray-800 mb-4">ปัจจัตตัง เวทิตัพโพ วิญญูหิ</p>
          <p className="text-gray-800 mb-4">ตะมะหัง ธัมมัง อะภิปูชะยามิ ตะมะหัง ธัมมัง สิระสา นะมามิ</p>
          <p className="text-red-500 font-medium mb-4">(กราบ)</p>
        </section>

        {/* ส่วนที่ 5: สังฆาภิถุติ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">สังฆาภิถุติ</h2>
          <p className="italic text-gray-500 mb-4">(ผู้สวดนำเริ่มว่า หันทะ มะยัง สังฆาภิถุติง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">โย โส สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">อุชุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">ญายะปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">สามีจิปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">ยะทิทัง จัตตาริ ปุริสะยุคานิ อัฏฐะ ปุริสะปุคคะลา</p>
          <p className="text-gray-800 mb-4">เอสะภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">อาหุเนยโย ปาหุเนยโย ทักขิเณยโย อัญชะลิกะระณีโย</p>
          <p className="text-gray-800 mb-4">อะนุตตะรัง ปุญญักเขตตัง โลกัสสะ</p>
          <p className="text-gray-800 mb-4">ตะมะหัง สังฆัง อะภิปูชะยามิ</p>
          <p className="text-gray-800 mb-1">ตะมะหัง สังฆัง สิระสา นะมามิ</p>
          <p className="text-red-500 font-medium mb-4">(กราบ แล้วนั่งราบ)</p>
        </section>

        {/* ส่วนที่ 6: รตนัตตยัปปณามคาถา */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">รตนัตตยัปปณามคาถา</h2>
          <p className="italic text-gray-500 mb-4">(ผู้สวดนำเริ่มว่า หันทะ มะยัง ระตะนัตตะยัปปะณามะคาถาโย เจวะ สังเวคะวัตถุปะริทีปะกะปาฐัญจะ ภะณามะ เส)</p>
          <p className="text-gray-800 mb-4">พุทโธ สุสุทโธ กะรุณามะหัณณะโว</p>
          <p className="text-gray-800 mb-4">โยจจันตะสุทธัพพะระญาณะโลจะโน</p>
          <p className="text-gray-800 mb-4">โลกัสสะ ปาปูปะกิเลสะฆาตะโก</p>
          <p className="text-gray-800 mb-4">วันทามิ พุทธัง อะหะมาทะเรนะ ตัง</p>
          <p className="text-gray-800 mb-4">ธัมโม ปะทีโป วิยะ ตัสสะ สัตถุโน โย</p>
          <p className="text-gray-800 mb-4">มัคคะปากามะตะเภทะภินนะโก</p>
          <p className="text-gray-800 mb-4">โลกุตตะโร โย จะ ตะทัตถะทีปะโน</p>
          <p className="text-gray-800 mb-4">วันทามิ ธัมมัง อะหะมาทะเรนะ ตัง</p>
          <p className="text-gray-800 mb-4">สังโฆ สุเขตาภยะติเขตตะสัญญิโต</p>
          <p className="text-gray-800 mb-4">โย ทิฏฐะสันโต สุคะตานุโพธะโก</p>
          <p className="text-gray-800 mb-4">โลลัปปะหีโน อะริโย สุเมธะโส</p>
          <p className="text-gray-800 mb-4">วันทามิ สังฆัง อะหะมาทะเรนะ ตัง</p>
          <p className="text-gray-800 mb-4">อิจเจวะเมกันตะภิปูชะเนยยะกัง วัตถุตตะยัง</p>
          <p className="text-gray-800 mb-4">วันทะยะตาภิสังขะตัง ปุญญัง มะยา ยัง</p>
          <p className="text-gray-800 mb-4">มะมะ สัพพุปัททะวา มา โหนตุ เว ตัสสะ ปะภาวะสิทธิยา</p>
        </section>

        {/* ส่วนที่ 7: สังเวคปริกิตตนปาฐะ */}
        <section className="mt-8 border-t-2 border-indigo-200 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">สังเวคปริกิตตนปาฐะ</h2>
          <p className="text-gray-800 mb-4">อิธะ ตะถาคะโต โลเก อุปปันโน</p>
          <p className="text-gray-800 mb-4">อะระหัง สัมมาสัมพุทโธ</p>
          <p className="text-gray-800 mb-4">ธัมโม จะ เทสีโต นิยยานิโก</p>
          <p className="text-gray-800 mb-4">อุปะสะมิโก ปะรินิพพานิโก สัมโพธะคามี สุคะตัปปะเวทิโต</p>
          <p className="text-gray-800 mb-4">มะยันตัง ธัมมัง สุตวา เอวัง ชานามะ ชาติปิ ทุกขา ชะราปิ ทุกขา มะระณัมปิ ทุกขัง</p>
          <p className="text-gray-800 mb-4">โสกะปะริเทวะทุกขะโทมะนัสสุปายาสาปิ ทุกขา</p>
          <p className="text-gray-800 mb-4">อัปปิเยหิ สัมปะโยโค ทุกโข ปิเยหิ วิปปะโยโค ทุกโข</p>
          <p className="text-gray-800 mb-4">ยัมปิจฉัง นะ ละภะติ ตัมปิ ทุกขัง</p>
          <p className="text-gray-800 mb-4">สังขิตเตนะ ปัญจุปาทานักขันธา ทุกขา</p>
          <p className="text-gray-800 mb-4">เสยยะถีทัง</p>
          <p className="text-gray-800 mb-4">รูปูปาทานักขันโธ เวทะนูปาทานักขันโธ</p>
          <p className="text-gray-800 mb-4">สัญญูปาทานักขันโธ สังขารูปาทานักขันโธ วิญญาณูปาทานักขันโธ</p>
          <p className="text-gray-800 mb-4">เยสังปะริญญายะ ธะระมาโน โส ภะคะวา</p>
          <p className="text-gray-800 mb-4">เอวัง พะหุลัง สาวเก วิเนติ</p>
          <p className="text-gray-800 mb-4">เอวัง ภาคา จะ ปะนัสสะ ภะคะวะโต สาวะเกสุ</p>
          <p className="text-gray-800 mb-4">อะนุสาสะนี พะหุลา ปะวัตตะติ</p>
          <p className="text-gray-800 mb-4">รูปัง อะนิจจัง เวทะนา อะนิจจา สัญญา อะนิจจา</p>
          <p className="text-gray-800 mb-4">สังขารา อะนิจจา วิญญาณัง อะนิจจา</p>
          <p className="text-gray-800 mb-4">รูปัง อะนัตตา เวทะนา อะนัตตา สัญญา อะนัตตา</p>
          <p className="text-gray-800 mb-4">สังขารา อะนัตตา วิญญาณัง อะนัตตา</p>
          <p className="text-gray-800 mb-4">สัพเพ สังขารา อะนิจจา สัพเพ ธัมมา อะนัตตาติ</p>
          <p className="text-gray-800 mb-4">เต (ตา) มะยัง โอติณณามหะ ชาติยา ชะรามะระเณนะ</p>
          <p className="text-gray-800 mb-4">โสเกหิ ปะริเทเวหิ ทุกเขหิ โทมะนัสเสหิ อุปายาเสหิ</p>
          <p className="text-gray-800 mb-4">ทุกโขติณณา ทุกขะปะเรตา อัปเปวะนามิมัสสะ เกวะลัสสะ</p>
          <p className="text-gray-800 mb-4">ทุกขักขันธัสสะ อันตะกิริยา ปัญญาเยถาติ</p>
          <p className="text-gray-800 mb-4">จิระปะรินิพพุตัมปิ ตัง</p>
          <p className="text-gray-800 mb-4">ภะคะวันตัง สะระณังคะตา</p>
          <p className="text-gray-800 mb-4">ธัมมัญจะ ภิกขุสังฆัญจะ</p>
          <p className="text-gray-800 mb-4">ตัสสะ ภะคะวะโต สาสะนัง ยะถาสะติ ยะถาพะลัง</p>
          <p className="text-gray-800 mb-4">มะนะสิกะโรมะ อะนุปะฏิปัชชามะ</p>
          <p className="text-gray-800 mb-4">สา สา โน ปะฏิปัตติ</p>
          <p className="text-gray-800 mb-4">อิมัสสะ เกวะลัสสะ ทุกขักขันธัสสะ อันตะกิริยายะ สังวัตตะตุ</p>
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
