// types/product.ts

// ประกาศ Type เดียวที่ใช้ร่วมกันทุกไฟล์
export interface Product {
    slug: string;
    name: string;
    category: string;
    price: string;
    github_repo_url: string;
    preview_image_url: string;
    direct_url?: string;
    demo_url?: string;
    description?: string;
}