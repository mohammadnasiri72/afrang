/* eslint-disable @next/next/no-css-tags */
import Layout from "@/components/Layout";
import { getSettings } from "@/services/settings/settingsService";
import "@ant-design/v5-patch-for-react-19";
import "react-circular-progressbar/dist/styles.css";
import "./globals.css";
import Script from "next/script";

export const revalidate = 60;

const settings = await getSettings();
const siteScripts = settings?.find((e) => e.propertyKey === 'site_scripts')?.value;

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="/style/style.css" />
         {siteScripts && (
          <Script
            id="site-scripts"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: siteScripts
            }}
          />
        )}
      </head>

      <body>
        <Layout settings={settings}>{children}</Layout>
      </body>
    </html>
  );
}
