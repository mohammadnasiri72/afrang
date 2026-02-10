import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import SliderCategoryProducts from "@/components/ProductList/SliderCategoryProducts";
import { getCategory } from "@/services/Category/categoryService";
import { getItem, getItemById, getItemByUrl } from "@/services/Item/item";
import { getProducts } from "@/services/products/productService";
import { mainUrl } from "@/utils/mainDomain";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const data = await getItemByUrl(decodedPathname);

  const brandid = await params.brandid;
  let products = {};

  if (brandid) {
    products = await getItemById(Number(brandid));
  }

  if (!products.title) {
    if (data.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }
    return {
      title: data?.seoInfo?.seoTitle ? data.seoInfo.seoTitle : data.title,
      description: data?.seoInfo?.seoDescription,
      keywords: data?.seoInfo?.seoKeywords,
      url: data.seoUrl,
      alternates: {
        canonical: data.seoUrl
          ? mainUrl + data.seoUrl
          : data.url
            ? mainUrl + data.url
            : mainUrl,
      },
      openGraph: {
        title: data?.seoInfo?.seoTitle ? data.seoInfo.seoTitle : data.title,
        description: data?.seoInfo?.seoDescription,
        url: data.seoUrl,
      },
      other: {
        seoHeadTags: data?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: ` لیست محصولات ${
        products.seoTitle ? products.seoTitle : products.title
      }`,
      description: products.seoDescription,
      keywords: products.seoKeywords,
      openGraph: {
        title: `  لیست محصولات ${
          products.seoTitle ? products.seoTitle : products.title
        }`,
        description: products.seoDescription,
      },
      alternates: {
        canonical: data.seoUrl
          ? mainUrl + data.seoUrl
          : data.url
            ? mainUrl + data.url
            : mainUrl,
      },
    };
  }
}

// Dynamic imports for components
const ProductListWithFilters = dynamic(
  () => import("@/components/ProductList/ProductListWithFilters"),
  {
    loading: () => <div>در حال بارگذاری فیلترها...</div>,
    ssr: true,
  },
);

const CategoryList = dynamic(
  () => import("@/components/ProductList/CategoryList"),
  {
    loading: () => <div>در حال بارگذاری دسته‌بندی‌ها...</div>,
    ssr: true,
  },
);

const ProductListSkeleton = dynamic(
  () => import("@/components/ProductList/ProductListSkeleton"),
);

const CategoryListSkeleton = dynamic(
  () => import("@/components/ProductList/CategoryListSkeleton"),
);

// Main Page Component
export default async function ProductList({ searchParams }) {
  // 1. بررسی پارامترها
  const params = await searchParams;

  const brandid = await params.brandid;
  const orderby = await params.orderby;
  const statusid = await params.statusid;
  let products = {};

  // 2. بررسی API call اول
  if (brandid) {
    products = await getItemById(Number(brandid));
  }

  // 3. بررسی API call دوم - با handle خطا
  let categories = [];
  try {
    const categoryResult = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });
    categories = Array.isArray(categoryResult) ? categoryResult : [];
  } catch (error) {
    console.error("❌ خطا در getCategory:", error);
    categories = [];
  }

  const page = params?.page ? parseInt(params.page) : 1;
  const orderBy = params?.orderby ? parseInt(params.orderby) : "";
  const price1 = params?.price1 ? parseInt(params.price1) : 0;
  const price2 = params?.price2 ? parseInt(params.price2) : 100000;
  const pageSize = params?.pageSize ? parseInt(params.pageSize) : 20;
  const brandId = params?.brandid || "";
  const onlyPrice = params?.onlyprice === "1" ? "1" : undefined;
  const onlyDiscount = params?.onlydiscount === "1" ? "1" : undefined;
  const statusId =
    params?.statusid === "1" ? "1" : params?.statusid === "7" ? "7" : undefined;
  const onlyfest = params?.onlyfest === "1" ? "1" : undefined;
  const conditionId = params?.conditionId === "20" ? "20" : undefined;

  const [productsFilter, bannerProduct] = await Promise.all([
    getProducts({
      page,
      pageSize,
      orderBy,
      price1,
      price2,
      CategoryId: "",
      BrandId: brandId,
      OnlyPrice: onlyPrice,
      OnlyDiscount: onlyDiscount,
      StatusId: statusId,
      OnlyFest: onlyfest,
      ConditionId: conditionId,
    }),
    getItem({
      TypeId: 1015,
      LangCode: "fa",
      CategoryIdArray: "4693",
    }),
  ]);

  const textOrderby =
    conditionId === "20"
      ? "محصولات دسته دوم افرنگ"
      : statusid === "7"
        ? "محصولات آرشیو شده افرنگ"
        : orderby === "5"
          ? "گران‌ترین محصولات افرنگ"
          : orderby === "2"
            ? "جدیدترین محصولات افرنگ"
            : orderby === "3"
              ? "پرفروش‌ترین محصولات افرنگ"
              : orderby === "1"
                ? "پربازدیدترین محصولات افرنگ"
                : orderby === "4"
                  ? "ارزان‌ترین محصولات افرنگ"
                  : "";
  return (
    <>
      {/* 4. بررسی Breadcrumb */}
      <div style={{ display: "none" }}>
        زمان‌سنجی: {performance.now().toFixed(2)}
      </div>

      <BreadcrumbMain
        breadcrumb={
          products.breadcrumb ? products.breadcrumb : [{ title: "محصولات" }]
        }
      />

      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto py-5">
        {params && Object.keys(params).length > 0 ? (
          <div className="xl:px-16">
            <div className="flex items-center justify-between">
              {products?.title ? (
                <h1 className="sm:text-2xl! font-bold! text-[#d1182b] px-5">
                  {products?.title}
                </h1>
              ) : (
                <h1 className="sm:text-2xl! font-bold! text-[#d1182b] px-5">
                  {textOrderby}
                </h1>
              )}
              <span className="sm:text-2xl font-bold text-[#d1182b] px-5">
                {productsFilter[0]?.total || 0} محصول
              </span>
            </div>
            {categories.length > 1 && (
              <SliderCategoryProducts categories={categories} />
            )}
            {/* 5. بررسی کامپوننت ProductListWithFilters */}
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductListWithFilters
                searchParams={params}
                products={productsFilter}
                bannerProduct={bannerProduct}
              />
            </Suspense>
          </div>
        ) : (
          <Container>
            {/* 6. بررسی کامپوننت CategoryList */}
            <Suspense fallback={<CategoryListSkeleton />}>
              <CategoryList categories={categories} />
            </Suspense>
          </Container>
        )}
      </div>
    </>
  );
}
