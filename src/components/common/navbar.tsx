"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header dir="rtl" className="w-full">
      {/* Top section: logo and search */}
      <div className="header flex flex-col md:flex-row justify-between items-center p-4 md:p-6 gap-4">
        <img
          src="https://www.irantimer.com/Images/Style_v2/Logo_IT_Black.png"
          width="150"
          className="object-contain"
          alt="لوگو"
        />
        <input
          type="search"
          placeholder="جستجو کنید"
          className="border w-full md:w-96 h-10 rounded-3xl px-4"
        />
      </div>

      {/* Nav section */}
      <nav className="navbar">
        <div className="flex justify-between items-center px-4 md:px-24 py-4">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Logo or icon */}
          {/* <div className="hidden md:block text-3xl font-bold">
            <img
              src="https://about.digikala.com/_next/static/media/fidibo.f7169ead.svg"
              alt="آیکون"
            />
          </div> */}

          {/* Desktop Menu */}
          <ul className="navbar hidden md:flex space-x-10 text-lg space-x-reverse">
            <li><Link href="/client">خانه</Link></li>
            <li><Link href="/client/products">محصولات</Link></li>
            <li><Link href="/client/aboutus">درباره ما</Link></li>
            <li><Link href="/client/contactus">تماس با ما</Link></li>
            <li><Link href="/client/cart">سبد خرید</Link></li>
            <li></li>
            <li><Link href="/client/login">ورود / ثبت نام</Link></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="navbar md:hidden flex flex-col bg-black px-4 pb-4 space-y-4 text-lg">
            <li><Link href="/client">خانه</Link></li>
            <li><Link href="/client/products">محصولات</Link></li>
            <li><Link href="/client/aboutus">درباره ما</Link></li>
            <li><Link href="/client/contactus">تماس با ما</Link></li>
            <li><Link href="/client/cart">سبد خرید</Link></li>
            <li><Link href="/client/login">ورود / ثبت نام</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
