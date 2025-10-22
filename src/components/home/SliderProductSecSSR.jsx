import { getProducts } from "@/services/products/productService";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import SliderProductSec from "./SliderProductSec";

async function SliderProductSecSSR({ mainBanner }) {
  const oldProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
    ConditionId: 20,
  });
  const productsData = await getUserAdSell({
    LangCode: "fa",
    PageSize: 10,
    PageIndex: 1,
    OrderBy: 1,
    IsArchive: 0,
    IsActive: 1,
  });

  return (
    <SliderProductSec
      oldProducts={oldProducts}
      productsData={productsData}
      mainBanner={mainBanner.find((e) => e.categoryKey === "banner_used")}
    />
  );
}

export default SliderProductSecSSR;
