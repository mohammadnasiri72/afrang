import React from "react";
import SliderProductDetails from "./SliderProductDetails";
import DescProductDetails from "./DescProductDetails";
import BasketBox from "./BasketBox";

function TitleProduct({product}) {
  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg p-2">
       
        <div className="lg:w-1/3 w-full p-2">
          <SliderProductDetails attachments={product.attachments}/>
        </div>
       
        <div className="lg:w-5/12 w-full p-2">
          <DescProductDetails product={product} />
        </div>
        <div className="lg:w-1/4 w-full p-2">
          <BasketBox product={product} />
        </div>
      </div>
    </>
  );
}

export default TitleProduct;
