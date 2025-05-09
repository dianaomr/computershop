"use client";

import Link from "next/link";
import type { Product } from "@/utils/productService";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { addToFavorites, removeFromFavorites } from "@/redux/slices/favoriteSlice";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock && quantity > product.stock) {
      alert("تعداد انتخابی بیشتر از موجودی کالا است!");
      return;
    }
    dispatch(addToCart({ product, quantity }));
    toast.success("محصول به سبد خرید اضافه شد!");
  };

  const handleFavoriteClick = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setShowModal(true);
      return;
    }
  
    if (!product.id) {
      toast.error("شناسه محصول نامعتبر است");
      return;
    }
  
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success("از علاقه‌مندی‌ها حذف شد!");
    } else {
      dispatch(addToFavorites(product));
      toast.success("به علاقه‌مندی‌ها اضافه شد!");
    }
  };
  
  return (
    <li
      dir="rtl"
      className="pro-card bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col gap-2"
    >
      <div className="text-left">
        {isFavorite ? (
          <FaHeart
            size={30}
            className="FaHeart cursor-pointer hover:scale-110 transition"
            onClick={handleFavoriteClick}
          />
        ) : (
          <FaRegHeart
            size={30}
            className="cursor-pointer hover:scale-110 transition"
            onClick={handleFavoriteClick}
          />
        )}
      </div>

      <Link href={`/product/${product.id}`}>
        <div className="w-full h-30 overflow-hidden rounded-xl cursor-pointer text-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {product.brand && (
        <p className="text-sm text-center text-gray-400">{product.brand}</p>
      )}

      <Link href={`/product/${product.id}`}>
        <h3 className="text-lg text-center font-semibold text-gray-800 line-clamp-1 cursor-pointer border-b">
          {product.name}
        </h3>
      </Link>

      <p className="text-base text-center font-semibold mt-auto">
        {formatPrice(product.price)} تومان
      </p>

      <div className="flex gap-2 text-center justify-center">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-80 text-center space-y-4">
            <h2 className="text-lg font-semibold text-black">
              برای افزودن به لیست علاقه‌مندی‌ها ابتدا وارد شوید
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push("/client/login")}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                ورود
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProductCard;
