"use client";

import Container from "@/components/container";
import Link from "next/link";
import { useState } from "react";

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 mb-4">
                <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-500 text-center">در حال حاضر محصولی در این دسته‌بندی موجود نیست.</p>
        </div>
    );
};

export default function PriceListClient({ pricing }) {
    const [searchTerms, setSearchTerms] = useState({});

    console.log(pricing);
    

    // Group products by category
    const groupedProducts = pricing?.reduce((acc, product) => {
        const categoryId = product.categoryId;
        if (!acc[categoryId]) {
            acc[categoryId] = {
                categoryTitle: product.categoryTitle,
                products: []
            };
        }
        acc[categoryId].products.push(product);
        return acc;
    }, {}) || {};

    const handleSearch = (categoryId, value) => {
        setSearchTerms(prev => ({
            ...prev,
            [categoryId]: value
        }));
    };

    const filterProducts = (products, categoryId) => {
        const searchTerm = searchTerms[categoryId]?.toLowerCase() || '';
        return products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    };

    const formatPrice = (price) => {
        // اگر قیمت عدد بود، تومان رو اضافه کن
        if (!isNaN(price) && price !== '') {
            return `${price} تومان`;
        }
        // در غیر این صورت همون قیمت رو برگردون
        return price;
    };

    if (!pricing || pricing.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-8">
            {Object.entries(groupedProducts).map(([categoryId, { categoryTitle, products }]) => (
                <div key={categoryId} className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-100 p-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between">
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="جستجو در محصولات..."
                                    value={searchTerms[categoryId] || ''}
                                    onChange={(e) => handleSearch(categoryId, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18d1be] focus:border-transparent text-right"
                                />
                                <svg 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-[#0a1d39] text-center">{categoryTitle}</h3>
                            <div className="hidden md:block w-64"></div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {filterProducts(products, categoryId).map((product) => (
                            <div key={product.productId} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                                    <div className="flex-1">
                                        <Link 
                                            href={product.url}
                                            className="text-gray-900 hover:text-[#18d1be] transition-colors duration-200"
                                        >
                                            {product.title}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            product.statusId === 1 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.statusDesc}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {product.discount > 0 && !isNaN(product.price) && product.price !== '' && (
                                                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                                    {product.discount}% تخفیف
                                                </span>
                                            )}
                                            <span className="text-[#0a1d39] font-medium">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 