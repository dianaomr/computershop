
"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/utils/productService";


export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const discountedTotal = isDiscountApplied ? total * 0.8 : total;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "off20") {
      setIsDiscountApplied(true);
      alert("کد تخفیف اعمال شد!");
    } else {
      setIsDiscountApplied(false);
      alert("کد تخفیف نامعتبر است");
    }
  };

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const handleCheckout = () => {
    localStorage.setItem("finalAmount", discountedTotal.toString());
    router.push("/client/checkout");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
      {cart.length === 0 ? (
        <p>سبد خرید خالی است</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* لیست محصولات */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <Link href={`/product/${item.product.id}`}>
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-28 h-28 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold">{item.product.name}</p>
                    <p className="text-gray-500">برند: {item.product.brand}</p>
                    <p>قیمت: {formatPrice(item.product.price)} تومان</p>
                  </div>
                </div>
                </Link>
                <div className="flex flex-col gap-2 items-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id!,
                          quantity: parseInt(e.target.value),
                        })
                      )
                    }
                    className="w-16 border rounded p-1 text-center"
                  />
                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.product.id!))
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* خلاصه سفارش */}
          <div className="border p-4 rounded space-y-4 h-fit sticky top-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">خلاصه سفارش</h2>
            <p>مجموع بدون تخفیف: {formatPrice(total)} تومان</p>
            {isDiscountApplied && (
              <p className="text-green-600 font-semibold">
                تخفیف ۲۰٪ اعمال شده!
              </p>
            )}
            <p className="font-bold text-lg">
              مبلغ نهایی: {formatPrice(discountedTotal)} تومان
            </p>

            <div className="space-y-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف را وارد کنید"
                className="w-full border rounded p-2"
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition"
              >
                اعمال کد تخفیف
              </button>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-black text-white w-full py-2 rounded hover:bg-gray-700 transition"
            >
              نهایی‌سازی خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
