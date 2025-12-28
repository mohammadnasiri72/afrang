// app/HeaderNavbarWrapperSSR.tsx (یا هر جایی که هست)

import HeaderNavbarWrapper from "./HeaderNavbarWrapper";
import { fetchMenuItems } from "@/services/menuService";

// این دو خط جادویی هستن — دقیقاً برای همین سناریو ساخته شدن
export const revalidate = 900;        // کش ۱ ساعته برای همه کاربران
export const dynamic = "auto";         // خیلی مهم: اجازه بده revalidateTag کار کنه!

async function HeaderNavbarWrapperSSR({ settings }) {
  const menuItems = await fetchMenuItems(); // این fetch حالا تگ‌دار و قابل invalidate هست

  return <HeaderNavbarWrapper menuItems={menuItems} settings={settings} />;
}

export default HeaderNavbarWrapperSSR;