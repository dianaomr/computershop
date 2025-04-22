
import DashboardPage from '@/components/admin/panel/dashboard/dashboard';

export default function DashboardPanel() {
  return <DashboardPage />;
}

// 'use client';

// import { useEffect, useState } from "react";
// import ProductPanel from "../../components/admin/panel/panel-product";
// import Cookies from 'js-cookie';

// export default function Dashboard() {
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // useEffect(() => {
//   //   // const user = localStorage.getItem("loggedInUser");
//   //   const token = Cookies.get("auth_token");

//   //   if (token) {
//   //     setIsAuthenticated(true);
//   //   } else {
//   //     window.location.href = "/login";
//   //   }
//   // }, []);

//   // if (!isAuthenticated) return null;

//   return (
//     <div>
//       <DashboardPage/>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// // import ProductPanel from "./panel-product";
// import ProductPanel from "../../components/admin/panel/panel-product";

// import { useRouter } from "next/navigation"; // برای app router
// import Cookies from "js-cookie";
// import { motion } from "framer-motion";

// export default function DashboardPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("auth_token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username === "diana omrani" && password === "1234@diana") {
//       Cookies.set("auth_token", "diana_token", { expires: 1 }); // ذخیره به مدت 1 روز
//       setIsAuthenticated(true);
//       setError("");
//     } else {
//       setError("نام کاربری یا رمز عبور نادرست است.");
//     }
//   };

//   // if (isAuthenticated) {
//   //   return (
//   //     <div className="p-6">
//   //       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//   //       <ProductPanel />
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
//       <motion.form
//         onSubmit={handleLogin}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
//       >
//         <h2 className="text-2xl font-semibold text-center text-gray-800">ورود به پنل</h2>

//         <div>
//           <label className="block mb-1 text-gray-600">نام کاربری</label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="مثال: diana omrani"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-gray-600">رمز عبور</label>
//           <input
//             type="password"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="رمز عبور..."
//           />
//         </div>

//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-500 text-sm"
//           >
//             {error}
//           </motion.p>
//         )}

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           type="submit"
//           className="w-full py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-all"
//         >
//           ورود
//         </motion.button>
//       </motion.form>
//     </div>
//   );
// }

