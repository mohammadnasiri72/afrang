import CameraAccessories from "@/components/home/CameraAccessories";
import { getCategory } from "@/services/Category/categoryService";

async function CameraAccessoriesSSR() {
  const category = await getCategory({
    TypeId: 4,
    LangCode: "fa",
    IsHome: 1,
  });
  return <CameraAccessories category={category} />;
}

export default CameraAccessoriesSSR;
