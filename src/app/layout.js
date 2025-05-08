import Layout from "@/components/Layout";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { mainDomainImg } from "@/utils/mainDomain";

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
      </body>
    </html>
  );
}
