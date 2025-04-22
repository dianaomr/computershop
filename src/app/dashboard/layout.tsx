

import QueryProvider from "../../components/admin/providers/query-provider";
import AdminSidebar from '../../components/admin/sidebar';
import ReduxProvider from '@/providers/reduxprovider';

import "@/styles/globals.scss";

export const metadata = {
  title: "پنل مدیریت",
  description: "مدیریت محصولات، سفارشات و کاربران",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl"> 
      <body>
       
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-grow">{children}</main>
            </div>
         
      </body>
    </html>
  );
}

