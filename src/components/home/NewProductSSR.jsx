import { getProducts } from "@/services/products/productService";
import NewProduct from "./NewProduct";

async function NewProductSSR() {
  const rawNewProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
    ConditionId: 10,
  });

  const newProducts = Array.isArray(rawNewProducts) ? rawNewProducts : [];

  return <NewProduct products={newProducts} />;
}

export default NewProductSSR;
