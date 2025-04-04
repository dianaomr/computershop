"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import CartItem from "./cart-item";
import { useRouter } from "next/navigation";
// import { RootState } from "@/redux/store";
// import { clearCart } from "@/redux/reducers/cartReducer";
import { CartItem as CartItemType } from "@/types/product";

export default function Cart() {
  return (
    <div>
        <h1>Your Cart</h1>
    </div>
  );
}
