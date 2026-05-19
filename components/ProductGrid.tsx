// components/ProductGrid.tsx
// FIX #6: ใช้ try/catch สำหรับ new URL() เพื่อป้องกัน runtime crash
// FIX #7: เปลี่ยนจาก <img> เป็น Next.js <Image> เพื่อ performance optimization
// FIX #8: ใช้ unique id สำหรับ SVG pattern แต่ละ card เพื่อป้องกัน duplicate id

import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductGridProps {
    products: Product[];
}

/** FIX #6: Safe URL hostname extractor — ป้องกัน TypeError จาก malformed URL */
function getHostname(url: string): string {
    try {
        return new URL(url).hostname;
    } catch {
        return 'microtronic.biz';
    }
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                ไม่พบสินค้าในหมวดหมู่นี้
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: Product) => {
                // FIX #8: สร้าง unique pattern id ต่อ card เพื่อป้องกัน duplicate DOM id
                const patternId = `grid-${product.slug}`;
                const href = product.direct_url || `/products/${product.slug}`;
                const isExternal = !!product.direct_url;

                return (
                    <div
                        key={product.slug}
                        className="group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
                    >
                        {/* FIX #8: Futuristic Background Pattern — unique id per card */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <defs>
                                    <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill={`url(#${patternId})`} />
                            </svg>
                        </div>

                        <a href={href} target={isExternal ? "_blank" : "_self"} rel="noopener noreferrer">
                            {/* FIX #7: เปลี่ยนจาก <img> เป็น Next.js <Image> */}
                            <div className="relative w-full h-52 bg-slate-800 overflow-hidden">
                                <Image
                                    src={product.preview_image_url || '/placeholder.jpg'}
                                    alt={`Preview of ${product.name}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"
                                />
                                {/* Scanning Animation Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]" />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                                {/* Tech Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full">
                                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* 📝 Content with Code Aesthetic */}
                        <div className="p-6 flex flex-col h-full relative z-10">
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Status: Deploying Success</span>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight min-h-[3.5rem]">
                                    {product.name}
                                </h3>
                            </div>

                            <div className="font-mono text-xs text-blue-300/70 mb-6 bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                                <div className="flex justify-between items-center mb-1">
                                    <span>TYPE:</span>
                                    <span className="text-white">{product.category.toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>BASE URL:</span>
                                    {/* FIX #6: ใช้ getHostname() แทน new URL() โดยตรง */}
                                    <span className="text-white overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                                        {product.direct_url ? getHostname(product.direct_url) : 'microtronic.biz'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase">Pricing Module</span>
                                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                        {product.price}
                                    </span>
                                </div>

                                <a
                                    href={href}
                                    target={isExternal ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="group/btn relative px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        EXECUTE
                                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity pointer-events-none" />
                    </div>
                );
            })}
        </div>
    );
}