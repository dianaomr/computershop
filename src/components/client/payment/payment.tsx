

'use client'

import { useRouter } from 'next/navigation'
import styles from './PaymentMock.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";

const PaymentPage = () => {
  
  return (
    <div className={styles.container}>
      <img
        src="/images/payment_mock.png"
        alt="درگاه پرداخت"
        className={styles.mockImage}
      />

      <div className={styles.buttons}>
        <button >
          پرداخت
        </button>
        <button >
          انصراف
        </button>
      </div>
    </div>
  )
}

export default PaymentPage
