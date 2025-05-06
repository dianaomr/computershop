
 "use client"
import { Geist, Geist_Mono } from "next/font/google";
import "../../../styles/globals.scss";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import QueryProvider from "@/components/admin/providers/query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
