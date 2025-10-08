/* eslint-disable @next/next/no-css-tags */

// import "@/styles/leaflet.css";
import "@ant-design/v5-patch-for-react-19";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "react-circular-progressbar/dist/styles.css";

import Layout from "@/components/Layout";
import "./globals.css";
import { getSettings } from "@/services/settings/settingsService";




const settings = await getSettings();

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="/style/style.css" />
      </head>

      <body>
        <Layout settings={settings}>{children}</Layout>

        {/* <Toaster position="top-center" /> */}
      </body>
    </html>
  );
}
