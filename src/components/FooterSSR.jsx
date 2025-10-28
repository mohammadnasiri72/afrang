import { getItem } from "@/services/Item/item";
import { getMenuFooter } from "@/services/menu/menuService";
import Footer from "./Footer";

async function FooterSSR({ settings }) {
  const socialNetworks = await getItem({
    TypeId: 8,
    LangCode: "fa",
  });
  let footerMenu = [];
  footerMenu = await getMenuFooter();

  return (
    <>
    
      {footerMenu.length > 0 && (
        <Footer
          socialNetworks={socialNetworks}
          footerMenu={footerMenu}
          settings={settings}
        />
      )}
    </>
  );
}

export default FooterSSR;
