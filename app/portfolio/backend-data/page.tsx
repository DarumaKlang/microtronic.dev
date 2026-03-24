// app/portfolio/backend-data/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Micro Headless CMS - Backend & Data Engineering - Microtronic',
  description: 'Ultra Premium v1.5 Headless CMS built with Next.js, Prisma, and PostgreSQL. Features JSON API, Media Manager, and Database Management.',
};

export default function BackendDataPage() {
  return (
    <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
      <GooeyBackground />
      <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
        <h1 className="text-4xl font-extrabold sm:text-5xl text-green-300">Micro Headless CMS (Ultra Premium v1.5)</h1>

        <article className="bg-white/10 p-8 rounded-2xl border border-white/15">
          <h2 className="text-3xl font-bold text-cyan-300">Micro Headless CMS (Ultra Premium v1.5)</h2>
          <p className="mt-3 text-lg text-white/90">ระบบจัดการเนื้อหา (CMS) ระดับ High-end ที่มีความเร็วสูง สวยหรู และยืดหยุ่น ออกแบบมาเพื่อธุรกิจสตาร์ตอัปและพอร์ตโฟลิโอรุ่นใหม่ สร้างด้วย Next.js 15, Tailwind CSS 4 และ Prisma.</p>

          <section className="mt-8">
            <h3 className="text-2xl font-bold text-emerald-300">Key Features</h3>
            <ul className="list-disc list-inside mt-4 space-y-2 text-white/85">
              <li>Grand Landing Page with Glassmorphism design</li>
              <li>Custom Typography (Thai Ready) with Google Fonts</li>
              <li>Professional UI Design - Sharp & Modern</li>
              <li>Module System (.zip) for plugins</li>
              <li>100% Headless Native with JSON API</li>
              <li>Database Management (Backup & Restore)</li>
              <li>Media Manager for image uploads</li>
              <li>Discord Community integration</li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-bold text-violet-300">Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-white/85">
              <div>Next.js (App Router)</div>
              <div>Tailwind CSS 4</div>
              <div>Prisma ORM</div>
              <div>PostgreSQL (or SQLite/Neon)</div>
              <div>TypeScript</div>
              <div>Google Fonts Integration</div>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-bold text-violet-300">Links</h3>
            <ul className="list-disc list-inside mt-4 space-y-2 text-white/85">
              <li><a href="https://micro-headless-cms.vercel.app/" className="text-cyan-300 hover:underline">Landing Page</a></li>
              <li><a href="https://github.com/WebShardow/Micro-Headless-CMS" className="text-cyan-300 hover:underline">GitHub Repository</a></li>
              <li><a href="https://discord.gg/J49xseEN" className="text-cyan-300 hover:underline">Discord Community</a></li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-bold text-violet-300">Quick Start</h3>
            <ol className="list-decimal list-inside mt-4 space-y-2 text-white/85">
              <li>npm install</li>
              <li>npx prisma db push</li>
              <li>npm run dev</li>
            </ol>
          </section>
        </article>
      </main>
    </div>
  );
}