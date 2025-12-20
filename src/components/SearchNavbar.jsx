"use client";

import { getProductTerm } from "@/services/products/productService";
import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

const SearchNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // باکس نتایج را بلافاصله باز کن و لودینگ را فعال کن
    setShowResults(true);
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await getProductTerm(value);
        // سورت: اول آنهایی که finalPrice != 0، بعد آنهایی که 0 هستند
        const sorted = (data || []).slice().sort((a, b) => {
          if (
            (a.finalPrice === 0 || a.finalPrice === "0") &&
            b.finalPrice !== 0 &&
            b.finalPrice !== "0"
          )
            return 1;
          if (
            a.finalPrice !== 0 &&
            a.finalPrice !== "0" &&
            (b.finalPrice === 0 || b.finalPrice === "0")
          )
            return -1;
          return 0;
        });
        setResults(sorted);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="relative w-full lg:hidden flex justify-end" ref={searchRef}>
      <div className="flex justify-center items-center gap-2 w-full bg-white/10 sm:w-96 rounded-lg px-3 py-1 ">
        <input
          className="outline-none placeholder-white/70 text-sm w-full !text-[16px]"
          type="text"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setResults([]);
              setShowResults(false);
            }}
            className="!text-white/70 hover:!text-white transition-colors cursor-pointer"
            tabIndex={-1}
          >
            <IoClose className="text-xl" />
          </button>
        )}
        <IoSearch className="text-xl cursor-pointer hover:text-white/80 transition-colors" />
      </div>

      {/* Results Dropdown */}
      {showResults && searchTerm.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] h-[400px] overflow-y-auto z-[9999] w-full">
          <div className="p-4 bg-white relative">
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex items-center gap-2 text-[#d1182b]">
                  <div className="w-5 h-5 border-2 border-[#d1182b] border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال جستجو...</span>
                </div>
              </div>
            )}
            {results.length > 0 ? (
              <div className="flex flex-col gap-4">
                {results.map((product) => (
                  <Link prefetch={false}
                    key={product.id}
                    href={product.url}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg border border-gray-100 bg-white"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setShowResults(false);
                      router.push(product.url);
                    }}
                  >
                    <div className="sm:w-20 w-12 sm:h-20 h-12 relative flex-shrink-0">
                      <Image
                        src={getImageUrl(product.image)}
                        alt={product.title.slice(0, 20)}
                        fill
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
              <div className="text-center text-gray-500">نتیجه‌ای یافت نشد</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchNavbar;
