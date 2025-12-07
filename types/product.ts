// types/product.ts

// ประกาศ Type เดียวที่ใช้ร่วมกันทุกไฟล์
export interface Product {
    slug: string;
    name: string;
    category: string;
    price: string;
    github_repo_url: string; 
    // ต้องมี field นี้เพื่อให้ ProductGrid ใช้งานได้
    preview_image_url: string; 
}