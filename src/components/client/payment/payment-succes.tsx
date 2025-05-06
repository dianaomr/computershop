
'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
  const order = useSelector((state: RootState) => state.latestOrder.order);

  if (!order) return <p>سفارشی یافت نشد.</p>;

  return (
    <div dir='rtl' className="max-w-xl mx-auto p-4 bg-white shadow rounded">
                <CheckCircle className=" CheckCircle w-16 h-16 mx-auto mb-4" />
      <h2 className="text-center text-xl font-bold mb-4"> سفارش شما با موفقیت ثبت شد 🎉</h2>
      <p className='text-right'> {order.customer.name} <strong>نام مشتری:</strong></p>
      <p className='text-right'>{new Date(order.createdAt).toLocaleDateString('fa-IR')} <strong>تاریخ:</strong> </p>
      <hr className="my-2" />
      <ul className="space-y-2">
        {order.items.map((item: any, idx: number) => (
          <li key={idx} className="flex justify-between">
            <span>{item.product.name}</span>
            <span>{item.quantity.toLocaleString('fa-IR')} عدد</span>
          </li>
        ))}
      </ul>
      <hr className="my-2" />
      <p className="font-bold">جمع کل: {order.total.toLocaleString('fa-IR')} تومان</p>
    </div>
  );
};

export default PaymentSuccessPage;
