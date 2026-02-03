import BreadcrumbMain from "@/components/BreadcrumbMain";
import BodyProduct from "@/components/Product/BodyProduct";
import DescProduct from "@/components/Product/DescProduct";
import TitleProduct from "@/components/Product/TitleProduct";
// import NotFound from "@/app/(main)/not-found";
import { itemVisit } from "@/services/Item/item";
import {
  getProductId,
  getRelatedProductsByIdString,
} from "@/services/products/productService";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import BasketFixed from "./BasketFixed";
import PriceFixed from "./PriceFixed";
// import NotFound from "./not-found";

export default async function ProductDetails(props) {
  const params = await props.params;
  const headersList = headers();

  // Get IP and User Agent from headers
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const urlReferer =
    headersList.get("x-url") || headersList.get("referer") || "";
  const slug = await params;
  const id = Number(slug.slug[0]);

  const product = await getProductId(id);

  if (!product.ok && !product?.product) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
          <div className="!mb-8">
            <Image
              src="/images/404.png"
              alt="404 Illustration"
              width={256}
              height={256}
              className="mx-auto"
              priority
            />
          </div>
          <span className="text-4xl font-bold text-gray-800 !mb-4">
            صفحه مورد نظر یافت نشد
          </span>
          <p className="text-gray-600 !mb-8">
            متأسفانه صفحه ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
            >
              <FaHome />
              صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let similarProducts = [];
  if (product.product?.similarId) {
    similarProducts = await getRelatedProductsByIdString(
      product.product.similarId,
    );
  }

  // Record the visit with IP and User Agent
  try {
    await itemVisit(
      product?.product?.productId,
      product?.product?.url,
      urlReferer,
      userAgent,
      ip,
    );
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  return (
    <>
      {product?.breadcrumb && (
        <div className="bg-white">
          <div className="max-w-[1600px] mx-auto overflow-hidden">
            <BreadcrumbMain breadcrumb={product?.breadcrumb} />
          </div>
        </div>
      )}
      {product && (
        <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto">
          <div className="xl:px-16">
            <div className="flex">
              <div className="lg:w-3/4 w-full">
                <TitleProduct
                  product={product}
                  similarProducts={similarProducts}
                />
                <BodyProduct id={id} product={product} />
              </div>
              <BasketFixed product={product} />
            </div>
            <DescProduct similarProducts={similarProducts} />
          </div>
        </div>
      )}
      {product && product.canAddCart && <PriceFixed product={product} />}
    </>
  );
}
