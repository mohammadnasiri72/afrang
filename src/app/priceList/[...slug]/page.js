import Container from "@/components/container";
import { getProductPricing } from "@/services/products/productService";
import { getCategory } from '@/services/Category/categoryService';
import Link from "next/link";
import PriceListClient from "./PriceListClient";
import { Suspense } from "react";
import CategorySlider from "./CategorySlider";

const SkeletonLoader = () => {
    return (
        <div className="space-y-8">
            {[1, 2, 3].map((categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4].map((productIndex) => (
                            <div key={productIndex} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

async function PricingData({ id }) {
    const pricing = await getProductPricing(id);
    return <PriceListClient pricing={pricing} />;
}

export default async function PriceListPage({ params }) {
    const id = Number(params.slug[0]);
    const categories = await getCategory();
    const selectedCategory = categories?.find(category => category.id === id);

    return (
        <Container>
            <div className="py-8">
                <div className="mb-8">
                    <CategorySlider categories={categories} currentId={id} />
                </div>
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="flex justify-center items-center gap-4">
                        <img className="w-2" src="/images/icons/Polygon_2.png" alt="" />
                        <h4 className="font-bold text-xl text-[#0a1d39]">لیست قیمت محصولات</h4>
                        <img className="w-2 rotate-180" src="/images/icons/Polygon_2.png" alt="" />
                    </div>
                    {selectedCategory && (
                        <h5 className="text-lg text-[#18d1be] font-medium">
                            {selectedCategory.title}
                        </h5>
                    )}
                </div>
                <Suspense fallback={<SkeletonLoader />}>
                    <PricingData id={id} />
                </Suspense>
            </div>
        </Container>
    );
} 