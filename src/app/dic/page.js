import Container from '@/components/container';
import { getItem } from '@/services/Item/item';
import dynamic from 'next/dynamic';

const BodyDic = dynamic(() => import('@/components/dic/bodyDic'), {
    loading: () => <div>در حال بارگذاری...</div>,
    ssr: true
});

// تنظیمات کش برای بهبود عملکرد
export const revalidate = 3600; // کش برای یک ساعت

export default async function Dic() {
    const dics = await getItem({ 
        TypeId: 1039, 
        LangCode: 'fa', 
        PageIndex: 1, 
        PageSize: 200 
    });

    return (
        <>
            <div className="bg-[#f6f6f6] overflow-hidden">
                <Container>
                    <BodyDic dics={dics} />
                </Container>
            </div>
        </>
    );
}
