"use client";

import HeaderProductList from "./HeaderProductList";
import Products from "./Products";
import { useState, useEffect } from "react";

function BodyProductList({ products, layout , resultFilter}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="w-full p-3">
      <HeaderProductList resultFilter={resultFilter}/>
      <Products products={products} layout={layout} loading={loading} />
    </div>
  );
}

export default BodyProductList;
