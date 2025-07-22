// src/components/Footer.tsx
// ไม่ต้องใช้ "use client"; ก็ได้ ถ้า Footer ไม่มี interactive elements
export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Microtronic. All rights reserved.</p>
      </div>
    </footer>
  );
}
