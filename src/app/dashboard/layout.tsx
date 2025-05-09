
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import QueryProvider from '../../components/admin/providers/query-provider';
import AdminSidebar from '../../components/common/sidebar';
import ReduxProvider from '@/providers/reduxprovider';
import "@/styles/globals.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      router.push("/client/PanelLogin");
    } else {
      setIsAuthorized(true);
    }

    setCheckedAuth(true);
  }, []);

  if (!checkedAuth || !isAuthorized) {
    return null; // هیچ چیز نمایش داده نشود
  }

  return (
    
        <div>
        <QueryProvider>
          <ReduxProvider>
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-grow">{children}</main>
            </div>
          </ReduxProvider>
        </QueryProvider>
        </div>
  );
}

