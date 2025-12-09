import React from "react";
import PageInfo from "./pageInfo";
import { getSettings } from "@/services/settings/settingsService";

async function page() {
  const settings = await getSettings();
  return (
    <>
      <PageInfo settings={settings} />
    </>
  );
}

export default page;
