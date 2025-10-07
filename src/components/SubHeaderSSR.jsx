import { getPopUpsData } from "@/services/popups/popups";
import SubHeader from "./SubHeader";

async function SubHeaderSSR() {
  const popupsList = await getPopUpsData();
  return <SubHeader popupsList={popupsList} />;
}

export default SubHeaderSSR;
