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
