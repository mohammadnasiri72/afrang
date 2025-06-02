import Container from "@/components/container";
import { getCategory } from '@/services/Category/categoryService';
import CategorySlider from "./CategorySlider";

export default async function PriceListLayout({ children, params }) {
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
                {children}
            </div>
        </Container>
    );
} 