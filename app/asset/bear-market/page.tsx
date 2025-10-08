// src/app/asset/bear-market/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import DcaCalculator from '@/components/DcaCalculator'; // นำเข้าเครื่องมือคำนวณ

export default function BearMarketDcaPage() {
    return (
        // การจัดวางเนื้อหาและพื้นหลังตามแนวทางที่คุณกำหนด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-10">

                <section className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 text-fuchsia-400 drop-shadow-lg">
                        🐻 Bear Market DCA Strategy
                    </h1>
                    <p className="text-xl font-light opacity-90 max-w-4xl mx-auto">
                        เครื่องมือวางแผนการเข้าซื้อแบบ Dollar-Cost Averaging (DCA) 
                        โดยใช้ระดับราคาที่ลดลงเพื่อลดต้นทุนเฉลี่ย ควบคู่กับการตั้งเป้าทำกำไรระยะสั้นและการจำกัดความเสี่ยง
                    </p>
                </section>

                <section className="w-full flex justify-center">
                    <DcaCalculator />
                </section>

            </main>
        </div>
    );
}