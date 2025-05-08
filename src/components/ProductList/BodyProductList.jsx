import HeaderProductList from "./HeaderProductList";
import Products from "./Products";

function BodyProductList({ products, layout }) {
  return (
    <>
      <div className="lg:w-3/4 w-full p-3">
        <HeaderProductList />
        <Products products={products} layout={layout} />
      </div>
    </>
  );
}

export default BodyProductList;
