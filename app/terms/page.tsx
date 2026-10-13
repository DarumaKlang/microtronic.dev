import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import LegalMarkdown from '@/components/LegalMarkdown';
import { GLASS_PANEL_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ - Terms of Service | Microtronic',
    description: 'ข้อกำหนดและเงื่อนไขการใช้บริการพัฒนาและจัดแต่งระบบคอมพิวเตอร์ของ Microtronic (Thailand) Co., Ltd.',
    keywords: ['Terms of Service', 'Terms and Conditions', 'ข้อกำหนด', 'ข้อตกลง', 'Microtronic'],
};

export default async function TermsAndConditionsPage() {
    const terms = await readFile(
        join(process.cwd(), 'content/legal/terms-conditions.md'),
        'utf8',
    );

    return (
        <div className="min-h-screen p-6 pb-20 pt-32 sm:p-12 relative overflow-hidden bg-slate-950">
            <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-indigo-950/30 to-slate-950 opacity-95 z-0" />
            <GooeyBackground />

            <div className="container mx-auto max-w-5xl relative z-10">
                <header className="text-center mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        Microtronic Legal
                    </p>
                </header>

                <article className={`${GLASS_PANEL_CLASS} p-6 sm:p-10 rounded-3xl`}>
                    <LegalMarkdown content={terms} />
                </article>
            </div>
        </div>
    );
}
