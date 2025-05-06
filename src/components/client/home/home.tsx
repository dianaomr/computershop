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
      "https://www.irantimer.com/Images/Banner/HomeTop1/425202523820PMda48eb01fe0c4c8eaf54bb930703ab1c.jpg",
    title:"",
    text: "",
  },
 
  {
    image: "https://www.irantimer.com/Images/Banner/HomeTop1/425202523557PMca10ff75e4d5451f982ffbc0ea161c5e.jpg",
    title: "",
    text: "",
  },
  {
    image: "https://www.irantimer.com/Images/Article/Medium/0510de27261e4fe686e64fb7444fcdcb.jpg",
    title: "",
    text: "",
  },
  
];
const secslides: Slide[] = [
  {
    image:
      "https://www.irantimer.com/Images/Article/Medium/a53507a53a1e4f0593e5324d2fae2407.jpg",
    title: "",
    text: "",
  },
  {
    image:
      "https://www.irantimer.com/Images/Article/Medium/ba6e451060b242ef8d129a45f781b48e.jpg",
    title: "",
    text: "",
  },
  {
    image: "https://www.irantimer.com/Images/Article/Medium/97fb8ac89e97415a949b887cc1d79a0b.jpg",
    title: "",
    text: "",
  },
  {
    image:
      "https://www.irantimer.com/Images/Article/Medium/c67be7ffef85480e85cb1dfaff3f23a6.jpg",
    title: "",
    text: "",
  },
];


export default function AboutUs() {
  const [activeCategory, setActiveCategory] = useState<string>("ecommerce");

  return (
    <div className="home-page">
      <div dir="rtl" className="w-full flex gap-4 items-center rtl text-right p-10 ">
        {/* اسلایدشو */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-11/12 h-80 "
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="relative w-11/12 h-80 bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-between p-10 rounded-md">
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
          className="w-8/12 h-96"
        >
          {secslides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-between p-10 rounded-md">
                <div className=" text-red text-right flex">
                  <h2 className="title text-4xl font-bold">{slide.title} |</h2>
                  {/* <p className="detail mt-2 text-lg">{slide.text}</p> */}
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
