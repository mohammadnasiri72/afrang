// این صفحه باید همیشه به‌صورت داینامیک رندر شود (تنظیمات لحظه‌ای)
export const dynamic = "force-dynamic";

import { getSettingsNoCatch } from "@/services/settings/settingsService";
import PageInfo from "./pageInfo";

async function page() {
  const settings = await getSettingsNoCatch();
  return (
    <>
      <PageInfo settings={settings} />
    </>
  );
}

export default page;
