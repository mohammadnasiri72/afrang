"use client";

import { getProductTerm } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { IoClose, IoSearchSharp } from "react-icons/io5";

const SearchHeader = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const timeoutRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const MIN_WIDTH = 600;
    const MAX_WIDTH = 900;
    const dropdownRef = useRef(null); // اضافه کردن رفرنس برای دراپ‌داون

    


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // محاسبه موقعیت باکس سرچ هنگام باز شدن
    useEffect(() => {
        if (showResults && searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom,
                right: window.innerWidth - (rect.left + rect.width),
                width: rect.width,
            });
        }
    }, [showResults]);

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
                    if ((a.finalPrice === 0 || a.finalPrice === "0") && (b.finalPrice !== 0 && b.finalPrice !== "0")) return 1;
                    if ((a.finalPrice !== 0 && a.finalPrice !== "0") && (b.finalPrice === 0 || b.finalPrice === "0")) return -1;
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
        <div className="relative w-full" ref={searchRef}>
            <div className="px-3 lg:flex hidden items-center justify-start rounded-lg bg-slate-200 w-full">
                <IoSearchSharp className="text-2xl cursor-pointer" />
                <input
                    className="bg-transparent border-none outline-none p-2 w-full"
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
                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                        <IoClose className="text-xl" />
                    </button>
                )}
            </div>

            {/* Results Dropdown با پورتال */}
            {showResults && (searchTerm.length >= 2) && typeof window !== 'undefined' && ReactDOM.createPortal(
                <div
                    ref={dropdownRef} // اضافه کردن ref به دراپ‌داون
                    className="fixed bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] h-[400px] overflow-y-auto z-[99999]"
                    style={{
                        top: dropdownPos.top,
                        right: dropdownPos.right,
                        width: Math.max(dropdownPos.width, MIN_WIDTH),
                        minWidth: MIN_WIDTH,
                        maxWidth: MAX_WIDTH,
                        marginTop: 4,
                        overflowX: 'hidden',
                    }}
                >
                    <div className="p-4 bg-white relative min-h-[400px]">
                        {loading && (
                            <div className="absolute top-0 inset-0 bg-white/80 backdrop-blur-sm flex  justify-center z-10">
                                <div className="w-5 h-5 border-2 border-[#d1182b] border-t-transparent rounded-full animate-spin translate-y-[200px]"></div>
                            </div>
                        )}
                        <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
                            {results.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {results.map((product) => (
                                        <Link
                                            key={product.productId}
                                            href={product.url}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg border border-gray-100 bg-white"
                                            onClick={() => setShowResults(false)}
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
                                                {
                                                    !product.priceDesc &&
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <span className="text-sm font-bold text-[#d1182b]">
                                                            {product.finalPrice.toLocaleString()}
                                                        </span>
                                                        <span className="text-xs text-gray-500">تومان</span>
                                                    </div>
                                                }
                                                {
                                                    product.priceDesc &&
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <span className="text-sm font-bold text-[#d1182b]">
                                                            {product.priceDesc}
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (!loading && searchTerm.length >= 2) ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center text-gray-500">نتیجه‌ای یافت نشد</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default SearchHeader;