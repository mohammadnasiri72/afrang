"use client";

import { getUserAdBuy, getUserAdSell } from "@/services/UserAd/UserAdServices";
import { getImageUrl } from "@/utils/mainDomain";
import { Input, Spin } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import ShowInfoContact from "./ShowInfoContact";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

function SearchProductSec() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const boxSearch = useRef(null);
  const boxResultsSearch = useRef(null);
  const timeoutRef = useRef(null);


  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderby") || "1";
  const pageIndex = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const price1 = searchParams.get("price1") || undefined;
  const price2 = searchParams.get("price2") || undefined;
  const categoryParams = searchParams.getAll("category");

const pathname = usePathname();
  // تابع تبدیل قیمت به فرمت قابل خواندن
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const orginalData = {
    LangCode: "fa",
    CategoryIdArray:
      categoryParams.length > 0 ? categoryParams.join(",") : undefined,
    ...(price1 && { price1: price1 }),
    ...(price2 && { price2: price2 }),
    // IsActive: 1,
    OrderBy: Number(orderBy),
    // OrderOn: 1,
    PageSize: Number(pageSize),
    PageIndex: Number(pageIndex),
    Term: searchTerm,
  };

  const fetchProductsSec = async (data) => {
    setLoading(true);
    try {
      const productsData =
        pathname.includes("useds")
          ? await getUserAdSell(data)
          : pathname.includes("buyers")
          ? await getUserAdBuy(data)
          : [];
      if (productsData?.type === "error") {
        Toast.fire({
          icon: "error",
          title: productsData.message,
        });
        return;
      }
      setResults(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (ev) => {
      if (
        boxSearch.current &&
        !boxSearch.current.contains(ev.target) &&
        boxResultsSearch.current &&
        !boxResultsSearch.current.contains(ev.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (e.target.value.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }
    setLoading(true);
    setShow(true);
    timeoutRef.current = setTimeout(async () => {
      // try {
      //   const response = await getProductTerm(e.target.value);
      //   if (response.type === "error") {
      //     setResults([]);
      //     return;
      //   }
      //   setResults(response);
      // } catch (error) {
      //   console.error("search error : ", error);
      // } finally {
      //   setLoading(false);
      // }
      fetchProductsSec({ ...orginalData, Term: e.target.value });
    }, 500);
  };

  const ProductListItemSell = (product) => (
    <div className="border border-gray-200 rounded-lg p-1 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-reverse">
        <div className="flex-shrink-0 px-3">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            {product.image && product.url ? (
              <Link className="w-full h-full" href={product.url}>
                <img
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Link>
            ) : (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {product.url && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              <Link
                href={product.url}
                className="hover:text-[#d1182b] transition-colors line-clamp-1"
              >
                {product.title}
              </Link>
            </h3>
          )}
          {product.categoryTitle && (
            <p className="text-sm text-gray-600 mb-2">
              {product.categoryTitle}
            </p>
          )}
          {product.price && (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#d1182b]">
                {formatPrice(product.price)} تومان
              </span>
              {product.appearance && (
                <span className="text-sm text-gray-500">
                  {product.appearance}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ProductListItemBuy = (product) => (
    <div className="border border-gray-200 rounded-lg pb-4 p-2 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-[#d1182b]">{product.nickname}</h3>
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            <span>{product.title}</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.categoryTitle}</p>
        </div>
      </div>
      <div className="flex items-start py-2 text-xs text-gray-600 gap-1">
        <span className="text-black font-bold whitespace-nowrap">
          توضیحات :
        </span>
        <p className="text-justify">
          {product.description ? product.description : "توضیحاتی ثبت نشده"}
        </p>
      </div>
      <div className="mt-2">
        <ShowInfoContact id={product.id} />
      </div>
    </div>
  );

  return (
    <>
      <div ref={boxSearch} className="relative">
        <Input
          size="large"
          onFocus={() => searchTerm.length >= 2 && setShow(true)}
          className="w-full"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<IoSearch />}
          allowClear
          placeholder="جستجو در کالای دست دوم..."
        />
        <div
          ref={boxResultsSearch}
          className={`absolute overflow-auto top-0 translate-y-[42px] right-0 left-0 duration-300 shadow-lg bg-white z-[100] rounded-lg ${
            show ? "h-[50vh]" : "h-[0vh]"
          }`}
        >
          {loading && (
            <div className="bg-[#fff8] absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[100]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <Spin size="large" />
              </div>
            </div>
          )}
          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {results.map((product) =>
                  pathname.includes("useds")
                    ? ProductListItemSell(product)
                    : pathname.includes("buyers")
                    ? ProductListItemBuy(product)
                    : ""
                )}
              </div>
            ) : !loading && searchTerm.length >= 2 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  نتیجه‌ای یافت نشد
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchProductSec;
