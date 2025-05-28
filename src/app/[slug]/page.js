import { getItemByUrl } from "@/services/Item/item";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getImageUrl } from "@/utils/mainDomain";
import { Divider } from "antd";

export default async function DynamicPage({ params }) {
  try {
    const data = await getItemByUrl(params.slug);
    console.log(data);

    if (!data) {
      notFound();
    }

    return (
      <>
        {data.breadcrumb && <Breadcrumb items={data.breadcrumb} />}
        <Divider style={{marginTop: '0px'}}/>
        <div className="container mx-auto px-4 pb-8 z-50 relative">
          <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
          <div className="relative">
            {data.image && (
              <div className="float-right ml-6 mb-6">
                <img
                  src={getImageUrl(data.image)}
                  alt={data.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
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