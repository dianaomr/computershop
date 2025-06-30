'use client';

import { useState } from 'react';
import styles from './signup.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
// import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export const API_KEY = "omraniUhv3cmCFgVPhMsO7R5MYFpAc1kK53fG4GJw9eLdRg9EzOFA6yv81sInUi8PJLkPyIfQOi3oR4ZKXt4keheKYqmjfov9EgwQUky4phCNcsbiAgtmGrhEnyPDVng";

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('ایمیل معتبر نیست');
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error('رمز باید حداقل ۶ کاراکتر، شامل حرف و عدد باشد');
      return;
    }

    try {
      const response = await fetch('http://api.alikooshesh.ir:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ثبت‌نام ناموفق بود');
      }

      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('signedUpUser', JSON.stringify({ email, password }));
        toast.success('ثبت‌نام موفقیت‌آمیز بود');
        router.push('/client/login');
      } else {
        toast.error('توکن از سرور دریافت نشد');
      }
    } catch (error) {
      toast.error((error as Error).message || 'خطا در ارتباط با سرور');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>ثبت‌نام</h1>
        <input
          type="text"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='relative'>
        <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute mt-2 ml-1 text-gray-600 hover:text-black transition"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>

        </div>
        
        <button onClick={handleSignup}>ثبت‌نام</button>

        <div className={styles.divider}>یا</div>
        <div className={styles.socials}>
          <button className={styles.google}>Google</button>
          <button className={styles.facebook}>Facebook</button>
        </div>
        <h1 className={styles.redirect}>
          قبلاً ثبت‌نام کردی؟ <Link href="/client/login">ورود</Link>
        </h1>
      </div>
    </div>
  );
}
