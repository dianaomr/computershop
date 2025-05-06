
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { setDoneOrders, setSelectedDoneOrder } from "@/redux/slices/orderDoneSlice";
import { getDeliveredOrders } from "@/utils/orderService";
import type { Order } from "@/types/order";

const PanelOrdersDone = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder } = useSelector(
    (state: RootState) => state.orderDone
  );

  const { data, isLoading, error } = useQuery<Order[], Error>({
    queryKey: ["doneOrders"],
    queryFn: getDeliveredOrders,
  });

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US"); // 1,250,000
    const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    return toPersianDigits;
  };

  useEffect(() => {
    if (data) {
      dispatch(setDoneOrders(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت سفارشات</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">سفارشات تحویل داده شده</h1>
      <ul className="hidden md:flex space-x-10 text-lg space-x-reverse">
        <li className="m-6">
          <Link href="/dashboard/PanelOrders">سفارشات در انتظار تحویل</Link>
        </li>
        <li className="m-6">
          <Link href="/dashboard/PanelOrdersDone">سفارشات تحویل داده شده</Link>
        </li>
      </ul>

      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th>نام مشتری</th>
            <th>آدرس</th>
            <th>محصولات</th>
            <th>مبلغ</th>
            <th>تاریخ ثبت</th>
            <th>تاریخ تحویل</th>
            <th>بررسی</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id} className="text-center border-t">
              <td>{order.customer.name}</td>
              <td>{order.customer.address}</td>
              <td>
                {order.items.map((item: any) => (
                  <div key={item.product.id}>
                    {item.product.name} × {item.quantity}
                  </div>
                ))}
              </td>
              <td className="p-3">{formatPrice(order.total)} تومان</td>
              <td className="p-3">{new Date(order.createdAt).toLocaleString("fa-IR")}</td>
              <td className="p-3">{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString("fa-IR") : "-"}</td>
              <td>
                <button
                  className="bg-black text-white px-3 py-1 rounded"
                  onClick={() => dispatch(setSelectedDoneOrder(order))}
                >
                  بررسی
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">جزئیات سفارش</h2>
            <p><strong>نام مشتری:</strong> {selectedOrder.customer.name}</p>
            <p><strong>آدرس:</strong> {selectedOrder.customer.address}</p>
            <p><strong>محصولات:</strong></p>
            <ul className="list-disc pl-5">
              {selectedOrder.items.map((item: any) => (
                <li key={item.product.id}>
                  {item.product.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>مبلغ کل:</strong> ${selectedOrder.total}</p>
            <p><strong>تاریخ ثبت:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            <p><strong>تاریخ تحویل:</strong> {selectedOrder.deliveredAt ? new Date(selectedOrder.deliveredAt).toLocaleString() : "-"}</p>

            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => dispatch(setSelectedDoneOrder(null))}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelOrdersDone;
