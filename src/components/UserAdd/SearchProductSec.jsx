"use client";

import { getProductTerm } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchProductSec() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const boxSearch = useRef(null);
  const boxResultsSearch = useRef(null);
  const timeoutRef = useRef(null);

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
      try {
        const response = await getProductTerm(e.target.value);
        if (response.type === "error") {
          setResults([]);
          return;
        }
        setResults(response);
      } catch (error) {
        console.error("search error : ", error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <div ref={boxSearch} className="relative">
        <Input
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
          className={`absolute overflow-auto top-0 translate-y-[${
            boxSearch?.current?.clientHeight
              ? boxSearch?.current?.clientHeight
              : 0
          }px] right-0 left-0 duration-300 shadow-lg bg-white z-[100] rounded-lg ${
            show ? "h-[50vh]" : "h-[0vh]"
          }`}
        >
          {loading && (
            <div className="absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 ">
              <Spin size="large" />
            </div>
          )}
          <div>
            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.productId}
                    href={product.url}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg border border-gray-100 bg-white"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-20 h-20 relative flex-shrink-0 overflow-hidden">
                      <Image
                        src={getImageUrl2(product.image)}
                        alt={product.title.slice(0, 20)}
                        width={80}
                        height={80}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-3">
                        {product.title}
                      </h3>
                      {!product.priceDesc && (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-bold text-[#d1182b]">
                            {product.finalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                      )}
                      {product.priceDesc && (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-bold text-[#d1182b]">
                            {product.priceDesc}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
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
