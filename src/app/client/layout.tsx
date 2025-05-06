
"use client";

// import { Vazir } from "next/font/google";  // تغییر به فونت فارسی
import "../../styles/globals.scss";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import QueryProvider from "@/components/admin/providers/query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

// const vazir = Vazir({ variable: "--font-vazir", subsets: ["latin", "arabic"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      {/* <body className={`${vazir.variable} antialiased`}> */}
      <body>
        <ReduxProvider store={store}>
          <QueryProvider>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

