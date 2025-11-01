import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getItem } from "@/services/Item/item";
import dynamic from "next/dynamic";

const BodyDic = dynamic(() => import("@/components/dic/bodyDic"), {
  loading: () => <div>در حال بارگذاری...</div>,
  ssr: true,
});

// تنظیمات کش برای بهبود عملکرد
export const revalidate = 3600; // کش برای یک ساعت

export default async function Dic() {
  let dics = [];

  try {
    const result = await getItem({
      TypeId: 1039,
      LangCode: "fa",
      PageIndex: 1,
      PageSize: 200,
    });

    // Check if result is an error object or valid array
    if (result && !result.type && Array.isArray(result)) {
      dics = result;
    }
  } catch (error) {
    console.error("Error fetching dics:", error);
  }

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[2000px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "واژگان فنی" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto">
        <Container>
          <BodyDic dics={dics} />
        </Container>
      </div>
    </>
  );
}
