import Layout from "@/components/Layout";
import '@/styles/leaflet.css';
import { mainDomainImg } from "@/utils/mainDomain";
import "@ant-design/v5-patch-for-react-19";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./../../public/style/style.css";

export const metadata = {
  description: "خانه عکاسان افرنگ",
  icons: {
    icon: `${mainDomainImg}/uploads/logo/favicon.ico`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
     

      <body>
        <Layout>{children}</Layout>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
