
// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Head from "next/head";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../styles/auth.scss";

// // Modal
// interface ModalProps {
//   show: boolean;
//   setShow: (value: boolean) => void;
//   content: string;
// }

// const Modal: React.FC<ModalProps> = ({ show, setShow, content }) => {
//   const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
//     if ((e.charCode || e.keyCode) === 27) {
//       setShow(false);
//     }
//   };

//   useEffect(() => {
//     document.body.addEventListener("keydown", closeOnEscapeKeyDown);
//     return () => {
//       document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
//     };
//   }, []);

//   return (
//     <section className={`overlay ${show ? "show" : ""}`} onClick={() => setShow(false)}>
//       <section className={`modal ${show ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
//         <p style={{ fontWeight: "600" }}>{content}</p>
//         <p>
//           Check out <a href="https://joeyimlay.dev">joeyimlay.dev</a>.
//         </p>
//         <button onClick={() => setShow(false)}>Close</button>
//       </section>
//     </section>
//   );
// };

// // Social Icons
// interface SocialIconsProps {
//   handleClick: (msg: string) => void;
// }

// const SocialIcons: React.FC<SocialIconsProps> = ({ handleClick }) => (
//   <section className="social-icons">
//     <button className="icon" type="button" onClick={() => handleClick("You're authorised with Google.")}>
//       <i className="fab fa-google"></i>
//     </button>
//     <button className="icon" type="button" onClick={() => handleClick("You're authorised with Facebook.")}>
//       <i className="fab fa-facebook-f"></i>
//     </button>
//     <button className="icon" type="button" onClick={() => handleClick("You're authorised with Microsoft.")}>
//       <i className="fab fa-microsoft"></i>
//     </button>
//     <button className="icon" type="button" onClick={() => handleClick("You're authorised with Amazon.")}>
//       <i className="fab fa-amazon"></i>
//     </button>
//   </section>
// );

// // Form validation schemas
// const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// const signupSchema = z
//   .object({
//     signupName: z.string().min(1, { message: "Name must be at least 1 character." }),
//     signupEmail: z.string().email({ message: "Invalid email address." }),
//     signupPassword: z.string().regex(passwordRegex, {
//       message: "Password must be 8+ chars, 1 number & 1 special character.",
//     }),
//     signupConfirm: z.string().min(8),
//   })
//   .superRefine(({ signupPassword, signupConfirm }, ctx) => {
//     if (signupPassword !== signupConfirm) {
//       ctx.addIssue({
//         code: "custom",
//         message: "Passwords do not match.",
//       });
//     }
//   });

// const loginSchema = z.object({
//   loginEmail: z.string().email({ message: "Invalid email address." }),
//   loginPassword: z.string().regex(passwordRegex, {
//     message: "Password must be 8+ chars, 1 number & 1 special character.",
//   }),
// });

// const SlidingLogin = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const router = useRouter();

//   const useZodForm = <T extends Record<string, any>>(schema: z.ZodType<T>) => {
//     return useForm<T>({ resolver: zodResolver(schema) });
//   };

//   const signupForm = useZodForm(signupSchema);
//   const loginForm = useZodForm(loginSchema);

//   const handleClick = (msg: string) => {
//     setModalContent(msg);
//     setShowModal(true);
//   };
  
//   const handleSignup = (data: z.infer<typeof signupSchema>) => {
//     console.log('Signup Data:', data); // چاپ داده‌های ساین‌آپ برای بررسی
//     handleClick(`Thanks for signing up, ${data.signupName}!`);
    
//     // ذخیره کوکی‌ها
//     Cookies.set("auth_token", "true", { expires: 1 }); // کوکی اعتبارسنجی
//     Cookies.set("user_name", data.signupName, { expires: 1 }); // ذخیره نام کاربر
//     Cookies.set("user_email", data.signupEmail, { expires: 1 }); // ذخیره ایمیل کاربر
    
//     // هدایت به داشبورد پس از 1 ثانیه
//     setTimeout(() => {
//       router.push("/client/checkout");
//     },9000);
//   };
  
//   const handleLogin = (data: z.infer<typeof loginSchema>) => {
//     console.log('Login Data:', data); // چاپ داده‌های لاگین برای بررسی
//     handleClick("Successfully logged in!");
    
//     // ذخیره کوکی‌ها
//     Cookies.set("auth_token", "true", { expires: 1 }); // کوکی اعتبارسنجی
//     Cookies.set("user_email", data.loginEmail, { expires: 1 }); // ذخیره ایمیل کاربر
    
//     // هدایت به داشبورد پس از 1 ثانیه
//     setTimeout(() => {
//       router.push("/client/checkout");
//     }, 9000);
//   };
  
  
  
//   return (
//     <>
//       <Head>
//         <title>Sliding Login</title>
//       </Head>
//       <main className={showLogin ? "active" : ""} id="container">
//         <section className="form-container create">
//           <h2>Create your account</h2>
//           <SocialIcons handleClick={handleClick} />
//           <span>Alternatively, sign up via email:</span>
//           <form onSubmit={signupForm.handleSubmit(handleSignup)}>
//             <input type="text" placeholder="Name" {...signupForm.register("signupName")} />
//             <input type="email" placeholder="Email" {...signupForm.register("signupEmail")} />
//             <input type="password" placeholder="Password" {...signupForm.register("signupPassword")} />
//             <input type="password" placeholder="Confirm password" {...signupForm.register("signupConfirm")} />
//             <button type="submit">Sign Up</button>
//             <span className="error">
//               {Object.values(signupForm.formState.errors)[0]?.message &&
//                 `Error: ${Object.values(signupForm.formState.errors)[0]?.message}`}
//             </span>
//           </form>
//         </section>

//         <section className="form-container login">
//           <h2>Log into your account</h2>
//           <SocialIcons handleClick={handleClick} />
//           <span>Alternatively, log in via email:</span>
//           <form onSubmit={loginForm.handleSubmit(handleLogin)}>
//             <input type="email" placeholder="Email" {...loginForm.register("loginEmail")} />
//             <input type="password" placeholder="Password" {...loginForm.register("loginPassword")} />
//             <button type="submit">Log In</button>
//             <a onClick={() => handleClick("It's okay, we all forget things sometimes.")} className="forgot-password">
//               Forgot your password?
//             </a>
//             <span className="error">
//               {Object.values(loginForm.formState.errors)[0]?.message &&
//                 `Error: ${Object.values(loginForm.formState.errors)[0]?.message}`}
//             </span>
//           </form>
//         </section>

//         <section className="toggle-container">
//           <div className="toggle">
//             <div className="toggle-panel toggle-create">
//               <h1>Welcome back!</h1>
//               <p>It's good to see you again.</p>
//               <button className="toggle-button" onClick={() => setShowLogin(false)}>
//                 Sign up instead
//               </button>
//             </div>
//             <div className="toggle-panel toggle-login">
//               <h1>Hello there!</h1>
//               <p>It's nice to meet you.</p>
//               <button className="toggle-button" onClick={() => setShowLogin(true)}>
//                 Log in instead
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Modal show={showModal} setShow={setShowModal} content={modalContent} />
//     </>
//   );
// };

// export default SlidingLogin;

// app/login/page.tsx
'use client';

import { useState } from 'react';
import styles from './login.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mockUsers = [
  { username: 'ali', password: '1234' },
  { username: 'sara', password: 'abcd' },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      router.push('/payment');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>ورود</h2>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLogin}>ورود</button>

        <div className={styles.divider}>یا</div>
        <div className={styles.socials}>
          <button className={styles.google}>Google</button>
          <button className={styles.facebook}>Facebook</button>
        </div>

        <p className={styles.redirect}>
          حساب نداری؟ <Link href="/client/signup">ثبت‌نام</Link>
        </p>
      </div>
    </div>
  );
}
