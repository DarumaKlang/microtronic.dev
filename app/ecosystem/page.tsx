import React from 'react';
import GooeyBackground from '@/components/GooeyBackground';
import { PARTNERS_DATA } from '@/data/PartnersData';
import { GLASS_PANEL_CLASS, GRADIENT_TEXT_CLASS } from '@/constants/data';
import { Cloud, Code, Database, Globe, Cpu, Terminal } from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Cloud': return <Cloud className="w-6 h-6 text-blue-400" />;
        case 'AI': return <Cpu className="w-6 h-6 text-pink-400" />;
        case 'Development': return <Code className="w-6 h-6 text-cyan-400" />;
        case 'OS': return <Terminal className="w-6 h-6 text-orange-400" />;
        default: return <Globe className="w-6 h-6 text-emerald-400" />;
    }
};

export const metadata = {
    title: 'Ecosystem & Partners - Microtronic',
    description: 'The world-class technologies and partners that power Microtronic solutions.',
};

export default function EcosystemPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
            <GooeyBackground />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center mb-16 space-y-4">
                    <h1 className={`text-5xl font-extrabold tracking-tight sm:text-7xl ${GRADIENT_TEXT_CLASS}`}>
                        Our Ecosystem
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        เราทำงานร่วมกับพาร์ทเนอร์และเทคโนโลยีระดับโลก เพื่อส่งมอบคุณค่าและประสิทธิภาพสูงสุดให้กับธุรกิจของคุณ
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PARTNERS_DATA.map((partner) => (
                        <div key={partner.id} className={`${GLASS_PANEL_CLASS} p-8 rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all duration-300 group`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                                    <CategoryIcon category={partner.category} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-0.5">{partner.name}</h3>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">{partner.category}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                {partner.description}
                            </p>
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs text-blue-400 font-bold uppercase tracking-tight">Active Infrastructure</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className={`mt-24 p-12 ${GLASS_PANEL_CLASS} rounded-[3rem] border-white/10 text-center relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                    <h2 className="text-3xl font-bold mb-6">Interested in Partnering?</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                        เราเปิดรับการร่วมมือกับผู้ให้บริการเทคโนโลยีและโซลูชันใหม่ๆ เพื่อขยับขยายขอบเขตความเป็นไปได้ของ Web & IoT
                    </p>
                    <a href="/contact" className="px-10 py-4 bg-white text-slate-900 font-black rounded-full hover:bg-blue-50 transition transform hover:scale-105 active:scale-95 shadow-2xl">
                        Contact for Partnership
                    </a>
                </section>
            </main>
        </div>
    );
}
