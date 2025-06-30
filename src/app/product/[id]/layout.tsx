
 "use client"
// import "../../../styles/globals.scss";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import QueryProvider from "@/components/admin/providers/query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="fa">
        <ReduxProvider store={store}>
          <QueryProvider>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </QueryProvider>
        </ReduxProvider>
    </div>
  );
}
