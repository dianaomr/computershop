
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
import Link from "next/link";


const genderFilters = [
  { gender: "مردانه", image: "/images/male.jpg" },
  { gender: "زنانه", image: "/images/female.jpg" },
  { gender: "یونیسکس", image: "/images/unisex.jpg" },
];

const featureFilters = [
  { feature: "GPS", image: "/images/gps.jpg" },
  { feature: "ضد آب", image: "/images/waterproof.jpg" },
  { feature: "نمایشگر تاریخ", image: "/images/date.jpg" },
  { feature: "ساعت جهانی", image: "/images/worldtime.jpg" },
  { feature: "کرنومتر", image: "/images/chronograph.jpg" },
  { feature: "بلوتوث", image: "/images/bluetooth.jpg" },
];

const priceRanges = [
  { min: 0, max: 3000000, label: " تا ۳", image: "/images/price1.jpg" },
  // { min: 3000, max: 6000, label: "۳۰۰۰ تا ۶۰۰۰", image: "/images/price2.jpg" },
  { min: 3000000, max: 9000000, label: "۳ تا ۹", image: "/images/price2.jpg" },
  { min: 9000000, max: 15000000, label: "۹ تا ۱۵", image: "/images/price3.jpg" },
  { min: 15000000, max: Infinity, label: "بیشتر از ۱۵", image: "/images/price4.jpg" },
];

export default function ProductsContainer() {
  const { data } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const dispatch = useDispatch();
  const router = useRouter();

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    return toPersianDigits;
  };

  const handleGenderClick = (gender: string) => {
    dispatch(setGenderFilter(gender));
    router.push("/client/products");
  };

  const handleFeatureClick = (feature: string) => {
    dispatch(setFeatureFilter(feature));
    router.push("/client/products");
  };

  const handleFilterClick = (min: number, max: number) => {
    dispatch(setPriceFilter({ min, max }));
    router.push("/client/products");
  };
  const relatedProducts = data?.records.slice(0, 10) || [];


  return (
    <div className="product-container w-full text-black p-8 space-y-10">
        {/* فیلتر بر اساس جنسیت */}
        <div className="flex justify-center gap-2 flex-wrap">
          {genderFilters.map((item) => (
            <div
              key={item.gender}
              onClick={() => handleGenderClick(item.gender)}
              className="cursor-pointer hover:opacity-80 transition-all"
            >
              <Image src={item.image} width={390} height={300} alt={item.gender} className="rounded" />
            </div>
          ))}
        </div>

      
<div className="mt-6 bg-white p-2 rounded-md grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
  <div className="col-span-1 flex  m-4 items-center rounded-md min-h-[100px] ">
    <img className=" flex h-[200px] w-full text-center items-center justify-center rounded-md "   src="/images/slide.jpg"></img>
  </div>

  <div className="col-span-3">
    <h2 className="text-lg font-semibold mb-2 text-right mr-4 text-black">محصولات پرطرفدار</h2>
    <Swiper
      spaceBetween={12}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="w-full"
    >
      {relatedProducts.map((p) => (
        <SwiperSlide key={p.id}>
          <Link href={`/product/${p.id}`}>
            <div className="slider-card p-2 -botton-10 bg-white rounded-md shadow hover:shadow-md transition w-full text-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-32 object-contain rounded-md"
              />
              <h3 className="font-medium mt-2 text-sm">{p.name}</h3>
              <p className="text-md "> {formatPrice(p.price)} تومان</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
      {/* فیلتر بر اساس ویژگی */}
      <div>
      <h1 className="text-xl font-semibold text-center p-4 "> انتخاب بر اساس ویژگی</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {featureFilters.map((item) => (
          <div
            key={item.feature}
            onClick={() => handleFeatureClick(item.feature)}
            className="cursor-pointer hover:opacity-80 transition-all"
          >
            <Image src={item.image} width={160} height={150} alt={item.feature} className="rounded-md" />
          </div>
        ))}
      </div>
      </div>

      {/* فیلتر بر اساس قیمت */}
      <h1 className="text-xl font-semibold text-center p-4 m-0"> انتخاب بر اساس قیمت</h1>
      <div className="flex justify-center overflow-x-auto gap-6 p-4 w-full ">
        {priceRanges.map((range, index) => (
          <div
            key={index}
            className="min-w-[150px] cursor-pointer relative hover:scale-105 transition-transform"
            onClick={() => handleFilterClick(range.min, range.max)}
          >
            <Image
              src={range.image}
              alt={range.label}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <div className="absolute bottom-0 w-full text-center text-black bg-white/50 py-1">
              {range.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
