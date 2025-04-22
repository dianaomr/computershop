'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import "@/styles/globals.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const adminLinks = [
  { label: "داشبرد",  href: "/dashboard" },
    { label: "مدیریت محصولات", href: "/dashboard/PanelProduct" },
    { label:" موجودی محصولات", href:"/dashboard/PanelQuantity"},
    { label: "سفارشات", href: "/dashboard/PanelOrders" },
    { label: "کاربران", href: "/dashboard/users" },
    // { label: "تنظیمات", href: "/dashboard/settings" },
  ];
  
  export default function AdminSidebar() {
    const pathname = usePathname();  
    const router = useRouter();
    const handleLogout = () => {
      Cookies.remove("auth_token");
      router.push("/client/PanelLogin");
    };

    return (
      <aside className="sidebar w-72 bg-black p-4 border-r h-screen sticky top-0">
        <h2 className="text-2xl font-bold text-white mb-6">پنل مدیریت</h2>
        <ul className="sidebar-items-text space-y-2 font-bold text-xl">
          {adminLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "sidebar-items-box block px-4 py-2 rounded transition-all",
                  pathname === link.href && "bg-black font-semibold"  
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
        onClick={handleLogout}
        className="exit font-bold mt-8 w-full py-2 rounded-xl transition-all text-white"
      >
        خروج
      </button>
      </aside>
    );
  }