// "use client";
// // /app/client/payment-success/page.tsx
// const PaymentSuccessPage = () => {
//     return (
//       <div className="text-center py-16">
//         <h1 className="text-3xl font-bold text-green-600">پرداخت با موفقیت انجام شد ✅</h1>
//         <p className="mt-4 text-lg">سفارش شما با موفقیت ثبت شد. ممنون از خرید شما!</p>
//       </div>
//     );
//   };
  
//   export default PaymentSuccessPage;
  
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";

export default function PaymentSuccessPage() {
  return (
    <div className="text-center py-16">
         <h1 className="text-3xl font-bold text-green-600">پرداخت با موفقیت انجام شد ✅</h1>
         <p className="mt-4 text-lg">سفارش شما با موفقیت ثبت شد. ممنون از خرید شما!</p>
       </div>
  );

}

