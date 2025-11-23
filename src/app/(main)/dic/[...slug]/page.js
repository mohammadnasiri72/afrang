import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getItemByUrl } from "@/services/Item/item";

export default async function DicItemPage({ params }) {
  const { slug } = params;
  const encodedUrl = `/dic/${slug.join("/")}`;
  const url = decodeURIComponent(encodedUrl);

  // Get all dictionary items
  const dic = await getItemByUrl(url);

  if (!dic) {
    return (
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto">
        <Container>
          <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
              <h1 className="text-2xl font-bold text-[#0a1d39] !mb-6 text-center">
                موردی یافت نشد
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[1600px] mx-auto ">
          <BreadcrumbMain
            breadcrumb={[{ title: "واژگان فنی" }, { title: dic.title }]}
          />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto ">
        <Container>
          <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-b border-[#d1182b] pb-4 !mb-6">
                <h1 className="text-2xl !font-bold text-[#0a1d39] text-right">
                  {dic.title}
                </h1>
              </div>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: dic.body }}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
