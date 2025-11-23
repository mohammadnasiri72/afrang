"use client";

import BreadcrumbMain from "@/components/BreadcrumbMain";
import Loading from "@/components/Loading";
import { fetchBrandingItemsPage } from "@/services/brandingService";
import { getImageUrl } from "@/utils/mainDomain";
import { Pagination, Select } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const { Option } = Select;

const BrandsPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listBrands, setListBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // گرفتن پارامترها از URL
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  const fetchListBrand = async (page = currentPage, size = pageSize) => {
    setLoading(true);
    const data = {
      TypeId: 1023,
      OrderBy: 11,
      LangCode: "fa",
      PageSize: size,
      PageIndex: page,
    };

    try {
      const response = await fetchBrandingItemsPage(data);
      if (response && response.length > 0) {
        setListBrands(response);

        // محاسبه تعداد کل صفحات
        const total = response[0]?.total || 0;
        setTotalItems(total);
        setTotalPages(Math.ceil(total / size));
      } else {
        setListBrands([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      setListBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListBrand();
  }, [currentPage, pageSize]);

  // تابع تغییر صفحه
  const handlePageChange = (newPage) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // تابع تغییر اندازه صفحه
  const handlePageSizeChange = (newSize) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("pageSize", newSize.toString());
      params.set("page", "1"); // بازگشت به صفحه اول هنگام تغییر سایز
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // رندر کارت هر برند
  const renderBrandCard = (brand) => (
    <Link
      href={`/products?brandid=${brand.id}`}
      onClick={(ev) => {
        ev.preventDefault();
        startTransition(() => {
          router.push(`/products?brandid=${brand.id}`);
        });
      }}
    >
      <div
        key={brand.id}
        className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      >
        <div className="p-4 h-32 flex items-center justify-center bg-white rounded-t-lg">
          {brand.image && (
            <img
              src={getImageUrl(brand.image)}
              alt={brand.title}
              className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <div className="p-4 text-center bg-slate-200">
          <h3 className="font-bold line-clamp-1 text-gray-800 text-sm leading-6 group-hover:text-blue-600 transition-colors duration-300 ">
            {brand.title}
          </h3>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain breadcrumb={[{ title: "برندهای افرنگ" }]} />
        </div>
      </div>
      <div className="md:px-16 mx-auto px-4 py-6">
        {/* هدر و کنترل‌ها */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">لیست برندها</h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600 text-sm">
              نمایش
              <span className="font-bold px-1">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              -{" "}
              <span className="font-bold px-1">
                {Math.min(currentPage * pageSize, totalItems)}
              </span>{" "}
              از <span className="font-bold px-1">{totalItems}</span> برند
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">تعداد در صفحه:</span>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                disabled={isPending}
                className="w-16"
                size="middle"
              >
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
                <Option value={60}>60</Option>
                <Option value={80}>80</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* نمایش لودینگ */}
        {(loading || isPending) && <Loading />}

        {/* لیست برندها */}
        {!loading && listBrands.length > 0 && (
          <>
            {/* Grid با 5 ستون در دسکتاپ */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {listBrands.map(renderBrandCard)}
            </div>

            {/* صفحه‌بندی */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  disabled={isPending}
                  showSizeChanger={false}
                  className="text-sm"
                />
              </div>
            )}
          </>
        )}

        {/* حالت بدون داده */}
        {!loading && listBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              برندی یافت نشد
            </h3>
            <p className="text-gray-500 text-sm">
              هیچ برندی برای نمایش وجود ندارد
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandsPage;
