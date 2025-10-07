import { getItem } from "@/services/Item/item";
import ArticleSlider from "./ArticleSlider";

async function ArticleSliderSSR() {
  const blogs = await getItem({
    TypeId: 5,
    LangCode: "fa",
    PageSize: 12,
    PageIndex: 1,
    OrderBy: 1,
  });
  return <ArticleSlider blogs={blogs} />;
}

export default ArticleSliderSSR;
