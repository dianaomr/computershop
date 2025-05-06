"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
// import "../../components/aboutus/aboutus.css";

interface CategoryItem {
  title: string;
  desc: string;
}

interface Category {
  id: string;
  title: string;
  data: CategoryItem[];
}

interface Slide {
  image: string;
  title: string;
  text: string;
}

const categories: Category[] = [
  {
    id: "ecommerce",
    title: "تجارت الکترونیک",
    data: [
      { title: "5/5 میلیون", desc: "متوسط بازدید روزانه" },
      { title: "2M+", desc: "کاربران فعال ماهانه" },
      { title: "30K+", desc: "تعداد فروشندگان" },
      { title: "50%", desc: "سهم بازار آنلاین" },
      { title: "500M$", desc: "درآمد سالانه" },
    ],
  },
  {
    id: "content",
    title: "محتوا",
    data: [
      { title: "3M+", desc: "مشترکین" },
      { title: "10M+", desc: "بازدید روزانه" },
      { title: "5K+", desc: "محتوای جدید روزانه" },
      { title: "90%", desc: "رضایت کاربران" },
    ],
  },
  {
    id: "logistics",
    title: "لجستیک",
    data: [
      { title: "10M+", desc: "سفارشات تحویل‌شده" },
      { title: "95%", desc: "تحویل به موقع" },
      { title: "1K+", desc: "مراکز ارسال" },
      { title: "100M$", desc: "سرمایه‌گذاری" },
      { title: "50+", desc: "شهرهای تحت پوشش" },
      { title: "24/7", desc: "پشتیبانی لجستیکی" },
    ],
  },
  {
    id: "fintech",
    title: "فناوری مالی",
    data: [
      { title: "1M+", desc: "تراکنش‌های روزانه" },
      { title: "5M$", desc: "پرداخت‌های پردازش‌شده" },
      { title: "10K+", desc: "پذیرندگان جدید" },
    ],
  },
];

const slides: Slide[] = [
  {
    image: "https://about.digikala.com/wp-content/uploads/2022/07/Digikala-annual-report-1400-21-1024x683.jpg",
    title: "سرمایه های انسانی",
    text: "سرمایه های انسانی",
  },
  {
    image: "https://about.digikala.com/wp-content/uploads/2022/03/logestics-operation-1024x384.jpg",
    title: "زیرساخت عملیات",
    text: "زیرساخت عملیات",
  },
  {
    image: "https://about.digikala.com/wp-content/uploads/2022/02/man.png",
    title: "پشت هر لبخند",
    text: "پشت هر لبخند",
  },
  {
    image: "https://about.digikala.com/_next/static/media/digikalaGroupImage.0034fbb2.svg",
    title: "گروه ما",
    text: "گروه ما",
  },
  {
    image: "https://about.digikala.com/wp-content/uploads/2022/07/Digikala-annual-report-1400-18-2.jpg",
    title: "زیرساخت فناوری",
    text: "زیرساخت فناوری",
  },
];

const companyImages: string[] = [
  "https://about.digikala.com/_next/static/media/dkLogo.f922bee5.svg",
  "https://about.digikala.com/_next/static/media/dkJet.6f6c0a25.svg",
  "https://about.digikala.com/_next/static/media/dkBusiness.4d8b7c25.svg",
  "https://about.digikala.com/_next/static/media/fidibo.f7169ead.svg",
  "https://about.digikala.com/_next/static/media/digiStyle.0887672d.svg",
  "https://about.digikala.com/_next/static/media/digify.012aaf42.svg",
  "https://about.digikala.com/_next/static/media/dkMehr.981bc374.svg",
  "https://about.digikala.com/_next/static/media/bomimahali.64be1eff.svg",
];

export default function AboutUs() {
  const [activeCategory, setActiveCategory] = useState<string>("ecommerce");

  return (
    <div dir="rtl" className="w-full flex flex-col items-center rtl text-right">
      {/* اسلایدشو */}
      <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} className="w-full h-screen">
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-between p-10">
              <div className=" text-red text-right flex">
                <h2 className="title text-4xl font-bold">{slide.title} |</h2>
                <p className="detail mt-2 text-lg">{slide.text}</p>
              </div>
              <button className="button-more">بیشتر بخوانید</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تب‌ها */}
      <div className="w-full flex justify-center space-x-4 my-8">
        {categories.map(({ id, title }) => (
          <button key={id} onClick={() => setActiveCategory(id)} className={`button-category ${activeCategory === id ? "active" : ""}`}>
            {title}
          </button>
        ))}
      </div>

      {/* اطلاعات */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100 rounded-lg shadow-lg">
        {categories.find((cat) => cat.id === activeCategory)?.data.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* شرکت‌ها */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100 rounded-lg mr-20">
        {companyImages.map((image, index) => (
          <div key={index} className="w-32 h-16 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
            <img src={image} alt={`Company ${index + 1}`} className="object-contain w-full h-full p-4 cursor-pointer" />
          </div>
        ))}
      </div>

      <div className="video relative flex justify-center mt-10 mb-10">
         <video autoPlay loop className="max-w-full h-auto rounded-lg shadow-lg">
           <source src="https://about.digikala.com/_next/static/media/AboutDigikalaVideo.30cf695062d2ea591f7429872b623204.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8">
           <h1 className="text-4xl text-white font-bold">کالا اکسپلور</h1>
           <p className="text-lg text-white mt-4">تا امروز 5000+ نفر از دیجی‌کالا بازدید کرده‌اند</p>
          <button className="video-button">
            سفر به دنیای دیجیتال
          </button>
         </div>
       </div>

    </div>
  );
}

