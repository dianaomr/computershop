
"use client";
import usePersianNumbers from "@/utils/usePersianNumbers"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Link from "next/link";
import {
  setOrders,
  setSelectedOrder,
  markOrderAsDelivered,
} from "@/redux/slices/orderSlice";
import {
  setDoneOrders,
  setSelectedDoneOrder,
} from "@/redux/slices/orderDoneSlice";
import {
  getPendingOrders,
  getDeliveredOrders,
  markAsDeliveredAPI,
} from "@/utils/orderService";
import type { Order } from "@/types/order";
import { useEffect, useState } from "react";

// Pagination استایل‌یافته
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center gap-2 pt-4">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded border border-black ${
            currentPage === idx + 1
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          } transition`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

const PanelOrders = () => {
  usePersianNumbers();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { orders, selectedOrder } = useSelector((state: RootState) => state.orders);
  const { orders: doneOrders, selectedOrder: selectedDoneOrder } = useSelector(
    (state: RootState) => state.orderDone
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"pending" | "done">("pending");

  const itemsPerPage = 5;

  const {
    data: pendingData,
    isLoading: loadingPending,
    error: errorPending,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getPendingOrders,
    enabled: activeTab === "pending", 
  });
  
  const {
    data: doneData,
    isLoading: loadingDone,
    error: errorDone,
  } = useQuery<Order[], Error>({
    queryKey: ["doneOrders"],
    queryFn: getDeliveredOrders,
    enabled: activeTab === "done", 
  });

  useEffect(() => {
    if (pendingData && activeTab === "pending") dispatch(setOrders(pendingData));
    if (doneData && activeTab === "done") dispatch(setDoneOrders(doneData));
  }, [pendingData, doneData, activeTab, dispatch]);
  
  const deliveryMutation = useMutation({
    mutationFn: markAsDeliveredAPI,
    onSuccess: (_, id) => {
      dispatch(markOrderAsDelivered(id));
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["doneOrders"] }); 
    },
  });

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US"); 
    const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    return toPersianDigits;
  };
  

  const filteredOrders = (activeTab === "pending" ? orders : doneOrders).filter(
    (order) =>
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isLoading = activeTab === "pending" ? loadingPending : loadingDone;
  const error = activeTab === "pending" ? errorPending : errorDone;

  const currentSelectedOrder =
    activeTab === "pending" ? selectedOrder : selectedDoneOrder;

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت سفارشات</p>;
  return (
    <div className="p-6 space-y-6 text-black">
      <h1 className="text-2xl font-bold">مدیریت سفارشات</h1>

      {/* تب‌ها */}
      <div className="flex gap-4 text-sm border-b pb-2">
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "pending"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white border"
          }`}
          onClick={() => {
            setActiveTab("pending");
            setCurrentPage(1);
            setSearchTerm("");
          }}
        >
          سفارشات در انتظار
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "done"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white border"
          }`}
          onClick={() => {
            setActiveTab("done");
            setCurrentPage(1);
            setSearchTerm("");
          }}
        >
          سفارشات تحویل شده
        </button>
      </div>

      {/* جستجو */}
      <input
        type="text"
        placeholder="جستجو بر اساس نام مشتری..."
        className="border border-black px-3 py-2 rounded-md focus:outline-none max-w-sm w-full"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* جدول سفارشات */}
      <div className="overflow-x-auto border border-black rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">نام مشتری</th>
              <th className="p-3">آدرس</th>
              <th className="p-3">محصولات</th>
              <th className="p-3">مبلغ</th>
              <th className="p-3">تاریخ</th>
              <th className="p-3">بررسی</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-white transition">
                <td className="p-3">{order.customer.name}</td>
                <td className="p-3">{order.customer.address}</td>
                <td className="p-3 text-right">
                  {order.items.map((item: any) => (
                    <div key={item.product.id}>
                      {item.product.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-3">{formatPrice(order.total)} تومان</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleString("fa-IR")}</td>
                <td className="p-3">
                  <button
                    className="bg-black text-white p-3 rounded hover:bg-white hover:text-black border border-black transition"
                    onClick={() =>
                      dispatch(
                        activeTab === "pending"
                          ? setSelectedOrder(order)
                          : setSelectedDoneOrder(order)
                      )
                    }
                  >
                    بررسی
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* پیجینیشن */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* مودال بررسی */}
      {currentSelectedOrder && (
        <div dir="rtl" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div dir="rtl" className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">جزئیات سفارش</h2>
            <p className="text-right">{currentSelectedOrder.customer.name} <strong>نام مشتری:</strong></p>
            <p className="text-right">{currentSelectedOrder.customer.address} <strong> آدرس :</strong> </p>
            <p className="text-right"><strong>محصولات:</strong></p>
            <ul className="list-disc pl-5">
              {currentSelectedOrder.items.map((item: any) => (
                <li key={item.product.id}>
                  {item.product.name} × {item.quantity}
                  {item.product.image}
                </li>
              ))}
            </ul>
            <p><strong>مبلغ کل:</strong>{formatPrice(currentSelectedOrder.total)} تومان</p>
            <p><strong>تاریخ ثبت:</strong> {new Date(currentSelectedOrder.createdAt).toLocaleString("fa-IR")}</p>
            
            <div className="mt-6 flex justify-between">
              {activeTab === "pending" && (
                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition"
                  onClick={() => deliveryMutation.mutate(currentSelectedOrder.id)}
                >
                  تحویل شد
                </button>
              )}
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() =>
                  dispatch(
                    activeTab === "pending"
                      ? setSelectedOrder(null)
                      : setSelectedDoneOrder(null)
                  )
                }
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

export default PanelOrders;
