import Container from '@/components/container';
import { getCategory } from '@/services/Category/categoryService';
import dynamic from 'next/dynamic';
const BodyPriceList = dynamic(() => import('@/components/priceList/bodyPriceList'));

export default async function PriceList() {  
    const categories = await getCategory();
  
    return (
        <Container>
            <BodyPriceList categories={categories} />
        </Container>
    );
}
