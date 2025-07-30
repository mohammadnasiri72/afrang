import { getImageUrl } from "@/utils/mainDomain";
import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import { Empty } from "antd";
import ModalShowDetails from "./ModalShowDetails";

function ListProductSec({ productsSec, setStepPage, loadingList, setFlag }) {
  const skeleton = Array(6)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="relative flex items-center gap-4 bg-gray-200 rounded-xl p-3 w-full sm:w-1/2 lg:w-1/3 max-w-xs animate-pulse min-h-[80px]"
      >
        <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    ));

  return (
    <>
      <div className="flex justify-between items-center px-4 pt-4">
        <h3 className="text-xl font-semibold text-gray-800">
          آگهی های فروش شما
        </h3>
        <button
          onClick={() => {
            setStepPage(1);
          }}
          className="px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626]"
        >
          ثبت آگهی جدید
        </button>
      </div>
      <div className=" min-h-screen py-8">
        <div className="w-full max-w-5xl mx-auto">
          {loadingList ? (
            <div className="flex flex-wrap gap-2 w-full">{skeleton}</div>
          ) : productsSec.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-full">
              {productsSec.map((pr) => (
                <div
                  key={pr.id}
                  data-id = {pr.id}
                  className="relative flex items-center gap-4 bg-white rounded-xl shadow p-3 w-full max-w-xs min-h-[80px]"
                >
                  
                  <div className="absolute top-2 left-2 flex gap-2">
                    <ModalDelete id={pr.id} setFlag={setFlag} />
                    <ModalShowDetails id={pr.id}/>
                  </div>
                  {pr.image ? (
                    <img
                      src={getImageUrl(pr.image)}
                      alt={pr.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                    />
                  ) : (
                    <img
                      src={"/images/icons/camera-bag.png"}
                      alt={pr.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-300"
                    />
                  )}
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="font-bold text-base truncate">
                      {pr.title}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      دسته‌بندی: {pr.categoryTitle}
                    </span>
                    <span className="text-[#d1182b] font-bold text-sm">
                      قیمت: {pr.price.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-5 rounded-lg z-50 relative w-full">
              <div className=" gap-4 flex justify-center items-center h-full">
                <Empty
                  description="در حال حاضر هیچ آگهی فروشی برای شما ثبت نشده است"
                  className="my-8"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListProductSec;
