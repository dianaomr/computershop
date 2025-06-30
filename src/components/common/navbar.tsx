
"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/redux/slices/filterSlice";
import { RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/utils/productService";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const filteredProducts = useMemo(() => {
    if (!data?.records) return [];

    return data.records.filter((product: Product) =>
      product.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [filters.search, data]);

  useEffect(() => {
    if (filters.search.length >= 2 && filteredProducts.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [filters.search, filteredProducts]);

  return (
    <header dir="rtl" className="w-full relative z-50">
      <div className="header flex flex-col md:flex-row justify-between items-center p-4 md:p-6 gap-4">
        <img
          src="https://www.irantimer.com/Images/Style_v2/Logo_IT_Black.png"
          width="150"
          className="object-contain"
          alt="لوگو"
        />

        <div className="w-full md:w-96 relative">
          <input
            type="search"
            placeholder="جستجو کنید"
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            onFocus={() => {
              if (filteredProducts.length > 0) setShowDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="search-input border w-full h-10 rounded-3xl px-4 text-white "
          />

          {showDropdown && (
            <div className="search-drop absolute top-12 w-full bg-white shadow-xl rounded-xl border max-h-80 overflow-y-auto z-50">
              {filteredProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="flex items-center gap-4 p-2 border-b hover:bg-black hover:text-white transition"
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-blue  ">{item.name}</span>
                    <span className="text-green-600 font-semibold  ">{item.price?.toLocaleString()} تومان</span>
                  </div>
                </Link>
              ))}

              {filteredProducts.length === 0 && (
                <div className="p-2 text-center text-sm text-gray-600">موردی یافت نشد</div>
              )}
            </div>
          )}
        </div>
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

          {/* Desktop Menu */}
          <ul className="navbar hidden md:flex space-x-10 text-lg">
            <li><Link href="/">خانه</Link></li>
            <li><Link href="/client/products">محصولات</Link></li>
            <li><Link href="/client/brands">برند ها</Link></li>
            <li><Link href="/client/aboutus">درباره ما</Link></li>
            <li><Link href="/client/contactus">تماس با ما</Link></li>
          </ul>
          <div className="flex justify-between gap-4">
          <div className="relative">
  <Link href="/client/cart">
    <ShoppingCart size={30} />
    {cart.items.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {formatPrice(cart.items.length)}
      </span>
    )}
  </Link>
</div>

          <p><Link href="/client/favorites"><FaHeart size={29} className="FaHeart cursor-pointer hover:scale-110 transition"/></Link></p>
          <button><Link href="/client/login">ورود / ثبت نام</Link></button>
        </div>
          </div>
            

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="navbar md:hidden flex flex-col bg-black px-4 pb-4 space-y-4 text-lg">
            <li><Link href="/">خانه</Link></li>
            <li><Link href="/client/products">محصولات</Link></li>
            <li><Link href="/client/aboutus">درباره ما</Link></li>
            <li><Link href="/client/contactus">تماس با ما</Link></li>
           

          </ul>
          
        )}

      </nav>
    </header>
  );
};

export default Navbar;

