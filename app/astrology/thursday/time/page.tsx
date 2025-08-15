// src/app/astrology/thursday/time/page.tsx
import React from 'react';
import AuspiciousTimeCard from '../../../../components/AuspiciousTimeCard';

const ThursdayAuspiciousTimes = () => {
    // ข้อมูลฤกษ์ยามวันพฤหัสบดี (กลางวัน) พร้อมข้อมูลยามสามตา
    const dayTimes = [
        { time: '06.00 น. - 07.30 น.', auspicious: 'พระครูเรียงความตามนิบาต กุศราชเรืองฤทธิทุกทิศา เกิดในวงพงษ์กษัตริย์ขัติยา เป็นมหาสมมุติวงศ์ผู้ทรงนาม', samTaUp: '๑', samTaRam: '๒' },
        { time: '07.30 น. - 09.00 น.', auspicious: 'ภุมมะพระได้เสวยราช ทั้งเปรื่องปราชญ์ฤาเลื่องเรืองสนาม แต่รูปทรงของพระองค์ไม่สู้งาม แต่ว่ายามนี้ดีดังมีมา', samTaUp: '๒', samTaRam: '๓' },
        { time: '09.00 น. - 10.30 น.', auspicious: 'สุริชะพระได้มเหสี ชื่อประภาวดีเสน่หา ประคองเคียงเพียงดวงนัยนา ครองพาราเป็นสุขสนุกสบาย', samTaUp: '๓', samTaRam: '๑' },
        { time: '10.30 น. - 12.00 น.', auspicious: 'ศุกระประภาวดีหนี ไปบุรีบิตุเรศอันเรืองฉาย กุศราชร้อนใจไม่สบาย เป็นยามร้ายร้อนรนพ้นประมาณ', samTaUp: '๑', samTaRam: '๒' },
        { time: '12.00 น. - 13.30 น.', auspicious: 'พุธะยามพระกุศราช ไปตามนาฏถึงประเทศเขตสถาน จนพบองค์นงเยาว์ลำเภาพาน แต่ภูบาลยังมิได้เข้าใกล้นาง', samTaUp: '๒', samTaRam: '๓' },
        { time: '13.30 น. - 15.00 น.', auspicious: 'จันเทาท้าวไทพิไรร่ำ ทุกคืนค่ำกำสดสลดหมาง ไม่สู้ดียามนี้ก็เป็นกลาง มักจะร้างแรมรักษ์ประจักษ์ใจ', samTaUp: '๓', samTaRam: '๑' },
        { time: '15.00 น. - 16.30 น.', auspicious: 'เสารีกุศราชชนะศึก ก็สมนึกยินดีจะมีไหน ทำสงครามยามนี้จะมีไชย จงจำไว้เป็นอย่างอย่าคลางแคลง', samTaUp: '๑', samTaRam: '๒' },
        { time: '16.30 น. - 18.00 น.', auspicious: 'ยามครูบริสุทธิ์พระกุศราช เสวยราชฤาทั่วกลัวแสยง สมดังจิตคิดไว้มิได้แคลง กุศลแต่งให้ดีมีบุญญษ', samTaUp: '๒', samTaRam: '๓' },
    ];

    // ข้อมูลฤกษ์ยามวันพฤหัสบดี (กลางคืน) พร้อมข้อมูลยามสามตา
    const nightTimes = [
        { time: '18.00 น. - 19.30 น.', auspicious: 'ชีโวอุตโมโอฬาร์ล้ำ เวลาค่ำยามนี้ดีหนักหนา ได้เมื่อสุทธนูกุมารา อาชาพาลดเลี้ยวเที่ยวหาเมีย', samTaUp: '๓', samTaRam: '๑' },
        { time: '19.30 น. - 21.00 น.', auspicious: 'ศศิได้พบประสบพักตร์ อารีรักร่วมใจจนได้เสีย ไม่อิ่มหนำค่ำเช้าเฝ้าเคล้าเคลีย หาลูกเมียยามนี้ดีสุดใจ', samTaUp: '๑', samTaRam: '๒' },
        { time: '21.00 น. - 22.30 น.', auspicious: 'ศุโกรสุทธนูพาคู่ชื่น เสด็จคืนพาราอันผ่องใส อยู่ด้วยประภาเป็นยาใจ ในเวียงไชยชื่นชมภิรมยา', samTaUp: '๒', samTaRam: '๓' },
        { time: '22.30 น. - 24.00 น.', auspicious: 'ภุมโมชมชิดพิศวาท ด้วยนางนาฏน้องน้อยเสน่หา เสวยรมณ์ชมแสนสวรรยา ทั้งสองรารื่นเริงบรรเทิงใจ', samTaUp: '๓', samTaRam: '๑' },
        { time: '24.00 น. - 01.30 น.', auspicious: 'โสโรเมื่อม้าอาชาชาติ พานางนาฏข้ามเขิมเนินไศล ไปหามารดาด้วยอาลัย แต่ว่าไปไม่ถึงได้กึ่งทาง', samTaUp: '๑', samTaRam: '๒' },
        { time: '01.30 น. - 03.00 น.', auspicious: 'พุโธอาศัยอยู่ในป่า พลัดกับม้านุชน้องก็หมองหมาง มีโจรไพรใจกล้ามาลักนาง อย่าเดินทางไปไกลภัยจะมี', samTaUp: '๒', samTaRam: '๓' },
        { time: '03.00 น. - 04.30 น.', auspicious: 'ระวินี้นงเยาว์สำเภาแตก ลำบากกายว่ายแวกวารีศรี ห้ามมิให้เดินทางกลางนัทธี เหตุจะมีเหมือนกันดังพรรณา', samTaUp: '๓', samTaRam: '๑' },
        { time: '04.30 น. - 06.00 น.', auspicious: 'ชีโวสุริโยอโณภาส อนงค์นาฏเดินไพรไกลหนักหนา ได้พบม้าชื่นชมสมจินดา ก็พักพากันไปดังใจปอง', samTaUp: '๑', samTaRam: '๒' },
    ];

    return (
        <div className="container mx-auto p-4 pt-[80px] pb-[100px]">
            <h1 className="text-3xl font-bold mb-6">ฤกษ์ยามวันพฤหัสบดี</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">ฤกษ์ยาม (เวลากลางวัน)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayTimes.map((item, index) => (
                        <AuspiciousTimeCard key={index} {...item} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">ฤกษ์ยาม (เวลากลางคืน)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nightTimes.map((item, index) => (
                        <AuspiciousTimeCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThursdayAuspiciousTimes;