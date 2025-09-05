/** @type {import('next').NextConfig} */
const nextConfig = {
    // ตั้งค่าสำหรับ next/image เพื่ออนุญาตให้ใช้รูปภาพจากโดเมนภายนอก
    images: {
        // แนะนำให้ใช้ remotePatterns สำหรับการควบคุมที่ละเอียดกว่า
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
