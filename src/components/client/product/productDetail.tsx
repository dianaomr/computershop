"use client";
import React, { useState } from "react";
import type { Product } from "@/utils/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addToFavorites, removeFromFavorites } from "@/redux/slices/favoriteSlice";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RootState } from "@/redux/store";

import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  FileText,
  Store,
  CheckCircle,
} from "lucide-react";

interface Props {
  product: Product;
}

const ProductDetail: React.FC<Props> = ({ product }) => {
  const { data } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const handleAddToCart = () => {
    if (product.stock && quantity > product.stock) {
      alert("تعداد انتخابی بیشتر از موجودی کالا است!");
      return;
    }

    dispatch(addToCart({ product, quantity }));
    setShowModal(true);
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

  const increment = () => {
    if (!product.stock || quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const relatedProducts = data?.records.slice(0, 10) || [];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* عکس محصول */}
  <div className="w-full">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-80 object-cover rounded"
    />
  </div>

  {/* جزئیات محصول */}
  <div className="flex flex-col gap-4 w-full">
    <div className="flex justify-between items-start">
      <h1 className="text-2xl font-bold">{product.name}</h1>

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


    <p>برند: {product.brand}</p>
    <h1 className="font-semibold text-xl">جزئیات محصول :</h1>
    <p>دسته‌بندی: {product.category}</p>
    <p>ویژگی: {product.feature}</p>
    <p>جنسیت: {product.gender}</p>
    <p>
      موجودی:{" "}
      {typeof product.stock === "number"
        ? formatPrice(product.stock)
        : "نامشخص"}
    </p>
  </div>

  {/* خلاصه خرید */}
  <div className="border p-4 rounded bg-gray-50 w-full h-fit">
    <h2 className="text-lg font-semibold mb-4">خلاصه خرید</h2>
    <p className="mb-2">قیمت واحد: {formatPrice(product.price)} تومان</p>

    <div className="flex items-center justify-between mb-2">
      <span>تعداد:</span>
      <div className="flex items-center gap-3">
        <button onClick={decrement} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <span>{quantity}</span>
        <button onClick={increment} className="px-2 py-1 bg-gray-300 rounded">+</button>
      </div>
    </div>

    <p className="mb-4 font-bold">
      قیمت کل: {formatPrice(quantity * product.price)} تومان
    </p>

    <button
      onClick={handleAddToCart}
      className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 transition flex items-center justify-center gap-2"
    >
      <ShoppingCart size={18} />
      افزودن به سبد خرید
    </button>
  </div>
</div>



      {/* توضیحات محصول */}
      <div className="mt-12">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="text-xl font-semibold flex items-center gap-2 mb-2"
        >
          <FileText size={20} />
          توضیحات محصول
          {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showDescription && (
          <p className="leading-7 text-gray-800">{product.description}</p>
        )}
      </div>

      {/* محصولات مشابه */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Store size={20} />
          محصولات مشابه
        </h2>
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {relatedProducts.map((p) => (
            <SwiperSlide key={p.id}>
              <Link href={`/product/${p.id}`}>
                <div className="p-2 bg-white rounded shadow-md text-center w-full h-54">
                  <img src={p.image} alt={p.name} className="w-full h-38 object-cover rounded" />
                  <h3 className="font-bold mt-2">{p.name}</h3>
                  <p>قیمت: {formatPrice(p.price)} تومان</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* مودال اضافه شدن به سبد خرید */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <CheckCircle className="CheckCircle w-16 h-16 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-4">✅ محصول به سبد خرید اضافه شد</h2>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => router.push('/client/cart')}
                className="text-white px-4 py-2 rounded w-1/2"
              >
                مشاهده سبد خرید
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded w-1/2"
              >
                ادامه خرید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

