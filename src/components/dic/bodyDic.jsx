"use client";

import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function BodyDic({dics}) {
    
    
    // Group items by category
    const groupedItems = dics?.reduce((acc, item) => {
        const categoryId = item.categoryId;
        if (!acc[categoryId]) {
            acc[categoryId] = {
                categoryTitle: item.categoryTitle,
                items: []
            };
        }
        acc[categoryId].items.push(item);
        return acc;
    }, {}) || {};

    if (!dics || dics.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 mb-4">
                    <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">موردی یافت نشد</h3>
                <p className="text-gray-500 text-center">در حال حاضر موردی در این دسته‌بندی موجود نیست.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-4 mx-2">
            {Object.entries(groupedItems).map(([categoryId, { categoryTitle, items }]) => (
                <div key={categoryId} className="bg-white rounded-lg shadow-sm z-50 relative">
                    <div className="border-b border-gray-100 p-4">
                        <h3 className="text-lg font-semibold text-[#0a1d39] text-center">{categoryTitle}</h3>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map((item) => (
                                <Link 
                                    key={item.id}
                                    href={item.url}
                                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 group transition-colors duration-200 block"
                                >
                                    <div className="w-full text-right flex items-center gap-2 text-gray-900 group-hover:text-[#18d1be] transition-colors duration-200">
                                        <FaBook className="text-[#18d1be] flex-shrink-0" />
                                        <span className="line-clamp-2">{item.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}