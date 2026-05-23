// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import TemplateGallery from '@/components/TemplateGallery';

interface Props {
    params: Promise<{ slug: string }>;
}

const TEMPLATE_SLUGS = ['templates-shop', 'thoth-platform-cms', 'kafra-platform-ecommerce'];

export async function generateStaticParams() {
    return (productsData as Product[])
        .filter(p => p.active !== false)
        .map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = (productsData as Product[]).find(p => p.slug === slug);
    if (!product) return {};
    return {
        title: `${product.name} | Microtronic Dev`,
        description: product.description || `รายละเอียดสินค้า ${product.name}`,
    };
}

export default async function ProductGalleryPage({ params }: Props) {
    const { slug } = await params;
    const product = (productsData as Product[]).find(p => p.slug === slug);
    if (!product || product.active === false) notFound();

    const isSvg = product.preview_image_url?.endsWith('.svg');
    const isTemplateProduct = TEMPLATE_SLUGS.includes(slug);

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

            <main className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">

                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-10 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    กลับหน้า Products
                </Link>

                <div className="mb-10">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs font-bold uppercase tracking-[0.3em]">
                        {product.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                        {product.name}
                    </h1>
                    {product.description && (
                        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Hero Image — ซ่อนสำหรับ template products */}
                {!isTemplateProduct && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-slate-800">
                        <Image
                            src={product.preview_image_url || '/placeholder.jpg'}
                            alt={`Preview of ${product.name}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1100px"
                            className="object-cover object-top"
                            unoptimized={isSvg}
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Category</div>
                        <div className="text-white font-bold">{product.category.toUpperCase()}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Pricing</div>
                        <div className="text-white font-bold">{product.price}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Status</div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white font-bold">Available Now</span>
                        </div>
                    </div>
                </div>

                {/* Template Gallery */}
                {isTemplateProduct && <TemplateGallery />}

                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10 mt-8">
                    {product.demo_url && (
                        <a
                            href={product.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition shadow-lg shadow-blue-500/20"
                        >
                            ดู Live Demo
                        </a>
                    )}
                    {product.github_repo_url && (
                        <a
                            href={product.github_repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition border border-white/20"
                        >
                            Source Code
                        </a>
                    )}
                    <Link
                        href="/contact"
                        className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full transition shadow-lg shadow-pink-500/20"
                    >
                        สอบถามราคา
                    </Link>
                </div>

            </main>
        </div>
    );
}
