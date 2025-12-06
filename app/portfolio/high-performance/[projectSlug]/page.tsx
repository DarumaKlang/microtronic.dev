// app/portfolio/high-performance/[projectSlug]/page.tsx
import { getReadmeContent } from '@/lib/github';
import MarkdownViewer from '@/components/MarkdownViewer';
import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';
import { Metadata } from 'next';

// Mapping ข้อมูลโครงการ (คุณต้องปรับแก้ไขตามโครงการจริงของคุณ)
// **NOTE:** ใช้ชื่อผู้ใช้ GitHub ของคุณ (DarumaKlang)
const projectRepoMap: Record<string, string> = {
    // Slug (ใช้ใน URL) : 'GitHub_Username/Repository_Name'
    'high-performance-ecommerce': 'DarumaKlang/ecommerce-rsc-nextjs', 
    'static-landing-page': 'DarumaKlang/static-site-builder', 
    'realtime-dashboard': 'DarumaKlang/realtime-analytics-rsc', 
};

interface ProjectDetailPageProps {
    params: {
        projectSlug: string;
    };
}

// ฟังก์ชันสำหรับสร้าง Metadata แบบ Dynamic
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const titleSlug = params.projectSlug.replace(/-/g, ' ').toUpperCase();
    return {
        title: `${titleSlug} | High-Performance Portfolio`,
        description: `รายละเอียดโครงการ ${titleSlug} เน้นประสิทธิภาพด้วย Next.js และ RSC`,
    };
}

// Server Component สำหรับแสดงรายละเอียดโครงการ
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { projectSlug } = params;
    const repoPath = projectRepoMap[projectSlug];
    
    if (!repoPath) {
        return (
            <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
                <GooeyBackground />
                <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10 text-center">
                    <h1 className="text-4xl font-bold text-red-400">❌ โครงการไม่พบ</h1>
                    <p>ไม่พบโครงการสำหรับ Slug: **{projectSlug}** โปรดตรวจสอบ URL.</p>
                    <Link href="/portfolio" className="mt-4 text-lg font-semibold text-blue-400 hover:text-blue-200 transition underline">
                        ← กลับสู่หน้า Portfolio หลัก
                    </Link>
                </main>
            </div>
        );
    }

    // ดึงเนื้อหา README.md (นี่คือจุดที่ Next.js ทำ Server-Side Data Fetching)
    const readmeContent = await getReadmeContent(repoPath);
    const githubRepoUrl = `https://github.com/${repoPath}`;

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <header>
                    <h1 className="text-4xl font-extrabold sm:text-5xl text-blue-300 capitalize">
                        {projectSlug.replace(/-/g, ' ')}
                    </h1>
                    {/* ลิงก์ไปยัง GitHub Repo */}
                    <Link 
                        href={githubRepoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg text-gray-400 hover:text-blue-400 transition underline flex items-center gap-2 mt-2"
                    >
                        <span className="text-xl">🐙</span> ดูโค้ดบน GitHub: {repoPath}
                    </Link>
                </header>
                
                <section className="bg-white/5 p-6 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold mb-4 border-b border-white/20 pb-2 text-white">
                        รายละเอียดโครงการ (ดึงจาก README.md)
                    </h2>
                    {/* แสดงผล Markdown */}
                    <MarkdownViewer content={readmeContent} />
                </section>

                <Link href="/portfolio/high-performance" className="mt-8 text-lg font-semibold text-blue-400 hover:text-blue-200 transition duration-150">
                    ← กลับสู่รายการ High-Performance
                </Link>
            </main>
        </div>
    );
}

// ถ้าคุณใช้ Dynamic Route ที่มี generateStaticParams คุณต้องใส่ฟังก์ชันนี้ด้วย
// export async function generateStaticParams() {
//     return Object.keys(projectRepoMap).map((projectSlug) => ({
//         projectSlug,
//     }));
// }