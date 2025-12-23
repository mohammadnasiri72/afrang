import Layout from "@/components/Layout";
import { getSettings } from "@/services/settings/settingsService";
import "@ant-design/v5-patch-for-react-19";
import CustomRouteLoader from "./CustomRouteLoader";
import "./globals.css";

export const revalidate = 3600;

// fallback settings برای مواقعی که API جواب نمی‌دهد
const FALLBACK_SETTINGS = [
  { propertyKey: "site_scripts", value: "" },
  // سایر تنظیمات ضروری
];

export default async function RootLayout({ children }) {
  let settings = FALLBACK_SETTINGS;
  
  try {
    const rawSettings = await getSettings();
    
    // بررسی اینکه آیا خطا برگردانده یا timeout خورده
    if (rawSettings && !rawSettings.type) {
      settings = Array.isArray(rawSettings) ? rawSettings : FALLBACK_SETTINGS;
    } 
  } catch (error) {
    
  }
  

  return (
    <html lang="fa" dir="rtl">
      <head>
       
        
        {/* <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" /> */}
        <link rel="preload" href="/style/style.css" as="style" />
        <link rel="stylesheet" href="/style/style.css" />
      </head>

      <body>
        <CustomRouteLoader />
        <Layout settings={settings}>{children}</Layout>
        {/* <FooterScripts propertyValue={siteScripts} /> */}
      </body>
    </html>
  );
}