// src/components/HomeServiceShowcase.tsx
import React from 'react';
import { ServiceCard } from './ServiceCard'; // สมมติว่า ServiceCard อยู่ใน components

export default function HomeServiceShowcase() {
    return (
        <div className="flex flex-col gap-[32px] w-full items-center">
            {/* Card ใหม่สำหรับ "บริษัทมหาชน" (รูปขวา, เนื้อหาซ้าย - ใส่ reverse={true}) */}
            <ServiceCard
                imageSrc="/images/public-company.png"
                imageAlt="เว็บไซต์สำหรับบริษัทมหาชน"
                title="บริการรับทำเว็บไซต์ บริษัทมหาชน"
                description="เป็นบริการรับทำเว็บไซต์บริษัทมหาชน ซึ่งมีระบบจัดเก็บข้อมูลนักลงทุน สัมพันธ์กิจกรรม CSR ความยั่งยืน ซึ่งมีส่วนต่างจากครบล่วนตามกฎเกณฑ์ของตลาดหลักทรัพย์ ระบบหลังบ้านใช้งานง่าย สามารถอัปเดตข้อมูลต่างๆ ได้เอง เช่นหนังสือเชิญชวนประชุมผู้ถือหุ้น"
                linkText="อ่านเพิ่มเติม"
                linkHref="/public-company-service"
                reverse={true}
            />

            {/* ส่วน Real Estate Website */}
            <ServiceCard
                imageSrc="/images/real-estate.png"
                imageAlt="Real Estate Website"
                title="Real Estate Website"
                description="บริการรับทำเว็บไซต์นายหน้าอสังหาริมทรัพย์ ระบบจัดการง่าย หากใช้ MS Word ก็สามารถใช้งานได้เลย สามารถเพิ่มทรัพย์ได้ไม่จำกัด ลงรูปได้ไม่จำกัด ระบบพัฒนามาจาก WordPress ช่วยทำให้เว็บไซต์ของคุณติด SEO ที่ดีที่สุด เมื่อเทียบกับระบบเขียนเอง"
                linkText="อ่านเพิ่มเติม"
                linkHref="/real-estate-service"
            />

            {/* Card สำหรับ "SEO" (รูปภาพขวา) */}
            <ServiceCard
                imageSrc="/images/seo-service.png"
                imageAlt="บริการรับทำ SEO"
                title="บริการรับทำ SEO"
                description="หยุดการแข่งขันที่ไม่มีที่สิ้นสุดด้วยการติดอันดับบน Google อย่างยั่งยืน! เราคือผู้เชี่ยวชาญด้าน **SEO สายขาว** ที่มีประสบการณ์ยาวนานกว่า 10 ปี มั่นใจได้ว่าเว็บไซต์ของคุณจะขึ้นหน้าแรกอย่างถาวร หากไม่ติดอันดับตามที่ตกลงกันไว้ **เรายินดีคืนเงินเต็มจำนวน** เพื่อพิสูจน์ความจริงใจ!"
                linkText="อ่านเพิ่มเติม"
                linkHref="/seo-service"
                reverse={true}
            />

            {/* Card สำหรับ "Google Ads" (รูปภาพซ้าย) */}
            <ServiceCard
                imageSrc="/images/google-ads.png"
                imageAlt="บริการรับทำ Google Ads"
                title="บริการรับทำ Google Ads"
                description="อยากได้ลูกค้าใหม่ทันทีใช่ไหม? เราพร้อมช่วยคุณ! บริการ **Google Ads** ของเราจะทำให้สินค้าและบริการของคุณปรากฏบนหน้าแรกของ Google ในทันที ดึงดูดลูกค้าที่มีความต้องการซื้อสูงเข้ามาในเว็บไซต์ของคุณโดยตรง ช่วยเพิ่มยอดขายและสร้างการรับรู้แบรนด์ได้อย่างรวดเร็วในราคาที่คุ้มค่าที่สุด"
                linkText="อ่านเพิ่มเติม"
                linkHref="/google-ads-service"
            />

            {/* Card ใหม่สำหรับ "Corporate Website" (รูปภาพขวา) */}
            <ServiceCard
                imageSrc="/images/corporate-website.png"
                imageAlt="เว็บไซต์องค์กร"
                title="Corporate Website"
                description="สร้างความน่าเชื่อถือและความประทับใจให้องค์กรของคุณด้วยเว็บไซต์ที่ออกแบบอย่างมืออาชีพ มาพร้อมระบบหลังบ้านที่ใช้งานง่าย และฟังก์ชันครบครัน เช่น ข่าวสาร, คลังรูปภาพ, และระบบจัดการเพจที่ช่วยให้คุณอัปเดตข้อมูลได้เอง มีการออกแบบที่สวยงาม รองรับทุกอุปกรณ์ และสอดคล้องกับนโยบาย PDPA"
                linkText="อ่านเพิ่มเติม"
                linkHref="/corporate-website-service"
                reverse={true}
            />
        </div>
    );
}