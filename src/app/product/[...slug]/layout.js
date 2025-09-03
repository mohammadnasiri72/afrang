import { getProductId } from "@/services/products/productService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "محصولات",
  description: "محصولات",
};

export default async function layoutProductDetails({ children, params }) {
  const id = await params.slug[0];
  const product = await getProductId(id);

  if (product.type === "error") {
    return notFound();
  }

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="canonical"
          href="https://www.afrangdigital.com/product/5427/canon-eos-5d-mark-iv-dslr-camera"
        />
        <meta name="og:locale" content="fa_IR" />
        <meta name="og:type" content="product" />
        <meta name="og:title" content={product?.seoInfo?.seoTitle || ""} />
        <meta
          name="og:description"
          content={product?.seoInfo?.seoDescription || ""}
        />
        <meta
          name="og:url"
          content={`${mainDomain}${product?.product?.url || ""}`}
        />
        <meta name="og:site_name" content="افرنگ دیجیتال" />
        <meta
          name="og:image"
          content={getImageUrl(product?.product?.image || "")}
        />
        <meta
          name="og:image:secure_url"
          content={getImageUrl(product?.product?.image || "")}
        />
        <meta name="og:image:width" content="296" />
        <meta name="og:image:height" content="290" />
        <meta name="og:brand" content={product?.product?.brandTitle || ""} />
        <meta
          name="product:price:amount"
          content={String(product?.product?.finalPrice * 10)}
        />
        <meta name="product:price:currency" content="IRR" />
        <meta
          name="product:availability"
          content={
            product?.product?.statusId === 1 ? "instock" : "out of stock"
          }
        />
        <meta
          name="description"
          content={product?.seoInfo?.seoDescription || ""}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
