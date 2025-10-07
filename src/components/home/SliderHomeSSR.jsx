import SliderHome from "@/components/home/SliderHome";
import { getItem } from "@/services/Item/item";

async function SliderHomeSSR() {
  const sliderItems = await getItem({
    TypeId: 6,
    LangCode: "fa",
  });
  return <SliderHome sliderItems={sliderItems} />;
}

export default SliderHomeSSR;
