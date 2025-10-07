import { getItem } from "@/services/Item/item";
import SupportBox from "./home/SupportBox";

async function SupportBoxSSR() {
  const itemsSupport = await getItem({
    TypeId: 1015,
    LangCode: "fa",
    CategoryIdArray: 3227,
  });
  return <SupportBox items={itemsSupport} />;
}

export default SupportBoxSSR;
