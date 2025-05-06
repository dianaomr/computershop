"use client";

import Link from "next/link";
import type { Product } from "@/utils/productService";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    return toPersianDigits;
  };
  const handleAddToCart = () => {
    if (product.stock && quantity > product.stock) {
      alert("تعداد انتخابی بیشتر از موجودی کالا است!");
      return;
    }

    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Link href={`/product/${product.id}`}>
      <li
        dir="rtl"
        className="pro-card bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col gap-2"
      >
        <div className="w-full h-48 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>

        {/* <p className="text-sm text-gray-500">{product.category}</p> */}

        {product.brand && (
          <p className="text-sm text-gray-400">برند: {product.brand}</p>
        )}

        <p className="text-base font-bold mt-auto">
          قیمت: {formatPrice(product.price)} تومان
        </p>
        <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
          </button>
      </li>
    </Link>
  );
};

export default ProductCard;
