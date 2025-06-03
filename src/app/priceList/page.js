import Container from '@/components/container';
import BodyPriceList from '@/components/priceList/bodyPriceList';
import { getCategory } from '@/services/Category/categoryService';


export default async function PriceList() { 
    const categories = await getCategory(
        {
            TypeId: 4,
            LangCode: "fa",
            IsHome: 1,
        }
    );
  
    return (
        <Container>
            <BodyPriceList categories={categories} />
        </Container>
    );
}
