"use client";

import { getProductTerm } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";

const SearchHeader = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const timeoutRef = useRef(null);



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

        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await getProductTerm(value);
                setResults(data || []);
                setShowResults(true);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    return (
        <div className="relative lg:w-3/5 w-4/5" ref={searchRef}>
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

            {/* Results Dropdown */}
            {showResults && (searchTerm.length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] h-[400px] overflow-y-auto z-[9999] w-[800px]">
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
                            <div className="grid grid-cols-2 gap-4">
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
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
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
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
                        ) : !loading && (
                            <div className="text-center text-gray-500">نتیجه‌ای یافت نشد</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchHeader;