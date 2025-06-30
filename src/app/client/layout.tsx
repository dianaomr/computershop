
"use client";
import "../../styles/globals.scss";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import QueryProvider from "@/components/admin/providers/query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="client-side">
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

