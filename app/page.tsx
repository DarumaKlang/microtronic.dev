import Image from "next/image";
import GlassmorphismCard from '@/components/GlassmorphismCard';
import { ServiceCard } from '@/components/ServiceCard';
import { WorkShowcase } from '@/components/WorkShowcase'; // import component ใหม่

export default function Home() {

    {/* ตัวอย่างข้อมูลผลงานสำหรับ Component WorkShowcase */}
    const workExamples = [
        { src: '/images/work-1.png', alt: 'เว็บไซต์องค์กร 1' },
        { src: '/images/work-2.png', alt: 'เว็บไซต์องค์กร 2' },
        { src: '/images/work-3.png', alt: 'เว็บไซต์องค์กร 3' },
        { src: '/images/work-4.png', alt: 'เว็บไซต์องค์กร 4' },
        { src: '/images/work-5.png', alt: 'เว็บไซต์องค์กร 5' },
        { src: '/images/work-6.png', alt: 'เว็บไซต์องค์กร 6' },
    ];

    return (
        // ใช้ class สำหรับ gradient background และ text-white ตามที่คุณต้องการ
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">

            <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
                {/* Hero Section ใหม่สำหรับเว็บไซต์บริษัท */}
                <section className="w-full flex justify-center max-w-7xl">
                    <div className="flex flex-col items-center text-center p-8 sm:p-16 gap-8">
                        {/* ข้อความหลัก */}
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                            รับออกแบบจัดทำเว็บไซต์อย่าง<br className="sm:hidden" />มืออาชีพและทันสมัย
                        </h2>
                        <p className="text-lg sm:text-xl font-light max-w-2xl opacity-90">
                            เราสร้างสรรค์เว็บไซต์ที่ยืดหยุ่น ใช้งานง่าย และเป็นมิตรกับสิ่งแวดล้อม ด้วยเทคโนโลยีล่าสุด
                        </p>

                        {/* ปุ่ม Call-to-Action */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/portfolio"
                                className="px-8 py-3 bg-fuchsia-600 text-white font-semibold rounded-full shadow-lg hover:bg-fuchsia-700 transition-colors duration-300"
                            >
                                ดูผลงานของเรา
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-3 text-white font-semibold rounded-full border border-white hover:bg-white hover:text-fuchsia-800 transition-colors duration-300"
                            >
                                ติดต่อเรา
                            </a>
                        </div>
                    </div>
                </section>

                {/* Card ใหม่สำหรับ "บริษัทมหาชน" (รูปขวา, เนื้อหาซ้าย - ใส่ reverse={true}) */}
                <ServiceCard
                    imageSrc="/images/public-company.png"
                    imageAlt="เว็บไซต์สำหรับบริษัทมหาชน"
                    title="บริการรับทำเว็บไซต์ บริษัทมหาชน"
                    description="เป็นบริการรับทำเว็บไซต์บริษัทมหาชน ซึ่งมีระบบจัดเก็บข้อมูลนักลงทุน สัมพันธ์กิจกรรม CSR ความยั่งยืน ซึ่งมีส่วนต่างจากครบล่วนตามกฎเกณฑ์ของตลาดหลักทรัพย์ ระบบหลังบ้านใช้งานง่าย สามารถอัปเดตข้อมูลต่างๆ ได้เอง เช่นหนังสือเชิญชวนประชุมผู้ถือหุ้น"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/public-company-service"
                    reverse={true} // เพิ่ม prop นี้เพื่อสลับฝั่ง
                />

                {/* ส่วน Real Estate Website */}
                <ServiceCard
                    imageSrc="/images/real-estate.png" // Replace with your image path
                    imageAlt="Real Estate Website"
                    title="Real Estate Website"
                    description="บริการรับทำเว็บไซต์นายหน้าอสังหาริมทรัพย์ ระบบจัดการง่าย หากใช้ MS Word ก็สามารถใช้งานได้เลย สามารถเพิ่มทรัพย์ได้ไม่จำกัด ลงรูปได้ไม่จำกัด ระบบพัฒนามาจาก WordPress ช่วยทำให้เว็บไซต์ของคุณติด SEO ที่ดีที่สุด เมื่อเทียบกับระบบเขียนเอง"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/real-estate-service"
                />

                {/* Card สำหรับ "SEO" (รูปภาพขวา) */}
                <ServiceCard
                    imageSrc="/images/seo-service.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="บริการรับทำ SEO"
                    title="บริการรับทำ SEO"
                    description="หยุดการแข่งขันที่ไม่มีที่สิ้นสุดด้วยการติดอันดับบน Google อย่างยั่งยืน! เราคือผู้เชี่ยวชาญด้าน **SEO สายขาว** ที่มีประสบการณ์ยาวนานกว่า 10 ปี มั่นใจได้ว่าเว็บไซต์ของคุณจะขึ้นหน้าแรกอย่างถาวร หากไม่ติดอันดับตามที่ตกลงกันไว้ **เรายินดีคืนเงินเต็มจำนวน** เพื่อพิสูจน์ความจริงใจ!"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/seo-service"
                    reverse={true}
                />

                {/* Card สำหรับ "Google Ads" (รูปภาพซ้าย) */}
                <ServiceCard
                    imageSrc="/images/google-ads.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="บริการรับทำ Google Ads"
                    title="บริการรับทำ Google Ads"
                    description="อยากได้ลูกค้าใหม่ทันทีใช่ไหม? เราพร้อมช่วยคุณ! บริการ **Google Ads** ของเราจะทำให้สินค้าและบริการของคุณปรากฏบนหน้าแรกของ Google ในทันที ดึงดูดลูกค้าที่มีความต้องการซื้อสูงเข้ามาในเว็บไซต์ของคุณโดยตรง ช่วยเพิ่มยอดขายและสร้างการรับรู้แบรนด์ได้อย่างรวดเร็วในราคาที่คุ้มค่าที่สุด"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/google-ads-service"
                />

                {/* Card ใหม่สำหรับ "Corporate Website" (รูปภาพขวา) */}
                <ServiceCard
                    imageSrc="/images/corporate-website.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="เว็บไซต์องค์กร"
                    title="Corporate Website"
                    description="สร้างความน่าเชื่อถือและความประทับใจให้องค์กรของคุณด้วยเว็บไซต์ที่ออกแบบอย่างมืออาชีพ มาพร้อมระบบหลังบ้านที่ใช้งานง่าย และฟังก์ชันครบครัน เช่น ข่าวสาร, คลังรูปภาพ, และระบบจัดการเพจที่ช่วยให้คุณอัปเดตข้อมูลได้เอง มีการออกแบบที่สวยงาม รองรับทุกอุปกรณ์ และสอดคล้องกับนโยบาย PDPA"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/corporate-website-service"
                    reverse={true}
                />

                {/* ส่วน "บริการของเรา" ใหม่ที่ใช้โครงสร้างจากเว็บไซต์ตัวอย่าง */}
                <section className="w-full max-w-7xl mt-16 px-4">
                    <h3 className="text-3xl font-bold text-center mb-12">บริการของเรา</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* การ์ดบริการ: มืออาชีพ */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">✨</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">มืออาชีพ</h4>
                                <p className="text-sm opacity-80">
                                    รับออกแบบและพัฒนาเว็บไซต์ด้วยมาตรฐานสูงสุด เพื่อให้เว็บไซต์ของคุณมีประสิทธิภาพและน่าเชื่อถือ
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: ทันสมัย */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">🚀</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">ทันสมัย</h4>
                                <p className="text-sm opacity-80">
                                    ใช้เทคโนโลยีล่าสุดและดีไซน์ที่ล้ำสมัย เพื่อให้เว็บไซต์ของคุณโดดเด่นและสร้างความประทับใจ
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: ยืดหยุ่น */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">⚙️</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">ยืดหยุ่น</h4>
                                <p className="text-sm opacity-80">
                                    เว็บไซต์ที่ปรับขนาดได้ตามความต้องการของธุรกิจ และสามารถรองรับการใช้งานบนทุกอุปกรณ์
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: เป็นมิตรกับสิ่งแวดล้อม */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">🌿</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">เป็นมิตรกับสิ่งแวดล้อม</h4>
                                <p className="text-sm opacity-80">
                                    การออกแบบที่เน้นประสิทธิภาพ ช่วยลดการใช้พลังงานของเซิร์ฟเวอร์ และลดผลกระทบต่อสิ่งแวดล้อม
                                </p>
                            </div>
                        </GlassmorphismCard>
                    </div>
                </section>

                <section className="w-full max-w-7xl mt-16 px-4">
                    {/* เพิ่มส่วนแสดงผลงานใหม่ */}
                    <WorkShowcase
                    title="ตัวอย่างผลงานรับทำเว็บไซต์"
                    description="เราสร้างสรรค์เว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ไม่ว่าจะเป็นเว็บไซต์องค์กร E-commerce หรือ Portfolio ด้วยดีไซน์ที่ทันสมัยและใช้งานง่ายบนทุกอุปกรณ์"
                    works={workExamples}
                    />
                </section>

            </main>

            <footer className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between row-start-3 max-w-7xl text-xs text-center opacity-75 gap-2 sm:gap-0">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file-text.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
