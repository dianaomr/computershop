import { Toaster } from "react-hot-toast";

// app/layout.tsx
export const metadata = {
    title: ' ایران تایمر',
    description: ' پروژه با دو بخش کلاینت و ادمین',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="fa" dir="rtl">
        <body>{children}</body>
        <Toaster/>
      </html>
    );
  }
  
