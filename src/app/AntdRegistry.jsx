"use client";

import Layout from "@/components/Layout";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { useServerInsertedHTML } from "next/navigation";
import { useRef, useState } from "react";

export default function AntdRegistry({
  children,
  settings,
  menuItems,
  brandItems,
  itemsSupport,
  socialNetworks,
  footerMenu,
  popupsData,
}) {
  const [cache] = useState(() => createCache());
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    const styleText = extractStyle(cache, { plain: true });
    return (
      <style
        id="antd-cssinjs"
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  return (
    <StyleProvider cache={cache}>
      <Layout
        settings={settings}
        menuItems={menuItems}
        brandItems={brandItems}
        itemsSupport={itemsSupport}
        socialNetworks={socialNetworks}
        footerMenu={footerMenu}
        popupsData={popupsData}
      >
        <ConfigProvider direction="rtl" locale={faIR}>
          {children}
        </ConfigProvider>
      </Layout>
    </StyleProvider>
  );
}
