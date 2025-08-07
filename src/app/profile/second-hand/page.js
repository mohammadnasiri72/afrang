"use client";

import Buy from "@/components/profile/second-hand/Buy";
import Sell from "@/components/profile/second-hand/Sell";
import { setActiveTab, setIdEdit } from "@/redux/slices/idEditSec";
import { selectUser } from "@/redux/slices/userSlice";
import {
  getUserBuyAd,
  getUserSellAd,
} from "@/services/UserSellAd/UserSellAdServices";
import { Segmented, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const SecondHand = () => {
  const { activeTab } = useSelector((state) => state.idEdit);
  const { flag } = useSelector((state) => state.idEdit);
  const [loadingList, setLoadingList] = useState(false);
  const [productsSec, setProductsSec] = useState([]);
  const [productsBuy, setProductsBuy] = useState([]);

  const disPatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const options = [
    { label: "فروش ", value: 1 },
    { label: "خرید", value: 2 },
  ];

  useEffect(() => {
    const fetchProductsSec = async () => {
      setLoadingList(true);
      try {
        const productsData = await getUserSellAd(user?.token);
        setProductsSec(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingList(false);
      }
    };
    if (user?.token && activeTab === 1) {
      fetchProductsSec();
    }
  }, [user, activeTab, flag]);

  useEffect(() => {
    const fetchProductsSec = async () => {
      setLoadingList(true);
      try {
        const productsData = await getUserBuyAd(user?.token);

        setProductsBuy(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingList(false);
      }
    };
    if (user?.token && activeTab === 2) {
      fetchProductsSec();
    }
  }, [user, activeTab, flag]);

  return (
    <>
      <style jsx global>{`
        .SegmentedProduct .ant-segmented {
          background-color: #ebebeb;
        }
        .SegmentedProduct .ant-segmented-item {
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 8px;
          padding-bottom: 8px;
          margin-right: 10px !important;
          margin-left: 10px !important;
          width: 100%;
          font-weight: 600 !important;
          font-size: 14px;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected {
          background-color: #fff !important;
          color: #d1182b !important;
          border-radius: 6px;
          font-weight: 900 !important;
          font-size: 16px !important;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected:hover {
          color: #d1182b !important;
        }
        .SegmentedProduct .ant-segmented-thumb {
          background-color: #fff !important;
          font-weight: 900 !important;
        }
        /* حالت جمع و جورتر در sticky */
        .SegmentedProduct.sticky .ant-segmented-item {
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 12px;
          margin-right: 4px !important;
          margin-left: 4px !important;
        }
        .SegmentedProduct.sticky .ant-segmented-item-selected {
          font-size: 13px !important;
          border-radius: 4px;
        }
      `}</style>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <div className="flex items-center gap-2 mb-6">
          <FaRecycle className="text-gray-800 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">کالای دسته دوم</h1>
        </div>

        <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
          <div className="w-full SegmentedProduct !overflow-hidden mx-auto flex justify-center">
            <Segmented
              className="font-semibold text-3xl w-full !overflow-auto"
              dir="rtl"
              style={{
                padding: "8px",
                fontFamily: "yekan",
                width: "100%",
              }}
              value={activeTab}
              onChange={(value) => {
                disPatch(setIdEdit(0));
                router.push("/profile/second-hand");
                disPatch(setActiveTab(value));
                setProductsSec([]);
              }}
              options={options}
            />
          </div>
          {!loadingList && (
            <div className="w-full">
              {activeTab === 2 && productsBuy.length > 0 && (
                <Buy productsSec={productsBuy}  />
              )}
              {activeTab === 1 && productsSec.length > 0 && (
                <Sell productsSec={productsSec}  />
              )}
            </div>
          )}
          {loadingList && (
            <div className="flex justify-center items-center w-full h-48">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecondHand;
