import Link from 'next/link';

export default function SpiritualPracticePage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">บทสวดทำวัตรเช้า</h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">

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

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 2: ปุพพภาคนมการ */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ปุพพภาคนมการ</h2>
          <p className="italic text-gray-500 mb-4">(หันทะ มะยัง พุทธัสสะ ภะคะวะโต ปุพพะภาคะนะมะการัง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">นะโม ตัสสะ ภะคะวะโต,</p>
          <p className="text-gray-800 mb-4">อะระหะโต,</p>
          <p className="text-gray-800 mb-4">สัมมาสัมพุทธัสสะ,</p>
          <p className="mt-2 text-sm text-red-500 font-medium">(ว่า ๓ จบ)</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 3: พุทธาภิถุติ */}
        <section className="mb-6">
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

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 4: ธัมมาภิถุติ */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ธัมมาภิถุติ</h2>
          <p className="italic text-gray-500 mb-4">(ผู้สวดนำเริ่มว่า หันทะ มะยัง ธัมมาภิถุติง กะโรมะ เส)</p>
          <p className="text-gray-800 mb-4">โย โส สวากขาโต ภะคะวะตา ธัมโม</p>
          <p className="text-gray-800 mb-4">สันทิฏฐิโก อะกาลิโก เอหิปัสสิโก โอปะนะยิโก</p>
          <p className="text-gray-800 mb-4">ปัจจัตตัง เวทิตัพโพ วิญญูหิ</p>
          <p className="text-gray-800 mb-4">ตะมะหัง ธัมมัง อะภิปูชะยามิ ตะมะหัง ธัมมัง สิระสา นะมามิ</p>
          <p className="text-red-500 font-medium mb-4">(กราบ)</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 5: สังฆาภิถุติ */}
        <section className="mb-6">
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

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 6: รตนัตตยัปปณามคาถา */}
        <section className="mb-6">
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

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 7: สังเวคปริกิตตนปาฐะ */}
        <section className="mb-6">
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

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 8: ตังขะณิกะปัจจะเวกขะณะวิธี */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ตังขะณิกะปัจจะเวกขะณะวิธี</h2>
          <p className="italic text-gray-500 mb-4">(หันทะ มะยัง ตังขะณิกะปัจจะเวกขะณะ ปาฐัง ภะณามะ เส ฯ)</p>
          <p className="text-gray-800 mb-4">ปะฏิสังขา โยนิโส จีวะรัง ปะฏิเสวามิ, ยาวะเทวะ</p>
          <p className="text-gray-800 mb-4">สีตัสสะปะฏิฆาตายะ, อุณ๎หัสสะ ปะฏิฆาตายะ,</p>
          <p className="text-gray-800 mb-4">ฑังสะมะกะสะวาตาตะปะสิริงสะปะสัมผัสสานัง</p>
          <p className="text-gray-800 mb-4">ปะฏิฆาตายะ, ยาวะเทวะ หิริโกปินะปะฏิจฉาทะนัตถัง ฯ</p>

          <p className="text-gray-800 mb-4">ปะฏิสังขา โยนิโส ปิณฑะปาตัง ปะฏิเสวามิ ,</p>
          <p className="text-gray-800 mb-4">เนวะ ท๎วายะ นะ มะทายะ นะ มัณฑะนายะ</p>
          <p className="text-gray-800 mb-4">นะ วิภูสะนายะ , ยาวะเทวะ อิมัสสะ กายัสสะ ฐิติยา</p>
          <p className="text-gray-800 mb-4">ยาปะนายะ วิหิงสุปะระติยา พรัหมะจะริยานุคคะหายะ ,</p>
          <p className="text-gray-800 mb-4">อิติ ปุราณัญจะ เวทะนัง ปะฏิหังขามิ นะวัญจะ เวทะนัง</p>
          <p className="text-gray-800 mb-4">นะ อุปปาเทสสามิ , ยาต๎รา จะ เม ภะวิสสะติ อะนะวัชชะตา</p>
          <p className="text-gray-800 mb-4">จะ ผาสุวิหาโร จาติ ฯ</p>

          <p className="text-gray-800 mb-4">ปะฏิสังขา โยนิโส เสนาสะนัง ปะฏิเสวามิ ,</p>
          <p className="text-gray-800 mb-4">ยาวะเทวะ สีตัสสะ ปะฏิฆาตายะ , อุณ๎หัสสะ</p>
          <p className="text-gray-800 mb-4">ปะฏิฆาตายะ , ฑังสะมะกะสะวาตาตะปะสิริง-</p>
          <p className="text-gray-800 mb-4">สะปะสัมผัสสานัง ปะฏิฆาตายะ , ยาวะเทวะ</p>
          <p className="text-gray-800 mb-4">อุตุปะริสสะยะวิโนทะนัง ปะฏิสัลลานารามัตถัง ฯ</p>

          <p className="text-gray-800 mb-4">ปะฏิสังขา โยนิโส คิลานะปัจจะยะเภสัชชะปะริกขารัง</p>
          <p className="text-gray-800 mb-4">ปะฏิเสวามิ, ยาวะเทวะ อุปปันนานัง เวยยาพาธิกานัง</p>
          <p className="text-gray-800 mb-4">เวทะนานังปะฏิฆาตายะ, อัพ๎ยาปัชฌะปะระมะตายาติ ฯ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 9: ปัตติทานะคาถา */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ปัตติทานะคาถา</h2>
          <p className="italic text-gray-500 mb-4">กล่าวนำ: หันทะ มะยัง ปัตติทานะคาถาโย ภะณามะ เส.</p>
          <p className="text-gray-800 mb-4">ยา เทวะตา สันติ วิหาระวาสินี, ถูเป ฆะเร โพธิฆะเร ตะหิง ตะหิง, ตา ธัมมะทาเนนะ ภะวันตุ ปูชิตา, โสตถิง กะโรนเตธะ วิหาระมัณฑะเล, เถรา จะ มัชฌา นะวะกา จะ ภิกขะโว, สารามิกา ทานะปะตี อุปาสะกา, คามา จะ เทสา นิคะมา จะ อิสสะรา, สัปปาณะภูตา สุขิตา ภะวันตุ เต, ชะลาพุชา เยปิ จะ อัณฑะสัมภะวา, สังเสทะชาตา อะถะโวปะปาติกา, นิยยานิกัง ธัมมะวะรัง ปะฏิจจะ เต, สัพเพปิ ทุกขัสสะ กะโรนตุ สังขะยัง, ฐาตุ จิรัง สะตัง ธัมโม ธัมมัทธะรา จะ ปุคคะลา, สังโฆ โหตุ สะมัคโค วะ อัตถายะ จะ หิตายะ จะ, อัมเห รักขะตุ สัทธัมโม สัพเพปิ ธัมมะจาริโน, วุฑฒิง สัมปาปุเณยยามะ ธัมเม อะริยัปปะเวทิเต.</p>
          <p className="text-gray-800 mb-4">ปะสันฺนา โหนฺตุ สัพฺเพปิ ปาณิโน พุทธะสาสะเน, สัมฺมา ธารัง ปะเวจฺฉันฺโต กาเล เทโว ปะวัสฺสะตุ, วุฑฺฒิภาวายะ สตฺตานัง สะมิทฺธัง เนจุ เมทะนิง, มาตา ปิตา จะ อัตฺระชัง นิจฺจัง รักฺขันฺติ ปุตฺตะกัง, เอวัง ธัมฺเมนะ ราชาโน ปะชัง รักฺขันฺตุ สัพฺพะทา.</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 10: ชุมนุมเทวดา */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ชุมนุมเทวดา</h2>
          <p className="text-gray-800 mb-4">สะรัชชัง สะเสนัง สะพันธุง นะรินทัง ปะริตตานุภาโว สะทา รักขะตูติ (ใช้เฉพาะในราชการ)</p>
          <p className="text-gray-800 mb-4">ผะริตวานะ เมตตัง สะเมตตา ภะทันตา, อะวิกขิตตะจิตตา ปะริตตัง ภะณันตุ, สัคเค กาเม จะ รูเป คิริสิขะระตะเฏ, จันตะลิกเข วิมาเน, ทีเป รัฏเฐ จะ คาเม ตะรุวะนะคะหะเน, เคหะวัตถุมหิ เขตเต, ภุมมา จายันตุ เทวา ชะละถะละวิสะเม, ยักขะคันธัพพะนาคา, ติฏฐันตา สันติเก ยัง มุนิวะระวะจะนัง, สาธะโว เม สุณันตุ ฯ ธัมมัสสะวะนะกาโล อะยัมภะทันตา, ธัมมัสสะวะนะกาโล อะยัมภะทันตา, ธัมมัสสะวะนะกาโล อะยัมภะทันตา</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 11: ปุพพะภาคะนะมะการ */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">ปุพพะภาคะนะมะการ</h2>
          <p className="text-gray-800 mb-4">นะโม ตัสสะ ภะคะวะโตอะระหะโต สัมมาสัมพุทธัสสะ (๓ ครั้ง)</p>
          <p className="text-gray-800 mb-4">พุทธัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ธัมมัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">สังฆัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ทุติยัม ปิพุทธัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ทุติยัม ปิธัมมัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ทุติยัมปิ สังฆัง สะระณัง คัจฉาม</p>
          <p className="text-gray-800 mb-4">ตะติยัมปิ พุทธัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ตะติยัมปิ ธัมมัง สะระณัง คัจฉามิ</p>
          <p className="text-gray-800 mb-4">ตะติยัมปิ สังฆัง สะระณัง คัจฉามิ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />

        {/* ส่วนที่ 12: วัฏฏะกะปะริตตัง */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">วัฏฏะกะปะริตตัง</h2>
          <p className="text-gray-800 mb-4">อัตถิ โลเก สีละคุโณ</p>
          <p className="text-gray-800 mb-4">สัจจัง โสเจยยะนุททะยา</p>
          <p className="text-gray-800 mb-4">เตนะ สัจเจนะ กาหามิ</p>
          <p className="text-gray-800 mb-4">สัจจะกิริยะมะนุตตะรัง</p>
          <p className="text-gray-800 mb-4">อาวัชชิตวา ธัมมะพะลัง</p>
          <p className="text-gray-800 mb-4">สะริตวา ปุพพะเก ชิเน</p>
          <p className="text-gray-800 mb-4">สัจจะพะละมะวัสสายะ</p>
          <p className="text-gray-800 mb-4">สัจจะกิริยะมะกาสะหัง</p>
          <p className="text-gray-800 mb-4">สันติ ปักขา อะปัตตะนา</p>
          <p className="text-gray-800 mb-4">สันติ ปาทา อะวัญจะนา</p>
          <p className="text-gray-800 mb-4">มาตา ปิตา จะ นิกขันตา</p>
          <p className="text-gray-800 mb-4">ชาตะเวทะ ปะฏิกกะมะ</p>
          <p className="text-gray-800 mb-4">สะหะ สัจเจ กะเต มัยหัง</p>
          <p className="text-gray-800 mb-4">มะหาปัชชะลิโต สิขี</p>
          <p className="text-gray-800 mb-4">วิชเชสิ โสฬะสะ กะรีสานิ</p>
          <p className="text-gray-800 mb-4">อุทะกัง ปัตวา ยะถา สิขี</p>
          <p className="text-gray-800 mb-4">สัจเจนะ เม สะโม นัตถิ</p>
          <p className="text-gray-800 mb-4">เอสา เม สัจจะปาระมีติ ฯ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 13: อาฏานายะปะริตตัง */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">อาฏานายะปะริตตัง</h2>
          <p className="text-gray-800 mb-4">นะโม เม สัพพะพุทธานัง อุปปันนานัง มะเหสินัง</p>
          <p className="text-gray-800 mb-4">ตัณหังกะโร มะหาวีโร เมธังกะโร มะหายะโส</p>
          <p className="text-gray-800 mb-4">สะระณังกะโร โลกะหิโต ทีปังกะโร ชุตินธะโร</p>
          <p className="text-gray-800 mb-4">โกณฑัญโญ ชะนะปาโมกโข มังคะโล ปุริสาสะโภ</p>
          <p className="text-gray-800 mb-4">สุมะโน สุมะโน ธีโร เรวะโต ระติวัฑฒะโน</p>
          <p className="text-gray-800 mb-4">โสภิโต คุณะสัมปันโน อะโนมะทัสสี ชะนุตตะโม</p>
          <p className="text-gray-800 mb-4">ปะทุโม โลกะปัชโชโต นาระโท วะระสาระถี</p>
          <p className="text-gray-800 mb-4">ปะทุมุตตะโร สัตตะสาโร สุเมโธ อัปปะฏิปุคคะโล</p>
          <p className="text-gray-800 mb-4">สุชาโต สัพพะโลกัคโค ปิยะทัสสี นะราสะโภ</p>
          <p className="text-gray-800 mb-4">อัตถะทัสสี การุณิโก ธัมมะทัสสี ตะโมนุโท</p>
          <p className="text-gray-800 mb-4">สิทธัตโถ อะสะโม โลเก ติสโส จะ วะทะตัง วะโร</p>
          <p className="text-gray-800 mb-4">ปุสโส จะ วะระโท พุทโธ วิปัสสี จะ อะนูปะโม</p>
          <p className="text-gray-800 mb-4">สิขี สัพพะหิโต สัตถา เวสสะภู สุขะทายะโก</p>
          <p className="text-gray-800 mb-4">กะกุสันโธ สัตถะวาโห โกนาคะมะโน ระณัญชะโห</p>
          <p className="text-gray-800 mb-4">กัสสะโป สิริสัมปันโน โคตะโม สัก๎ยะปุงคะโว ฯ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 14: บทสวดมนต์อิติปิโส */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">บทสวดมนต์อิติปิโส</h2>
          <p className="text-gray-800 mb-4">อิติปิโส ภะคะวา อะระหัง สัมมา สัมพุทโธ วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู อะนุตตะโร ปุริสะทัมมะสาระถิ สัตถา เทวะมะนุสสานัง พุทโธ ภะคะวาติ</p>
          <p className="text-gray-800 mb-4">สะวากขาโต ภะคะวะตา ธัมโม สันทิฏฐิโก อะกาลิโก เอหิปัสสิโก โอปะนะยิโก ปัจจัตตัง เวทิตัพโพ วิญญูหิติ</p>
          <p className="text-gray-800 mb-4">สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ อุชุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ ญายะปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ สามีจิปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ</p>
          <p className="text-gray-800 mb-4">ยะทิทัง จัตตาริ ปุริสะยุคานิ อัฏฐะ ปุริสะปุคคะลา เอสะ ภะคะวะโต สาวะกะสังโฆ อาหุเนยโย ปาหุเนยโย ทักขิเณยโย อัญชะลีกะระณีโย อะนุตตะรัง ปุญญักเขตตัง โลกัสสาติ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 15: สรรเสริญคุณเสด็จย่า */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">สรรเสริญคุณเสด็จย่า</h2>
          <p className="italic text-gray-500 mb-4">(สวดบทต้นบทเดียว ๑๐๘ จบ ถวายเป็นพุทธบูชา ธรรมบูชา สังฆบูชา ปฏิปัตติบูชา ๓ ตอน ตอนละ ๓๖ จบ)</p>
          <p className="text-gray-800 mb-4">พาหุงสะหัส สะมะภินิมมิตะสาวุธันตัง</p>
          <p className="text-gray-800 mb-4">ครีเมขะลัง อุทิตะโฆ ระสะเสนะมารัง</p>
          <p className="text-gray-800 mb-4">ทานาทิธัมมะวิธินา ชิตะวา มุนินโท</p>
          <p className="text-gray-800 mb-4">ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ</p>
          <p className="text-gray-800 mb-4">จบ ๓๖ จบ ว่า</p>
          <p className="text-gray-800 mb-1">พุทธัง ชีวิตยัง ยาวะนิพพานา สะระณัง คัจฉามิ</p>
          <p className="text-red-500 font-medium mb-4">กราบ</p>

          <p className="text-gray-800 mb-4">พาหุงสะหัส สะมะภินิมมิตะสาวุธันตัง</p>
          <p className="text-gray-800 mb-4">ครีเมขะลัง อุทิตะโฆ ระสะเสนะมารัง</p>
          <p className="text-gray-800 mb-4">ทานาทิธัมมะวิธินา ชิตะวา มุนินโท</p>
          <p className="text-gray-800 mb-4">ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ</p>
          <p className="text-gray-800 mb-4">จบ ๓๖ จบ ว่า</p>
          <p className="text-gray-800 mb-1">ธัมมัง ชีวิตยัง ยาวะนิพพานา สะระณัง คัจฉามิ ปัจเจกะพุทธัง ชีวิตยัง ยาวะนิพพานา สะระณัง คัจฉามิ</p>
          <p className="text-red-500 font-medium mb-4">กราบ</p>

          <p className="text-gray-800 mb-4">พาหุงสะหัส สะมะภินิมมิตะสาวุธันตัง</p>
          <p className="text-gray-800 mb-4">ครีเมขะลัง อุทิตะโฆ ระสะเสนะมารัง</p>
          <p className="text-gray-800 mb-4">ทานาทิธัมมะวิธินา ชิตะวา มุนินโท</p>
          <p className="text-gray-800 mb-4">ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ</p>
          <p className="text-gray-800 mb-4">จบ ๓๖ จบ ว่า</p>
          <p className="text-gray-800 mb-1">สังฆัง ชีวิตยัง ยาวะนิพพานา สะระณัง คัจฉามิ</p>
          <p className="text-red-500 font-medium mb-4">กราบ</p>

          <p className="text-gray-800 mb-4">มะหาการุณิโก นาโถ หิตายะ สัพพะปาณินัง</p>
          <p className="text-gray-800 mb-4">ปูเรตวา ปาระมี สัพพา ปัตโต</p>
          <p className="text-gray-800 mb-4">สัมโพธิมุตตะมัง เอเตนะ สัจจะ</p>
          <p className="text-gray-800 mb-4">วัชเชนะ โหตุ เต ชะยะมังคะลังฯ</p>
        </section>

        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 16: บทสวด อะภะยะปะริตตัง */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">บทสวด อะภะยะปะริตตัง</h2>
          <p className="text-gray-800 mb-4">ยันทุนนิมิตตัง อะวะมังคะลัญจะ</p>
          <p className="text-gray-800 mb-4">โย จามะนาโป สะกุณัสสะ สัทโธ</p>
          <p className="text-gray-800 mb-4">ปาปัคคะโห ทุสสุปินัง อะกันตัง</p>
          <p className="text-gray-800 mb-4">พุทธานุภาเวนะ วินาสะเมนตุ ฯ</p>

          <p className="text-gray-800 mb-4">ยันทุนนิมิตตัง อะวะมังคะลัญจะ</p>
          <p className="text-gray-800 mb-4">โย จามะนาโป สะกุณัสสะ สัทโท</p>
          <p className="text-gray-800 mb-4">ปาปัคคะโห ทุสสุปินัง อะกันตัง</p>
          <p className="text-gray-800 mb-4">ธัมมานุภาเวนะ วินาสะเมนตุ ฯ</p>

          <p className="text-gray-800 mb-4">ยันทุนนิมิตตัง อะวะมังคะลัญจะ</p>
          <p className="text-gray-800 mb-4">โย จามะนาโป สะกุณัสสะ สัทโท</p>
          <p className="text-gray-800 mb-4">ปาปัคคะโห ทุสสุปินัง อะกันตัง</p>
          <p className="text-gray-800 mb-4">สังฆานุภาเวนะ วินาสะเมนตุ ฯ</p>
        </section>
        
        <hr className="my-8 border-t-2 border-indigo-200" />
        
        {/* ส่วนที่ 17: เทวตาอุยโยชนคาถา */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">เทวตาอุยโยชนคาถา</h2>
          <p className="text-gray-800 mb-4">ทุกขัปปัตตาจะ นิททุกขา</p>
          <p className="text-gray-800 mb-4">ภะยัปปัตตา จะ นิพภะยา</p>
          <p className="text-gray-800 mb-4">โสกัปปัตตาจะ นิสโสกา</p>
          <p className="text-gray-800 mb-4">โหนตุ สัพเพปิ ปาณิโน</p>
          <p className="text-gray-800 mb-4">เอตตาวะตา จะอัมเหหิ</p>
          <p className="text-gray-800 mb-4">สัมภะตัง ปุญญะสัมปะทัง</p>
          <p className="text-gray-800 mb-4">สัพเพ เทวานุโมทันตุ</p>
          <p className="text-gray-800 mb-4">สัพพะสัมปัตติสิทธิยา</p>
          <p className="text-gray-800 mb-4">ทานัง ทะทันตุ สัทธายะ</p>
          <p className="text-gray-800 mb-4">สีลัง รักขันตุ สัพพะทา</p>
          <p className="text-gray-800 mb-4">ภาวะนาภิระตา โหนตุ</p>
          <p className="text-gray-800 mb-4">คัจฉันตุ เทวะตาคะตา</p>

          <p className="text-gray-800 mb-4">สัพเพ พุทธา พะลัปปัตตา</p>
          <p className="text-gray-800 mb-4">ปัจเจกานัญจะ ยัง พะลัง</p>
          <p className="text-gray-800 mb-4">อะระหันตานัญจะ เตเชนะ</p>
          <p className="text-gray-800 mb-4">รักขัง พันธามิสัพพะโส</p>

          <p className="text-gray-800 mb-4">ภะวะตุสัพพะมังคะลัง</p>
          <p className="text-gray-800 mb-4">รักขันตุ สัพพะเทวะตา</p>
          <p className="text-gray-800 mb-4">สัพพะพุทธานุภาเวนะ</p>
          <p className="text-gray-800 mb-4">สะทา โสตถี ภะวันตุเต ฯ</p>

          <p className="text-gray-800 mb-4">ภะวะตุสัพพะมังคะลัง</p>
          <p className="text-gray-800 mb-4">รักขันตุ สัพพะเทวะตา</p>
          <p className="text-gray-800 mb-4">สัพพะธัมมานุภาเวนะ</p>
          <p className="text-gray-800 mb-4">สะทา โสตถี ภะวันตุเต ฯ</p>

          <p className="text-gray-800 mb-4">ภะวะตุสัพพะมังคะลัง</p>
          <p className="text-gray-800 mb-4">รักขันตุ สัพพะเทวะตา</p>
          <p className="text-gray-800 mb-4">สัพพะสังฆานุภาเวนะ</p>
          <p className="text-gray-800 mb-4">สะทา โสตถี ภะวันตุเต ฯ</p>
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
