"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      router.push("/dashboard/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "diana omrani" && password === "1234@diana") {
      Cookies.set("auth_token", "diana_token", { expires: 1 });
      router.push("/dashboard/");
    } else {
      setError("نام کاربری یا رمز عبور نادرست است.");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      {/* پس‌زمینه مورب بالا چپ با لوگو */}
      <div className="absolute inset-0 clip-top z-10 flex items-start justify-end p-24">
        <img
          src="https://www.irantimer.com/Images/Style_v2/Logo_IT_Black.png"
          alt="logo"
          className="w-64 h-auto"
        />
      </div>

      {/* پس‌زمینه مورب پایین راست */}
      <div className="absolute inset-0 bg-white clip-bottom z-10"></div>

      {/* فرم لاگین */}
      <div className="relative z-20 flex items-end justify-start h-full p-10">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">ورود به پنل مدیریت</h2>

          <div>
            <label className="block mb-1 text-gray-600">نام کاربری</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" نام و نام خانوادگی"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-gray-600">رمز عبور</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-xl border border-black focus:ring-2 focus:ring-black focus:outline-none transition-all pl-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور..."
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-86 top-[29px] text-gray-600 hover:text-black transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-all"
          >
            ورود
          </motion.button>
        </motion.form>
      </div>

      {/* استایل‌های مورب */}
      <style jsx>{`
        .clip-top {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
        .clip-bottom {
          clip-path: polygon(100% 100%, 0 100%, 100% 0);
        }
      `}</style>
    </div>
  );
}
