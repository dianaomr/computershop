'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import "@/styles/globals.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

  
  export default function AdminSidebar() {
    
    return (
      <aside className="sidebar w-72 bg-black p-4 border-r h-screen sticky top-0">
        <h2 className="text-2xl font-bold text-white mb-6">پنل مدیریت</h2>
        
      </aside>
    );
  }