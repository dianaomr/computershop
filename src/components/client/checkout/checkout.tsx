
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    code: "",
  });

  // بررسی توکن در هنگام لود کامپوننت
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("برای ادامه باید وارد شوید");
      router.push("/client/login"); 
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("customer", JSON.stringify(formData));
    router.push("/client/payment");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">اطلاعات مشتری</h1>
      <input
        name="name"
        placeholder="نام"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="نام خانوادگی"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="تلفن"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="آدرس"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />
      <input
        name="code"
        placeholder="کد پستی"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        ادامه به پرداخت
      </button>
    </form>
  );
}
