/* eslint-disable @next/next/no-css-tags */
import { fetchBrandingItems } from "@/services/brandingService";
import { getItem } from "@/services/Item/item";
import { getMenuFooter } from "@/services/menu/menuService";
import { fetchMenuItems } from "@/services/menuService";
import { getPopUpsData } from "@/services/popups/popups";
import { getSettings } from "@/services/settings/settingsService";
// import "@/styles/leaflet.css";
import { mainDomainImg } from "@/utils/mainDomain";
import "@ant-design/v5-patch-for-react-19";
import { Toaster } from "react-hot-toast";
// import "./../../public/fa/css/all.min.css";
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
  const brandItems = await fetchBrandingItems();
  const itemsSupport = await getItem({
    TypeId: 1015,
    LangCode: "fa",
    CategoryIdArray: 3227,
  });
  const socialNetworks = await getItem({
    TypeId: 8,
    LangCode: "fa",
  });
  const footerMenu = await getMenuFooter();
  const popupsData = await getPopUpsData();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="/style/style.css" />
      </head>

      <body>
        <AntdRegistry
          settings={settings}
          menuItems={menuItems}
          brandItems={brandItems}
          itemsSupport={itemsSupport.sort((a, b) => b.priority - a.priority)}
          socialNetworks={socialNetworks}
          footerMenu={footerMenu}
          popupsData={popupsData}
        >
          {children}
        </AntdRegistry>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
