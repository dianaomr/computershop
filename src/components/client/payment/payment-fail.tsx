"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";

export default function PaymentFailPage() {
  return (
    <div className="text-center py-16">
         <h1 className="text-3xl font-bold text-green-600">پرداخت شما با خطا مواجه شد</h1>
         <p className="mt-4 text-lg">سفارش شما ثبت نشد! </p>
       </div>
  );

}
