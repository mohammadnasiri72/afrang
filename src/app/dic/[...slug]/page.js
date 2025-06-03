import Container from "@/components/container";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { getItemByUrl } from "@/services/Item/item";

export default async function DicItemPage({ params }) {
    const { slug } = params;
    const encodedUrl = `/dic/${slug.join('/')}`;
    const url = decodeURIComponent(encodedUrl);


    // Get all dictionary items
    const dic = await getItemByUrl(url);

    if (!dic) {
        return (
            <div className="bg-[#f6f6f6] overflow-hidden">
                <Container>
                    <div className="max-w-4xl mx-auto py-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
                            <h1 className="text-2xl font-bold text-[#0a1d39] mb-6 text-center">موردی یافت نشد</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    const breadcrumbItems = [
        {
            title: (
                <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
                    خانه
                </Link>
            ),
        },
        {
            title: (
                <Link href="/dic" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
                    واژگان فنی
                </Link>
            ),
        },
        {
            title: <span className="text-[#d1182b] font-[Yekan]">{dic.title}</span>,
        },
    ];

    return (
        <div className="bg-[#f6f6f6] overflow-hidden ">
            <div className="bg-white rounded-lg shadow-sm py-6 mb-4 sm:px-16 px-2">
                <Breadcrumb
                    items={breadcrumbItems}
                    separator={<span className="text-gray-400 mx-2 text-xs font-[Yekan]">&gt;</span>}
                    className="font-[Yekan]"
                />
            </div>
            <Container>
                <div className="max-w-4xl mx-auto py-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="border-b border-[#d1182b] pb-4 mb-6">
                            <h1 className="text-2xl font-bold text-[#0a1d39] text-right">{dic.title}</h1>
                        </div>
                        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: dic.body }} />
                    </div>
                </div>
            </Container>
        </div>
    );
} 