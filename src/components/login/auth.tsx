
'use client';

import { useState } from 'react';
import styles from '@/signup.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
// import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
    const savedUserJSON = localStorage.getItem('signedUpUser');
    const accessToken = localStorage.getItem('accessToken');

    if (savedUserJSON && accessToken) {
      const savedUser = JSON.parse(savedUserJSON);

      // بررسی اینکه اطلاعات واردشده با اطلاعات ساین‌اپ یکی هست
      if (savedUser.email === email && savedUser.password === password) {
        toast.success('ورود موفقیت‌آمیز بود');
        router.push('/client/checkout'); 
        return;
      }
    }

    toast.error('اطلاعات نادرست است یا هنوز ثبت‌نام نکرده‌اید');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>ورود</h1>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='relative'>
        <input
          type="password"
          placeholder="رمز عبور..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          // type="span"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute mt-2 ml-1 text-gray-600 hover:text-black transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>

        </div>
        <button onClick={handleLogin}>ورود</button>

        <div className={styles.divider}>یا</div>
        <div className={styles.socials}>
          <button className={styles.google}>Google</button>
          <button className={styles.facebook}>Facebook</button>
        </div>

        <h1 className={styles.redirect}>
          حساب نداری؟ <Link href="/client/signup">ثبت‌نام</Link>
        </h1>
      </div>
    </div>
  );
}
