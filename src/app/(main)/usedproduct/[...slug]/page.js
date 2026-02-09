import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyProductSec from "@/components/UserAdd/BodyProductSec";
import SliderProductSecImg from "@/components/UserAdd/SliderProductSecImg";
import { getProductSecId } from "@/services/UserAd/UserAdServices";
import { mainUrl } from "@/utils/mainDomain";
import { Empty } from "antd";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const id = await params.slug[0];
    const resultFilter = await getProductSecId(id);

    if (!resultFilter || resultFilter.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    const title = ` دست دوم کاربران ${
      resultFilter?.title ? `- ${resultFilter?.title}` : ""
    }`;

    return {
      title,
      alternates: {
        canonical: resultFilter.url ? mainUrl + resultFilter.url : mainUrl,
      },
    };
  } catch (err) {
    console.error("❌ generateMetadata error:", err);
    return {
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  }
}

export default async function UserAddDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const slug = await params;
  const id = Number(slug.slug[0]);

  const product = await getProductSecId(id);

  if (product.type === "error") {
    notFound();
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain
            breadcrumb={[
              { href: "/useds/-1", title: "کالای دسته دوم" },
              { title: product.title },
            ]}
          />
        </div>
      </div>
      <Container>
        <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative overflow-hidden max-w-[1600px] mx-auto">
          <div className="lg:w-[30%] w-full p-2">
            {product?.imageList?.length > 0 && (
              <SliderProductSecImg
                attachments={product.imageList}
                isAfrangOffer={product.isAfrangOffer}
              />
            )}
            {product?.imageList?.length === 0 && (
              <div>
                <Empty description="تصویری موجود نیست" />
              </div>
            )}
          </div>
          <div className="lg:w-[70%] w-full p-2">
            <BodyProductSec product={product} />
          </div>
        </div>
      </Container>
    </>
  );
}
