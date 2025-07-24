'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
 href: string;
 icon: React.ReactNode;
 label: string;
 isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => {
 const activeClasses = isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600';

 return (
  <Link href={href} className="flex flex-col items-center justify-center flex-grow group">
   <div className={`text-xl ${activeClasses}`}>
    {icon}
   </div>
   <span className={`text-xs mt-1 ${activeClasses}`}>
    {label}
   </span>
  </Link>
 );
};

const BottomNavigationBar: React.FC = () => {
 const pathname = usePathname();

 return (
  <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50">
   <nav className="relative max-w-md mx-auto bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2 mb-4">
    <div className="h-16 flex justify-around items-center">
     <NavItem
      href="/home"
      icon={<i className="fas fa-home"></i>}
      label="Home"
      isActive={pathname === '/home'}
     />
     <NavItem
      href="/history"
      icon={<i className="fas fa-history"></i>}
      label="History"
      isActive={pathname === '/history'}
     />
     <NavItem
      href="/profile"
      icon={<i className="fas fa-user"></i>}
      label="Profile"
      isActive={pathname === '/profile'}
     />
    </div>
   </nav>
  </div>
 );
};

export default BottomNavbar;