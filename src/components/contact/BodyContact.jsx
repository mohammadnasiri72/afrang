"use client";

import { Segmented, Select } from "antd";
import { useState } from "react";
import {
  FaCaretDown,
  FaMobileScreen,
  FaPhoneVolume,
  FaRegUser,
} from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { LuTag } from "react-icons/lu";

function BodyContact() {
  const [typeArticle, setTypeArticle] = useState("شماره های تماس");
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-10 py-5">
        <img className="w-2" src="/images/icons/Polygon_2.png" alt="" />
        <h4 className="font-bold text-xl text-[#0a1d39]"> تماس باما </h4>
        <img
          className="w-2 rotate-180"
          src="/images/icons/Polygon_2.png"
          alt=""
        />
      </div>

      <div className="lg:w-auto w-full SegmentedContact overflow-auto mx-auto flex justify-center">
        <Segmented
          className="font-semibold text-3xl w-full "
          dir="ltr"
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            fontFamily: "yekan",
          }}
          value={typeArticle}
          onChange={(e) => {
            setTypeArticle(e);
          }}
          options={[
            "ساعات کار",
            "ایمیل و کد پستی",
            "فکس و سایر تلفن ها",
            "شماره های تماس",
          ]}
        />
      </div>
      <div className="mt-8">
        <div className="rounded-lg bg-white p-5">
          <div id="tab-1" className="tab-item">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 p-3">
                <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                  <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                    <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                      <GoMail />
                    </div>
                  </div>
                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      کد پستی
                    </span>
                    <p className="mb-0">1561635731</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 p-3">
                <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                  <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                    <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                      <FaPhoneVolume />
                    </div>
                  </div>
                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      تلفن
                    </span>
                    <p className="mb-0">7و 02177615546</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 p-3">
                <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                  <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                    <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                      <LuTag />
                    </div>
                  </div>
                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      واحد فروش:
                    </span>
                    <p className="mb-0">فقط واحد 205</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 p-3">
                <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                  <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                    <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                      <FaMobileScreen />
                    </div>
                  </div>
                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      موبایل
                    </span>
                    <p className="mb-0">09125103328</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 p-3">
                <div className="bg-[#fafafa] text-[#424242] flex flex-wrap rounded-lg relative z-10 text-[17px] font-[600] items-start  mltp_col_info">
                  <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                    <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                      <FaRegUser />
                    </div>
                  </div>
                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      مهندس حسین نوازنی مدیر سایت
                    </span>
                    <p>09125103328</p>
                  </div>

                  <div className="py-4 px-2 pl-[50px]">
                    <span className="text-[#616161] text-[13px] font-bold">
                      مهندس حسام نوازنی مدیر فروش
                    </span>
                    <p>09125190061</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div id="tab-2" className="tab-item" style="display: none">222</div>

                <div id="tab-3" className="tab-item" style="display: none">333</div>

                <div id="tab-4" className="tab-item" style="display: none">444</div> */}
        </div>
      </div>
      <div className="mt-8">
        <div className="rounded-lg bg-white p-5 relative">
          <div className="flex justify-center items-center gap-4 py-5">
            <img src="/images/icons/polygon.png" alt="" />
            <h4 className="font-semibold text-lg text-[#0a1d39]">
              فرم ارتباط با ما
            </h4>
            <img
              className="rotate-180"
              src="/images/icons/polygon.png"
              alt=""
            />
          </div>
          <div className="lg:px-10">
            <div className="flex items-center flex-wrap">
              <div className="sm:w-1/3 w-full p-2">
                <p className="font-semibold text-sm">نام و نام خانوادگی</p>

                <div className="w-full mt-2">
                  <input
                    className="w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
                    type="text"
                    placeholder="لطفا نام و نام خانوادگی خود را وارد کنید"
                  />
                </div>
              </div>
              <div className="sm:w-2/3 w-full p-2">
                <p className="font-semibold text-sm"> ارسال به بخش </p>
                <div className="mt-2">
                  <Select
                    className="custom-selectContact h-12 w-full border-none bg-[#f0f0f0] rounded-[8px]"
                    size="large"
                    defaultValue="فروش"
                    onChange={(e) => {}}
                    suffixIcon={
                      <FaCaretDown className="text-[#d1182b] text-lg" />
                    }
                    options={[
                      {
                        value: "فروش",
                        label: "فروش",
                      },
                      { value: "گزینه2", label: "گزینه2" },
                      // { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>
              </div>
              <div className="sm:w-1/3 w-full p-2">
                <p className="font-semibold text-sm"> شماره تماس </p>

                <div className="w-full mt-2">
                  <input
                    className="w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
                    type="text"
                    placeholder="مثلا 09211390622"
                  />
                </div>
              </div>
              <div className="sm:w-2/3 w-full p-2">
                <p className="font-semibold text-sm">ایمیل</p>

                <div className="w-full mt-2">
                  <input
                    className="w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
                    type="text"
                    placeholder="modino@gmail.com"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <p className="font-semibold text-sm">پیام</p>
                <div className="mt-2">
                  <textarea
                    className="w-full outline-none bg-[#f1f2f2] px-5 py-2 h-36 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
                    placeholder="لطفا پیام خود را وارد کنید"
                    name=""
                    id=""
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end w-full p-2">
                <button className="w-[260px] bg-[#d1182b] text-white cursor-pointer py-2 relative group">
                  <div className="absolute right-0 top-0 bottom-0 left-full group-hover:left-0 bg-[#18d1be] duration-300"></div>
                  <span className="relative">ارسال</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyContact;
