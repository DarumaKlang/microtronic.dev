// app/products/[slug]/page.tsx

import { getMarkdownAsHtml } from '@/utils/markdown';
import products from '@/data/products.json'; // The static product list

// Define the shape of product data
interface Product {
    slug: string;
    name: string;
    category: string;
    price: string;
    github_repo_url: string;
}

// 1. Generate Static Params (Pre-render all product pages at build time)
// This ensures fast loading and excellent SEO (SSG).
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}


// 2. The Product Detail Server Component
export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product: Product | undefined = products.find(p => p.slug === params.slug);

    if (!product) {
        // Handle 404 Not Found (Important for Next.js)
        return <h1>404 - Product Not Found</h1>;
    }

    // Fetch and convert the external README.md to HTML
    const productHtmlContent = await getMarkdownAsHtml(product.github_repo_url);

    // Line OA Link (Replace with your actual Line OA ID/URL)
    const lineOaUrl = 'https://line.me/ti/p/@YOUR_LINE_OA_ID';
    const ctaMessage = `สวัสดีครับ ผมสนใจ ${product.name} รหัสสินค้า ${product.slug} ต้องการขอรายละเอียดและใบเสนอราคาครับ`;

    // Encode the message to be part of the URL (for the context strategy)
    const lineOaDeepLink = `${lineOaUrl}?text=${encodeURIComponent(ctaMessage)}`;

    return (
        <div className="container mx-auto p-4">

            {/* Product Header */}
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">Price: {product.price}</p>

            {/* 📞 Call to Action (CTA) - (1.3) */}
            <a
                href={lineOaDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300 mb-8"
            >
                คุยกับเซลล์ทันทีผ่าน Line OA
            </a>

            {/* 📖 Product Details from README.md (1.2) */}
            <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Product Technical Details</h2>

            {/* Renders the HTML generated from Markdown. 
          NOTE: The 'dangerouslySetInnerHTML' flag is used because the source 
          is controlled (your own GitHub repos) and has been sanitized by remark/rehype.
      */}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: productHtmlContent }}
            />

        </div>
    );
}