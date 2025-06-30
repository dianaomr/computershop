"use client";

import StatsCard from "./StatsCard";
import Chart from "./chart";
import VideoBackground from "./VideoBackground";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); 

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.push("/client/PanelLogin");
    } else {
      setIsAuthorized(true); 
    }
  }, []);

  // در حال بررسی وضعیت دسترسی
  if (isAuthorized === null) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-bold">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="relative p-3 rounded-md min-h-screen text-black overflow-hidden">
      <VideoBackground />

      <div className="dashboard-main relative z-10 px-3 sm:px-3 lg:px-3 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-start">
          داشبورد مدیریت
        </h1>

        <div className="dasboard-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatsCard title="فروش امروز" value="۲,۵۰۰,۰۰۰ تومان" />
          <StatsCard title="سفارشات جدید" value="۳۲" />
          <StatsCard title="کاربران فعال" value="۱۲۰" />
          <StatsCard title="محصولات موجود" value="۳۵" />
        </div>

        <div className="opacity-90 backdrop-blur-sm rounded-xl shadow-md p-4 md:p-6 border border-black mb-10">
          <Chart />
        </div>

        <div className="w-full flex justify-center">
          <video
            autoPlay
            loop
            muted
            className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-lg pt-30 rounded-md"
          >
            <source src="/videos/chart_large.mp4" type="video/mp4" />
            مرورگر شما از ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      </div>
    </div>
  );
}