

"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
      {cart.length === 0 ? (
        <p>سبد خرید خالی است</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="border p-4 rounded flex justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-30 h-35 object-cover rounded"
                />
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="font-bold">برند:{item.product.brand}</p>
                  <p>قیمت: {formatPrice(item.product.price)} تومان</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  className="w-16 border rounded p-1"
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
          <p className="font-bold">مجموع: {formatPrice(Number(total.toFixed(2)))} تومان</p>
          <button
            onClick={() => router.push("/client/checkout")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            نهایی‌سازی خرید
          </button>
        </div>
      )}
    </div>
  );
}
