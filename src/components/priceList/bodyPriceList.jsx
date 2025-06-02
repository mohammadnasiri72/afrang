"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";

export default function BodyPriceList({ categories }) {
    const getPriceListUrl = (url) => {
        return url.replace('/products/', '/priceList/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center gap-4 mb-8">
                <img className="w-2" src="/images/icons/Polygon_2.png" alt="" />
                <h4 className="font-bold text-xl text-[#0a1d39]">لیست قیمت محصولات</h4>
                <img className="w-2 rotate-180" src="/images/icons/Polygon_2.png" alt="" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories?.map((category) => (
                    <Link
                        href={getPriceListUrl(category.url)}
                        key={category.id}
                        className="group"
                    >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl z-50 relative">
                            <div className="relative h-32 w-full bg-gray-500 flex items-center justify-center">
                                <Image
                                    src={getImageUrl(category.image)}
                                    alt={category.title}
                                    width={64}
                                    height={64}
                                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                                    unoptimized
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#0a1d39] mb-2 group-hover:text-[#18d1be] transition-colors duration-300">
                                    {category.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
