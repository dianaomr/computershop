"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ProductsContainer from "./products_container";
interface Slide {
  image: string;
  title: string;
  text: string;
}
const slides: Slide[] = [
  {
    image:
      "https://iranconverse.com/wp-content/uploads/2025/03/oct11-08-copy.webp",
    title: "سرمایه های انسانی",
    text: "سرمایه های انسانی",
  },
  {
    image: "https://iranconverse.com/wp-content/uploads/2024/12/1.webp",
    title: "زیرساخت عملیات",
    text: "زیرساخت عملیات",
  },
  {
    image: "https://iranconverse.com/wp-content/uploads/2024/12/2-1.jpg",
    title: "پشت هر لبخند",
    text: "پشت هر لبخند",
  },
  {
    image:
      "https://conversetehran.com/wp-content/uploads/2023/07/conversetehran-background-left-2.webp",
    title: "گروه ما",
    text: "گروه ما",
  },
  {
    image:
      "https://conversetehran.com/wp-content/uploads/2023/07/conversetehran-background-right.webp",
    title: "زیرساخت فناوری",
    text: "زیرساخت فناوری",
  },
];
const secslides: Slide[] = [
  {
    image:
      "https://iranconverse.com/wp-content/uploads/2024/10/IMG_0460-copy-1639x2048.webp",
    title: " VANS ",
    text: "سرمایه های انسانی",
  },
  {
    image:
      "https://iranconverse.com/wp-content/uploads/2024/10/IMG_0578-copy-2-1638x2048.webp",
    title: "CONVER",
    text: "زیرساخت عملیات",
  },
  {
    image:
      "https://iranconverse.com/wp-content/uploads/2024/10/88-1638x2048.webp",
    title: " VISION ",
    text: "پشت هر لبخند",
  },
  {
    image:
      "https://iranconverse.com/wp-content/uploads/2024/10/ert-1638x2048.webp",
    title: "CROCS",
    text: "گروه ما",
  },
];
const thirdSlides: Slide[] = [
  {
    image:
      "https://www.modiseh.com/media/wysiwyg/Winter1403/Nowruz_1404-Desktop_Size.jpg",
    title: " VANS ",
    text: "سرمایه های انسانی",
  },
  {
    image:
      "https://www.modiseh.com/media/wysiwyg/Winter1403/Gift_Gift-Desktop_Size.jpg",
    title: "CONVER",
    text: "زیرساخت عملیات",
  },
  {
    image: "https://www.modiseh.com/media/wysiwyg/Bahar1404/shahr_-Desktop.jpg",
    title: " VISION ",
    text: "پشت هر لبخند",
  },
  {
    image: "https://www.modiseh.com/media/wysiwyg/Bahar1404/_-Desktop_copy.jpg",
    title: "CROCS",
    text: "گروه ما",
  },
];

export default function AboutUs() {
  const [activeCategory, setActiveCategory] = useState<string>("ecommerce");

  return (
    <div>
      <div dir="rtl" className="w-full flex gap-4 items-center rtl text-right">
        {/* اسلایدشو */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-11/12 h-96 "
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

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-8/12 h-screen"
        >
          {secslides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-between p-10">
                <div className=" text-red text-right flex">
                  <h2 className="title text-4xl font-bold">{slide.title} |</h2>
                  {/* <p className="detail mt-2 text-lg">{slide.text}</p> */}
                </div>
                <button className="button-more">بیشتر</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-11/12 h-96 "
        >
          {thirdSlides.map((slide, index) => (
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
      </div>
      <ProductsContainer />
    </div>
  );
}
