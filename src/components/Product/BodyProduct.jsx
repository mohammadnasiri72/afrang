"use client";

import ProductTabs from './ProductTabs';

function BodyProduct({ product, comments , totalCount}) {
  return <ProductTabs product={product} comments={comments} totalCount={totalCount}/>;
}

export default BodyProduct;
