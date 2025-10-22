import Container from "@/components/container";
import BodyProductSec from "@/components/UserAdd/BodyProductSec";
import BreadCrumbUsedProduct from "@/components/UserAdd/BreadCrumbUsedProduct";
import SliderProductSecImg from "@/components/UserAdd/SliderProductSecImg";
import { getProductSecId } from "@/services/UserAd/UserAdServices";
import { Empty } from "antd";
import { notFound } from "next/navigation";

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
      <Container>
        <BreadCrumbUsedProduct title={product.title} />
        <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative">
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
