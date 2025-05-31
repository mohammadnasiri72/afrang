"use client";

import HeaderProductList from "./HeaderProductList";
import Products from "./Products";
import { useState, useEffect } from "react";

function BodyProductList({ products, layout }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="w-full p-3">
      <HeaderProductList />
      <Products products={products} layout={layout} loading={loading} />
    </div>
  );
}

export default BodyProductList;
