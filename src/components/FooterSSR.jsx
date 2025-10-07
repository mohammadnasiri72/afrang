import { getItem } from "@/services/Item/item";
import { getMenuFooter } from "@/services/menu/menuService";
import Footer from "./Footer";

async function FooterSSR({settings}) {
  const socialNetworks = await getItem({
    TypeId: 8,
    LangCode: "fa",
  });
  const footerMenu = await getMenuFooter();

  return <Footer socialNetworks={socialNetworks} footerMenu={footerMenu} settings={settings}/>;
}

export default FooterSSR;
