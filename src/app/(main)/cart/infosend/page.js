import { getSettingsNoCatch } from "@/services/settings/settingsService";
import PageInfo from "./pageInfo";

// این صفحه به‌صورت داینامیک رندر می‌شود (به‌خاطر fetch بدون کش)
export const dynamic = "force-dynamic";

async function Page() {
  const rawSettings = await getSettingsNoCatch();
  const settings = Array.isArray(rawSettings) ? rawSettings : [];

  return (
    <>
      <PageInfo settings={settings} />
    </>
  );
}

export default Page;
