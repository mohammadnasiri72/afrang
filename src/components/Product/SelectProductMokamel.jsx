"use client";
import { Select } from "antd";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

function SelectProductMokamel({ product }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const filteredProducts = product.optionalProducts.filter((item) =>
    selectedProducts.includes(item.id)
  );
  return (
    <>
      <div className="mt-5 custom-select-productDetails">
        <div className="text-sm font-semibold py-3">کالای مکمل</div>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          className=" w-full"
          size="large"
          value="برای افزودن کالای مکمل کلیک کنید"
          onChange={(value) => {
            if (!selectedProducts.includes(value)) {
              setSelectedProducts([...selectedProducts, value]);
            }
          }}
          suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
          options={product.optionalProducts.map((product) => ({
            value: product.id,
            label: (
              <div className="p-3 duration-300 hover:bg-[#f3f3f3]">
                {product.title}
              </div>
            ),
          }))}
        />
      </div>
      <div className="flex flex-wrap items-center mt-3 -mr-2">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-2">
            <div className="bg-[#f6f6f6] flex items-center justify-center gap-2 rounded-sm border border-[#0002] h-11 px-2">
              <img src={product.img} alt="" />
              <span className="whitespace-nowrap">{product.title}</span>
              <div>
                <IoIosClose
                  onClick={() => {
                    setSelectedProducts(
                      selectedProducts.filter((id) => id !== product.id)
                    );
                  }}
                  className="cursor-pointer text-xl text-[#0008]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectProductMokamel;
