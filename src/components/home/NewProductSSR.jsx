import { getProducts } from "@/services/products/productService";
import NewProduct from "./NewProduct";

async function NewProductSSR() {
  const newProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
    ConditionId: 10,
  });
  return <NewProduct products={newProducts} />;
}

export default NewProductSSR;
