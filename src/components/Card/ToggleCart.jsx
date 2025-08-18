"use client";

import { fetchCartData, setCartType } from '@/redux/slices/cartSlice';
import { Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ToggleCart() {
  const [typeArticle, setTypeArticle] = useState("سبد خرید");
  const { currentItems, nextItems, cartType } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  // دریافت هر دو سبد خرید در ابتدای لود کامپوننت
  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, [dispatch]);

  const handleToggle = (value) => {
    setTypeArticle(value);
    const newCartType = value === "خرید بعدی" ? 'next' : 'current';
    dispatch(setCartType(newCartType));
  };

  // ساخت گزینه‌های Segmented با نمایش تعداد محصولات
  const options = [

    {
      label: (
        <div className="flex items-center justify-center gap-2">
          <span>سبد خرید</span>
          {currentItems?.filter((e)=>e.parentId === -1).length > 0 && (
            <span className="bg-[#d1182b] text-white text-xs px-2 py-0.5 rounded-full">
              {currentItems?.filter((e)=>e.parentId === -1).length}
            </span>
          )}
        </div>
      ),
      value: "سبد خرید"
    },
    {
      label: (
        <div className="flex items-center justify-center gap-2">
          <span>خرید بعدی</span>
          {nextItems?.filter((e)=>e.parentId === -1).length > 0 && (
            <span className="bg-[#d1182b] text-white text-xs px-2 py-0.5 rounded-full">
              {nextItems?.filter((e)=>e.parentId === -1).length}
            </span>
          )}
        </div>
      ),
      value: "خرید بعدی"
    },
  ];

  return (
    <>
      <div className="bg-[#ebebeb] my-3 py-2 flex justify-center SegmentedCard">
        <div className="w-72">
          <Segmented
            className="font-semibold text-3xl w-full"
            dir="rtl"
            style={{
              padding: 0,
              fontFamily: "yekan",
              gap: '8px'
            }}
            value={typeArticle}
            onChange={handleToggle}
            options={options}
            block
          />
        </div>
      </div>
    </>
  );
}

export default ToggleCart;
