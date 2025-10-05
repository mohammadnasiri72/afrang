import { getProductId } from "@/services/products/productService";
import { getImageUrl, mainDomain } from "@/utils/mainDomain";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const id = await params.slug[0];
  const product = await getProductId(id);


  if (product.type === "error") {
    return {
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  }

  const title = product?.seoInfo?.seoTitle || "محصول";
  const description = product?.seoInfo?.seoDescription || "توضیحات محصول";
  const imageUrl = getImageUrl(product?.product?.image || "");
  const url = `${mainDomain}${product?.product?.url || ""}`;
  const price = String(product?.product?.finalPrice * 10);
  const availability =
    product?.product?.statusId === 1 ? "instock" : "out of stock";
  const brand = product?.product?.brandTitle || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(mainDomain),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "افرنگ دیجیتال",
      images: [
        {
          url: imageUrl,
          width: 296,
          height: 290,
          alt: title,
        },
      ],
      locale: "fa_IR",
      type: "website", // استفاده از نوع استاندارد OpenGraph
    },
    other: {
      "og:type": "product", // اما همچنان می‌توانید نوع محصول را به صورت دستی تنظیم کنید
      "og:brand": brand,
      "product:price:amount": price,
      "product:price:currency": "IRR",
      "product:availability": availability,
    },
  };
}

export default async function LayoutProductDetails({ children, params }) {
  const id = await params.slug[0];
  const product = await getProductId(id);

  if (product.type === "error") {
    return notFound();
  }

  return <main>{children}</main>;
}
