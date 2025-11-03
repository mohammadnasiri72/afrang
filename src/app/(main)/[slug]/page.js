import BreadcrumbMain from "@/components/BreadcrumbMain";
import { getItemByUrl } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import { notFound } from "next/navigation";
import CalculationInstallments from "./CalculationInstallments";

export const runtime = "edge";

export default async function DynamicPage({ params }) {
  try {
    const data = await getItemByUrl(params.slug);

    if (data?.type === "error") {
      notFound();
    }

    return (
      <>
        <div className="bg-[#fff]">
          <div className="max-w-[2000px] mx-auto overflow-hidden">
            {data.breadcrumb && <BreadcrumbMain breadcrumb={data.breadcrumb} />}
          </div>
        </div>
        {params.slug === "afrang-leasing" && <CalculationInstallments />}
        <div className="container mx-auto px-4 pb-8 z-50 relative">
          <h1 className="text-3xl font-bold !mb-6">{data.title}</h1>
          <div className="relative">
            {data.image && (
              <div className="float-right ml-6 !mb-6">
                <img
                  src={getImageUrl(data.image)}
                  alt={data.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
            {data.body && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            )}
            <div className="clear-both"></div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    notFound();
  }
}
