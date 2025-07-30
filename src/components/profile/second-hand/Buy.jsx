"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { getUserAdFilter2 } from "@/services/UserAd/UserAdServices";
import {
  getUserSellAd,
  getUserSellAdId,
  PostUserSellAd,
} from "@/services/UserSellAd/UserSellAdServices";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Alert, Button, Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ListProductSec from "./ListProductSec";
const { TextArea } = Input;

function Buy() {
  const [stepPage, setStepPage] = useState(1);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [nickname, setNickname] = useState("");
  const [productType, setProductType] = useState("");
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [body, setBody] = useState("");
  const [productsSec, setProductsSec] = useState([]);
  const [productEdit, setProductEdit] = useState({});
  const [contactInfoType, setContactInfoType] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.displayName) {
      setNickname(user?.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (productEdit?.id) {
      setBody(productEdit.body);
      setSelectedCategory(productEdit.categoryId);
      setProductName(productEdit.title);
      setProductType(productEdit.type);
      // مقداردهی اولیه contactInfoType اگر از سرور می‌آید اینجا ست کن، فعلاً مقدار پیش‌فرض 1
      setContactInfoType(1);
    }
  }, [productEdit]);

  useEffect(() => {
    const fetchProductsSec = async () => {
      setLoadingEdit(true);
      try {
        const productsData = await getUserSellAdId(idEdit, user?.token);
        if (productsData.type === "error") {
          Toast.fire({
            icon: "error",
            title: productsData.message,
          });
          return;
        }
        setProductEdit(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingEdit(false);
      }
    };
    if (idEdit !== 0) {
      fetchProductsSec();
    }
  }, [idEdit]);

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
    fetchProductsSec();
  }, [flag]);

  const resetState = () => {
    setSelectedCategory(undefined);
    setProductName("");
    setProductType("");
    setBody("");
    setErrors({});
    setProductEdit({});
    setIdEdit(0);
    setContactInfoType(1);
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categoryData = await getUserAdFilter2();
      setCategoryList(categoryData?.categories);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idEdit !== 0) {
      fetchCategories();
    }
  }, [idEdit]);

  const handleDropdownVisibleChange = (open) => {
    setDropdownOpen(open);
    if (open && categoryList.length === 0 && !loading) {
      fetchCategories();
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = true;
    if (!nickname.trim()) newErrors.nickname = true;
    if (selectedCategory === undefined) newErrors.selectedCategory = true;
    if (contactInfoType === undefined || contactInfoType === null) newErrors.contactInfoType = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Toast.fire({
        icon: "error",
        title: "لطفا فیلدهای اجباری را تکمیل کنید",
      });
      return;
    }
    const data = {
      langCode: "fa",
      id: idEdit ? idEdit : 0,
      categoryId: selectedCategory ? selectedCategory : 0,
      title: productName,
      type: productType,
      body,
      contactInfoType, // ارسال مقدار انتخاب شده
    };

    try {
      setLoadingForm(true);
      const response = await PostUserSellAd(data, user?.token);

      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        title: `آگهی شما با موفقیت ${idEdit ? "ویرایش" : "ثبت"} شد`,
      });
      setFlag((e) => !e);
      setStepPage(0);
      resetState();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoadingForm(false);
    }
  };

  // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  return (
    <>
      {loadingEdit && (
        <div className="flex justify-center items-center h-screen">
          <Spin />
        </div>
      )}
      {!loadingEdit && (
        <div>
          {stepPage === 0 && (
            <ListProductSec
              productsSec={productsSec}
              setStepPage={setStepPage}
              loadingList={loadingList}
              setFlag={setFlag}
              setIdEdit={setIdEdit}
            />
          )}
          {stepPage === 1 && (
            <div className="bg-white p-5 rounded-lg">
              {/* عنوان */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  فرم خرید کالای دسته دوم
                </h2>
                <button
                  onClick={() => {
                    setStepPage(0);
                  }}
                  className="px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626]"
                >
                  بازگشت به لیست
                </button>
              </div>
              <div className="max-w-2xl mx-auto">
                {/* راهنما */}
                <div className="mb-8">
                  <Alert
                    message={
                      <span className="font-bold">
                        کاربر گرامی در صورتیکه تمایل به نمایش تلفن خود در سایت
                        دارید گزینه مربوط در قسمت پایین فرم را انتخاب نمایید.
                      </span>
                    }
                    type="info"
                    showIcon
                  />
                </div>
                {/* دسته بندی محصول */}
                <div className="mb-6">
                  <label
                    className={`block text-gray-700 text-sm font-bold mb-2${errors.selectedCategory ? " text-red-important" : ""
                      }`}
                  >
                    دسته‌بندی کالا <span className="text-red-500">*</span>
                  </label>
                  <Select
                    allowClear
                    showSearch
                    placeholder="انتخاب دسته‌بندی"
                    loading={loading}
                    value={selectedCategory}
                    onChange={(value) => {
                      setSelectedCategory(
                        value === undefined ? undefined : value
                      );
                      if (errors.selectedCategory && value !== undefined) {
                        setErrors((prev) => ({
                          ...prev,
                          selectedCategory: false,
                        }));
                      }
                    }}
                    optionFilterProp="children"
                    className="w-full"
                    notFoundContent={
                      loading ? <Spin size="small" /> : "دسته‌بندی یافت نشد"
                    }
                    open={dropdownOpen}
                    onOpenChange={handleDropdownVisibleChange}
                  >
                    {categoryList?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                
                {/* عنوان محصول */}
                <div className="mb-6">
                  <label
                    className={`block text-gray-700 text-sm font-bold mb-2${
                      errors.productName ? " text-red-important" : ""
                    }`}
                  >
                    نام محصول <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      if (errors.productName && e.target.value.trim()) {
                        setErrors((prev) => ({ ...prev, productName: false }));
                      }
                    }}
                    placeholder="نام محصول را وارد کنید"
                    className={`w-full${
                      errors.productName ? " border-red-important" : ""
                    }`}
                  />
                </div>
                {/* نوع محصول */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    نوع محصول
                  </label>
                  <Input
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    placeholder="نوع محصول را وارد کنید"
                    className="w-full"
                  />
                </div>
                {/* نام کاربر */}
                <div className="mb-6">
                  <label
                    className={`block text-gray-700 text-sm font-bold mb-2${
                      errors.nickname ? " text-red-important" : ""
                    }`}
                  >
                    نام کاربری قابل نمایش{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      if (errors.nickname && e.target.value.trim()) {
                        setErrors((prev) => ({ ...prev, nickname: false }));
                      }
                    }}
                    placeholder="نام دلخواه جهت نمایش عمومی"
                    className={`w-full${
                      errors.nickname ? " border-red-important" : ""
                    }`}
                  />
                </div>
                {/* اطلاعات تماس */}
                <div className="mb-6">
                  <label
                    className={`block text-gray-700 text-sm font-bold mb-2${errors.contactInfoType ? " text-red-important" : ""}`}
                  >
                    اطلاعات تماس <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={contactInfoType}
                    onChange={(value) => {
                      setContactInfoType(value);
                      if (errors.contactInfoType) {
                        setErrors((prev) => ({ ...prev, contactInfoType: false }));
                      }
                    }}
                    className="w-full"
                    options={[
                      { value: 0, label: "نمایش ایمیل و موبایل" },
                      { value: 1, label: "فقط نمایش موبایل" },
                      { value: 2, label: "فقط نمایش ایمیل" },
                    ]}
                  />
                </div>

                {/* شرح کامل */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    شرح کامل
                  </label>
                  <TextArea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="توضیحی درباره شرح کامل محصول بنویسید"
                    autoSize={{ minRows: 6, maxRows: 10 }}
                    className="w-full"
                  />
                </div>
                
                <style jsx global>{`
                  .border-red-important {
                    border: 1px solid #ef4444 !important;
                  }
                  .ant-select-selector {
                    border: ${errors.selectedCategory
                      ? "1px solid red !important"
                      : ""};
                  }

                  .ant-spin-dot-item {
                    background-color: #d1182b !important;
                  }

                  .text-red-important {
                    color: #ef4444 !important;
                  }
                  .custom-upload-grid .ant-upload-list-picture-card {
                    grid-template-columns: repeat(5, 1fr) !important;
                    gap: 12px !important;
                  }
                  @media (max-width: 900px) {
                    .custom-upload-grid .ant-upload-list-picture-card {
                      grid-template-columns: repeat(3, 1fr) !important;
                    }
                  }
                  @media (max-width: 600px) {
                    .custom-upload-grid .ant-upload-list-picture-card {
                      grid-template-columns: repeat(2, 1fr) !important;
                      gap: 5px !important;
                    }
                  }
                  /* استایل عکس اصلی */
                  .custom-upload-grid .ant-upload-list-item:first-child {
                    border: 2px solid #d1182b !important;
                    box-shadow: 0 0 0 2px #d1182b33;
                  }
                `}</style>
                <div className="flex justify-end">
                  <Button
                    loading={loadingForm}
                    disabled={loadingForm}
                    type="primary"
                    className="bg-[#d1182b] hover:bg-[#b91626]"
                    onClick={handleSubmit}
                  >
                    {idEdit ? "ویرایش" : "ثبت درخواست"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Buy;
