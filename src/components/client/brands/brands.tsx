"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setBrandFilter } from "@/redux/slices/filterSlice";
import Image from "next/image";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

interface Slide {
  image: string;
  title: string;
  text: string;
}
const slides: Slide[] = [
  {
    image:
    "/images/brands/slidecasio.jpg",
    title: "برند ها",
    text: "کاسیو",
  },
  {
    image: "/images/brands/slidecitizen.jpg",
    title: "برند ها",
    text: "سیتیزن",
  },
  {
    image: "/images/brands/slideseiko.jpg",
    title: "برند ها",
    text: "سیکو",
  },
  {
    image:
    "/images/brands/sliderolex.jpg",
    title: "برند ها",
    text: "رولکس",
  },
  
];

const brandFilters = [
  { brand: "کاسیو", image: "/images/brands/casio.png" },
  { brand: "رولکس", image: "/images/brands/rolex1.jpg" },
  { brand: "امگا", image: "/images/brands/omega.png" },
  { brand: "سیتیزن", image: "/images/brands/citizen.jpg" },
  { brand: "سیکو", image: "/images/brands/seiko.png" },
  { brand: "فسیل", image: "/images/brands/fossil.png" },
  { brand: "تیسوت", image: "/images/brands/tissot.jpg" },
  { brand: "سواچ", image: "/images/brands/swatch.png" },


];

export default function BrandsContainer() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBrandClick = (brand: string) => {
    dispatch(setBrandFilter(brand));
    router.push("/client/products");
  };

  return (
    <div>
         {/* اسلایدشو */}
         <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-11/12 h-96 pt-10 rounded-xl "
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-between p-10">
                <div className=" text-red text-right flex">
                  <h2 className="title text-4xl font-bold">{slide.title} |</h2>
                  <p className="detail mt-2 text-lg">{slide.text}</p>
                </div>
                <button className="button-more">بیشتر</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

    <div className="w-full p-6 flex flex-wrap gap-16 justify-center">
      {brandFilters.map((item) => (
        <div
          key={item.brand}
          onClick={() => handleBrandClick(item.brand)}
          className="cursor-pointer hover:scale-105 transition-all max-w-[200px]"
        >
          <Image
            src={item.image}
            alt={item.brand}
            width={200}
            height={200}
            className="rounded-lg object-cover w-full h-auto"
          />
          <p className="text-center mt-2 text-black font-bold">{item.brand}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
