import BodyProduct from "@/components/Product/BodyProduct";
import DescProduct from "@/components/Product/DescProduct";
import TitleProduct from "@/components/Product/TitleProduct";
import { itemVisit } from "@/services/Item/item";
import { getProductId } from "@/services/products/productService";
import { headers } from "next/headers";
import BasketFixed from "./BasketFixed";
import BreadcrumbNavProduct from "./BreadcrumbNavProduct";
import PriceFixed from "./PriceFixed";

export default async function ProductDetails(props) {
  const params = await props.params;
  const headersList = headers();

  // Get IP and User Agent from headers
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  const slug = await params;
  const id = Number(slug.slug[0]);
  const product = await getProductId(id);

  // Record the visit with IP and User Agent
  try {
    await itemVisit(
      product?.product?.productId,
      product?.product?.url,
      ip,
      userAgent
    );
  } catch (error) {
    console.error("Error recording visit:", error);
  }


  return (
    <>
      {product?.breadcrumb && (
        <BreadcrumbNavProduct breadcrumb={product?.breadcrumb} />
      )}
      {product && (
        <div className="bg-[#f6f6f6] overflow-hidden">
          <div className="xl:px-16">
            <div className="flex">
              <div className="lg:w-3/4 w-full">
                <TitleProduct product={product} />
                <BodyProduct product={product} />
              </div>
              <BasketFixed product={product} />
            </div>
            <DescProduct product={product} />
          </div>
        </div>
      )}
      {product && product.canAddCart && <PriceFixed product={product} />}
    </>
  );
}
