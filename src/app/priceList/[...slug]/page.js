import { getProductPricing } from "@/services/products/productService";
import PriceListClient from "./PriceListClient";

export default async function PriceListPage({ params }) {
    const id = Number(params.slug[0]);
    const pricing = await getProductPricing(id);
    return <PriceListClient pricing={pricing} />;
} 