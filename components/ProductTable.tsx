// components/ProductTable.tsx

import Link from 'next/link';

// Type Definition สำหรับสินค้า (ควรตรงกับ data/products.json)
interface Product {
    slug: string;
    name: string;
    category: string;
    price: string;
    github_repo_url: string; // ข้อมูลที่ใช้ดึง README.md
}

interface ProductTableProps {
    products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
    if (products.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                ไม่พบสินค้าในหมวดหมู่นี้
            </div>
        );
    }

    return (
        // 🎯 Key Fix: เพิ่ม overflow-x-auto ที่นี่
        <div className="shadow-md sm:rounded-lg overflow-x-auto"> 
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {/* ปรับให้คอลัมน์สำคัญมีความกว้างพอสมควร */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                            ชื่อสินค้า/บริการ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                            หมวดหมู่
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                            ราคา
                        </th>
                        <th className="px-6 py-3 min-w-[120px]"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.slug} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                                {product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link 
                                    href={`/products/${product.slug}`}
                                    className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150"
                                >
                                    ดูรายละเอียด →
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}