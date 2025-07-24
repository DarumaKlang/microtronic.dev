import Image from "next/image";
import GlassmorphismCard from '@/components/GlassmorphismCard';

export default function Home() {
    return (
        // เพิ่ม class สำหรับ gradient background ที่นี่
        // และเพิ่ม text-white ให้กับข้อความทั้งหมดในหน้า
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    // อาจจะต้องปรับ invert สำหรับ dark mode หรือลบออกหากต้องการให้โลโก้ Next.js เป็นสีขาวเสมอ
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
                    <li className="mb-2 tracking-[-.01em]">
                        เว็บไซต์ Microtronic.Biz By Next.js {" "}
                        {/* ปรับสีพื้นหลังของ code block ให้เข้ากับ dark background */}
                        <code className="bg-white/[.15] dark:bg-white/[.25] font-mono font-semibold px-1 py-0.5 rounded text-white">
                            Vercel Hosting
                        </code>
                        .
                    </li>
                    <li className="tracking-[-.01em]">
                        Next.Js + Tailwind CSS
                    </li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-blue-950 gap-2 hover:bg-[#ccc] dark:hover:bg-[#383838] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                       
                        Coming Soon
                    </a>
                    <a
                        className="rounded-full border border-solid border-white/[.2] dark:border-white/[.3] transition-colors flex items-center justify-center hover:bg-white/[.1] dark:hover:bg-white/[.05] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        เกี่ยวกับเรา
                    </a>
                </div>

                <GlassmorphismCard className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4">Glassmorphism Card</h2>
                    <p className="text-gray-200">
                        นี่คือตัวอย่างของ Card Component สไตล์ Glassmorphism ที่มีความโปร่งใสและโทนสีเข้ม
                        เข้ากันได้ดีกับพื้นหลังที่คุณต้องการ
                    </p>
                    <button
                        className="
                            mt-6
                            px-4 py-2
                            bg-[rgba(255,255,255,0.05)]       // พื้นหลังสีขาวโปร่งใส 5%
                            backdrop-filter backdrop-blur-sm  // เพิ่มความเบลอเล็กน้อย (sm)
                            border border-[rgba(255,255,255,0.1)] // ขอบสีขาวโปร่งใส 10%
                            rounded-md
                            hover:bg-[rgba(255,255,255,0.15)] // เมื่อ hover ให้พื้นหลังโปร่งใสขึ้นเป็น 15%
                            transition-all
                        "
                    >
                        Learn More
                    </button>
                </GlassmorphismCard>

            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
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
