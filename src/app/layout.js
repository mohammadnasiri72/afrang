/* eslint-disable @next/next/no-css-tags */
import "@ant-design/v5-patch-for-react-19";
import "react-circular-progressbar/dist/styles.css";
import Layout from "@/components/Layout";
import { getSettings } from "@/services/settings/settingsService";
import "./globals.css";

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
