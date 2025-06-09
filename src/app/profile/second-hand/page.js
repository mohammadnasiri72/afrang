"use client";

import { Segmented, Empty } from 'antd';
import { useState } from "react";
import { FaRecycle } from "react-icons/fa";

const SecondHand = () => {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    { label: "خرید دسته دوم", value: 0 },
    { label: "فروش دسته دوم", value: 1 },
  ];

  const renderBuyTab = () => (
    <div className="bg-white p-5 rounded-lg z-50 relative ">
      <div className=" gap-4 flex justify-center items-center h-full">
        <Empty description="در حال حاضر کالای دسته دومی موجود نیست" className="my-8" />
      </div>
    </div>
  );

  const renderSellTab = () => (
    <div className="bg-white p-5 rounded-lg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            فروش کالای دسته دوم
          </h2>
          <p className="text-gray-600">
            برای فروش کالای دسته دوم خود، لطفا فرم زیر را پر کنید
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d1182b]"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              شماره تماس
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d1182b]"
              placeholder="شماره تماس خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام کالا
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d1182b]"
              placeholder="نام کالای خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              توضیحات
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d1182b] h-32"
              placeholder="توضیحات کالای خود را وارد کنید"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              قیمت پیشنهادی
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d1182b]"
              placeholder="قیمت پیشنهادی خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تصاویر کالا
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-2">تصاویر کالای خود را اینجا رها کنید</p>
              <p className="text-sm text-gray-400">یا</p>
              <button className="mt-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors">
                انتخاب فایل
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors">
              ارسال درخواست
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative">
      <div className="flex items-center gap-2 mb-6">
        <FaRecycle className="text-gray-800 text-2xl" />
        <h1 className="text-2xl font-bold text-gray-800">کالای دسته دوم</h1>
      </div>

      <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
        <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center">
          <Segmented
            className="font-semibold text-3xl w-full overflow-auto"
            dir="ltr"
            style={{
              padding: "8px",
              fontFamily: "yekan",
              width: "100%",
            }}
            value={activeTab}
            onChange={(value) => setActiveTab(value)}
            options={options}
          />
        </div>

        <div className="w-full">
          {activeTab === 0 ? renderBuyTab() : renderSellTab()}
        </div>
      </div>
    </div>
  );
};

export default SecondHand; 