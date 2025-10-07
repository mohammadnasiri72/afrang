import Container from '@/components/container';
import BodyPriceList from '@/components/priceList/bodyPriceList';
import { getCategory } from '@/services/Category/categoryService';


export default async function PriceList() { 
    let categories = [];
    
    try {
        const result = await getCategory(
            {
                TypeId: 4,
                LangCode: "fa",
                IsHome: 1,
            }
        );
        
        // Check if result is an error object or valid array
        if (result && !result.type && Array.isArray(result)) {
            categories = result;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
  
    return (
        <Container>
            <BodyPriceList categories={categories} />
        </Container>
    );
}
