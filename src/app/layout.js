import Layout from "@/components/Layout";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { mainDomainImg } from "@/utils/mainDomain";
import '@/styles/leaflet.css';
import { Toaster } from "react-hot-toast";

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
