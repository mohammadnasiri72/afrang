"use client";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { getProductListId } from "@/services/products/productService";
import { mainDomainImg } from "@/utils/mainDomain";

function SelectProductMokamel({ product }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [optionalProducts, setOptionalProducts] = useState([]);



  useEffect(() => {
    const fetchOptionalProducts = async () => {
      if (product?.product?.optionalId) {
        // تبدیل رشته به آرایه‌ای از اعداد
        const ids = product.product.optionalId.split(',').map(id => parseInt(id));
        const data = {
          ids: ids
        };

        const result = await getProductListId(data);
        if (result && Array.isArray(result)) {
          setOptionalProducts(result);
        }
      }
    };

    fetchOptionalProducts();
  }, [product]);

  const filteredProducts = optionalProducts.filter((item) =>
    selectedProducts.includes(item.id)
  );

  const getImageUrl = (image) => {
    if (!image) return defaultImage;
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^\.\.\//, '')}`;
    } catch (error) {
      return defaultImage;
    }
  };

  return (
    <>
      <div className="mt-5 custom-select-productDetails">
        <div className="text-sm font-semibold py-3">کالای مکمل</div>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          className="w-full"
          size="large"
          value="برای افزودن کالای مکمل کلیک کنید"
          onChange={(value) => {
            if (selectedProducts.includes(value)) {
              // اگر قبلاً انتخاب شده، حذفش کن
              setSelectedProducts(selectedProducts.filter(id => id !== value));
            } else {
              // اگر انتخاب نشده، اضافه‌اش کن
              setSelectedProducts([...selectedProducts, value]);
            }
          }}
          suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
          options={optionalProducts.map((product) => ({
            value: product.id,
            label: (
              <div 
                className={`p-3 duration-300 ${
                  selectedProducts.includes(product.id) 
                    ? 'bg-[#d1182b10] hover:bg-[#d1182b15]' 
                    : 'hover:bg-[#f3f3f3]'
                } flex items-center justify-between`}
              >
                <span>{product.title}</span>
                {selectedProducts.includes(product.id) && (
                  <span className="text-[#d1182b] text-sm">
                    ✓
                  </span>
                )}
              </div>
            ),
          }))}
          classNames={{
            popup: {
              root: 'custom-select-popup'
            }
          }}
          popupRender={(menu) => (
            <div>
              {optionalProducts.length > 0 ? (
                menu
              ) : (
                <div className="p-4 text-center text-gray-500">
                  محصول مکملی موجود نیست
                </div>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex flex-wrap items-center mt-3 -mr-2">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-2">
            <div className="bg-[#f6f6f6] flex items-center justify-center gap-2 rounded-sm border border-[#0002] h-11 px-2">
              <img src={getImageUrl(product.image) } alt={product.id} className="h-8 w-8 object-contain" />
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
