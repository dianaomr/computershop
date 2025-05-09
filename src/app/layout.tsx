import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "../styles/globals.scss"
export const metadata = {
    title: ' ایران تایمر',
    description: ' پروژه با دو بخش کلاینت و ادمین',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="fa" dir="rtl">
       <body>
        <Providers>{children}</Providers>
      </body>
      <Toaster/>
      </html>
    );
  }
  
