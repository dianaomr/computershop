
"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import Link from "next/link";

export default function CartPage() {
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
      </div>
  );
}
