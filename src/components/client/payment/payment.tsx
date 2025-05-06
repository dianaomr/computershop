
'use client'

import { useRouter } from 'next/navigation';
import styles from './PaymentMock.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { createOrder } from "@/utils/orderService"; 
import { setLatestOrder } from "@/redux/slices/latestOrderSlice";


const PaymentPage = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePay = async () => {
    const customer = JSON.parse(localStorage.getItem("customer") || "{}");

    if (cart.length && customer.name) {
      const items = cart.map(item => ({
        product: {
          id: item.product.id || "", 
          name: item.product.name
        },
        quantity: item.quantity
      }));

      const orderData = {
        customer,
        items,
        total: cart.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        ),
        createdAt: new Date().toISOString(),
        delivered: false,
        deliveredAt: undefined ,
      };

      try {
        await createOrder(orderData);
        dispatch(setLatestOrder(orderData));

        dispatch(clearCart());
        router.push("/client/payment-succes");
      } catch (error) {
        console.error("ثبت سفارش با خطا مواجه شد:", error);
      }
    }
  };

  const handleCancel = () => {
    router.push('/client/payment-fail');
  };

  return (
    <div className={styles.container}>
      <img
        src="/images/payment_mock.png"
        alt="درگاه پرداخت"
        className={styles.mockImage}
      />
      <div className={styles.buttons}>
        <button className={styles.payButton} onClick={handlePay}>
          پرداخت
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          انصراف
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

