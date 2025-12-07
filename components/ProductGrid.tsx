// components/ProductGrid.tsx

import Link from 'next/link';
import Image from 'next/image'; // ใช้ Next/Image เพื่อจัดการรูปภาพให้มีประสิทธิภาพ
import { Product } from '@/types/product'; // ⬅️ นำเข้า Product Interface

interface ProductGridProps {
    products: Product[];
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
        // 🎯 ใช้ Grid Layout ที่ responsive (1 คอลัมน์บนมือถือ, 2 บน md, 3 บน lg, 4 บน xl)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                    key={product.slug}
                    className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                >
                    <Link href={`/products/${product.slug}`} legacyBehavior>
                        {/* 🖼️ ส่วนแสดงรูปภาพพรีวิว */}
                        <div className="relative w-full h-48 bg-gray-200">
                            {/* NOTE: ควรตรวจสอบว่า product.preview_image_url มีข้อมูลที่ถูกต้อง */}
                            <Image
                                src={product.preview_image_url || '/placeholder.jpg'}
                                alt={`Preview of ${product.name}`}
                                layout="fill"
                                objectFit="cover"
                                className="transition duration-500 group-hover:opacity-90"
                            />
                        </div>
                    </Link>

                    {/* 📝 ส่วนรายละเอียดสินค้า */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold h-12 overflow-hidden mb-2">
                            <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
                                {product.name}
                            </Link>
                        </h3>

                        <p className="text-sm text-gray-500 mb-4">{product.category}</p>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                            <span className="text-xl font-bold text-gray-200">
                                {product.price}
                            </span>

                            {/* 🛒 ปุ่ม CTA/ตะกร้าสินค้า (สามารถปรับเป็น "ดูรายละเอียด" ได้) */}
                            <Link href={`/products/${product.slug}`} legacyBehavior>
                                <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 p-2 rounded-full transition duration-150">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.824l.798 4.792c.3.568.58 1.488.58 2.302v.089m6-8.233V18a2.25 2.25 0 0 1-2.25 2.25H16.5m-14.4-12H18.527a2.25 2.25 0 0 1 2.245 2.067l1.037 10.373A2.25 2.25 0 0 1 19.522 22.5H6.527A2.25 2.25 0 0 1 4.282 20.433L3.75 16.5m0 0 .963-4.103a4.501 4.501 0 0 1 8.927 0m-1.745 1.745 1.745-1.745" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}