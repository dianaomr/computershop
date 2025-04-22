// app/layout.tsx
export const metadata = {
    title: 'سایت من',
    description: 'یک پروژه با دو بخش کلاینت و ادمین',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="fa" dir="rtl">
        <body>{children}</body>
      </html>
    );
  }
  
