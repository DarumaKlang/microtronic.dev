import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import LegalMarkdown from '@/components/LegalMarkdown';
import { GLASS_PANEL_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'นโยบายความเป็นส่วนตัว - Privacy Policy | Microtronic',
    description: 'นโยบายความเป็นส่วนตัวของ Microtronic ว่าด้วยการเก็บ ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคล',
};

export default async function PrivacyPolicyPage() {
    const [thaiPolicy, englishPolicy] = await Promise.all([
        readFile(join(process.cwd(), 'content/legal/privacy-policy-th.md'), 'utf8'),
        readFile(join(process.cwd(), 'content/legal/privacy-policy-en.md'), 'utf8'),
    ]);

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
                    <LegalMarkdown content={thaiPolicy} />
                </article>

                <details className={`${GLASS_PANEL_CLASS} mt-6 rounded-2xl p-6 sm:p-8`}>
                    <summary className="cursor-pointer font-semibold text-cyan-300">
                        Read the Privacy Policy in English
                    </summary>
                    <div className="mt-6 border-t border-white/10 pt-6">
                        <LegalMarkdown content={englishPolicy} />
                    </div>
                </details>
            </div>
        </div>
    );
}
