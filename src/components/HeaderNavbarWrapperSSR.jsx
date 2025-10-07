import { fetchMenuItems } from "@/services/menuService";
import HeaderNavbarWrapper from "./HeaderNavbarWrapper";

async function HeaderNavbarWrapperSSR({settings}) {
  const menuItems = await fetchMenuItems();
  
  
 
  return <HeaderNavbarWrapper menuItems={menuItems} settings={settings} />;
}

export default HeaderNavbarWrapperSSR;
