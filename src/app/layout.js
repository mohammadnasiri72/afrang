import { fetchMenuItems } from "@/services/menuService";
import { getSettings } from "@/services/settings/settingsService";
import "@/styles/leaflet.css";
import { mainDomainImg } from "@/utils/mainDomain";
import "@ant-design/v5-patch-for-react-19";
import { Toaster } from "react-hot-toast";
import AntdRegistry from "./AntdRegistry";
import "./globals.css";

export const metadata = {
  description: "خانه عکاسان افرنگ",
  icons: {
    icon: `${mainDomainImg}/uploads/logo/favicon.ico`,
  },
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  const menuItems = await fetchMenuItems();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="/style/style.css" />
      </head>

      <body>
        <AntdRegistry settings={settings} menuItems={menuItems}>
          {children}
        </AntdRegistry>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
