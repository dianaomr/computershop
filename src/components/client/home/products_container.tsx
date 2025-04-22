
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productService";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setGenderFilter, setFeatureFilter , setPriceFilter } from "@/redux/slices/filterSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";


export default function ProductsContainer() {
  

  return (
    <div className="product-container w-full text-black p-8 space-y-10">
     
    </div>
  );
}
