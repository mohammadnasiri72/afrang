import BodyProductList from "@/components/ProductList/BodyProductList";
import FilterProduct from "@/components/ProductList/FilterProduct";
import PaginationProduct from "@/components/ProductList/PaginationProduct";
import { getProducts } from "@/services/products/productService";

export default async function ProductList(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.OrderBy ? parseInt(searchParams.OrderBy) : "";
  const layout = searchParams?.layout ? searchParams.layout : "list";
  const price1 = searchParams?.minPrice ? parseInt(searchParams.minPrice) : 0;
  const price2 = searchParams?.maxPrice
    ? parseInt(searchParams.maxPrice)
    : 100000;
  const pageSize = searchParams?.pageSize
    ? parseInt(searchParams.pageSize)
    : 20;

  const {
    items: products,
    totalCount,
  } = await getProducts(page, pageSize, orderBy, price1, price2);


  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <div className="flex items-start flex-wrap ">
            <FilterProduct />
            <BodyProductList products={products} layout={layout} />
          </div>
          <PaginationProduct total={totalCount} pageSize={pageSize} />
        </div>
      </div>
    </>
  );
}
