import { fetchBrandingItems } from "@/services/brandingService";
import BoxImgBranding from "./home/BoxImgBranding";

async function BoxImgBrandingSSR() {
  const brandItems = await fetchBrandingItems();
  return <BoxImgBranding brands={brandItems} />;
}

export default BoxImgBrandingSSR;
