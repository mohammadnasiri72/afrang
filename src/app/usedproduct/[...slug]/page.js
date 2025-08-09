import Container from "@/components/container";
import BodyProductSec from "@/components/UserAdd/BodyProductSec";
import BreadCrumbUsedProduct from "@/components/UserAdd/BreadCrumbUsedProduct";
import SliderProductSecImg from "@/components/UserAdd/SliderProductSecImg";
import { getProductSecId } from "@/services/UserAd/UserAdServices";
import { redirect } from "next/navigation";

export default async function UserAddDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const slug = await params;
  const id = Number(slug.slug[0]);

  const product = await getProductSecId(id);



  // let url = "/used/";

  // slug.slug.map((slug) => {
  //   url = url + decodeURIComponent(slug) + "/";
  // });

  // if (product.url + "/" !== url) {
  //   redirect(product.url);
  // }
  return (
    <>
      <Container>
         <BreadCrumbUsedProduct title={product.title}/>
        <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative">
          <div className="lg:w-[30%] w-full p-2">
            {product.imageList.length > 0 && (
              <SliderProductSecImg attachments={product.imageList} />
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
