"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ categories, currentId }) {
    const getPriceListUrl = (url) => {
        return url.replace('/products/', '/priceList/');
    };

    // پیدا کردن ایندکس دسته‌بندی انتخاب شده
    const selectedIndex = categories?.findIndex(category => category.id === currentId) || 0;

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={2}
                navigation
                initialSlide={selectedIndex}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
                className="category-slider"
            >
                {categories?.map((category) => (
                    <SwiperSlide key={category.id}>
                        <Link
                            href={getPriceListUrl(category.url)}
                            className={`block group ${category.id === currentId ? ' rounded-lg' : ''}`}
                        >
                            <div className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                                category.id === currentId ? 'border-2 border-[#18d1be]' : ''
                            }`}>
                                <div className="relative h-24 w-full bg-gray-400 flex items-center justify-center p-2">
                                    <Image
                                        src={getImageUrl(category.image)}
                                        alt={category.title}
                                        width={60}
                                        height={60}
                                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <h3 className={`text-sm font-medium truncate ${
                                        category.id === currentId 
                                            ? 'text-[#18d1be]' 
                                            : 'text-[#0a1d39] group-hover:text-[#18d1be]'
                                    } transition-colors duration-300`}>
                                        {category.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .category-slider {
                    padding: 0 40px;
                }
                .category-slider .swiper-button-next,
                .category-slider .swiper-button-prev {
                    color: #0a1d39;
                    background: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .category-slider .swiper-button-next:after,
                .category-slider .swiper-button-prev:after {
                    font-size: 16px;
                }
                .category-slider .swiper-button-disabled {
                    opacity: 0.5;
                }
                .category-slider .swiper-slide {
                    padding: 2px;
                }
                .category-slider .swiper-slide-active {
                    padding: 0;
                }
            `}</style>
        </div>
    );
} 