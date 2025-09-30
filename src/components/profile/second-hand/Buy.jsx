"use client";

import Loading from "@/components/Loading";
import { setFlag } from "@/redux/slices/idEditSec";
import { selectUser } from "@/redux/slices/userSlice";
import { getUserAdFilter2 } from "@/services/UserAd/UserAdServices";
import { PostUserBuyAd } from "@/services/UserSellAd/UserSellAdServices";
import { Alert, Avatar, Button, Input, Segmented, Select, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaMobile, FaVoicemail } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ListProductBuy from "./ListProductBuy";
const { TextArea } = Input;

function Buy({ productsSec, productEdit, id }) {
  const [loadingCat, setLoadingCat] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [nickname, setNickname] = useState("");
  const [productType, setProductType] = useState("");
  const [errors, setErrors] = useState({});

  const [body, setBody] = useState("");

  const [contactInfoType, setContactInfoType] = useState(0);
  const user = useSelector(selectUser);

  const { flag } = useSelector((state) => state.idEdit);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const disPatch = useDispatch();

  useEffect(() => {
    if (pathname === "/profile/second-hand") {
      resetState();
    }
  }, [pathname]);

  useEffect(() => {
    if (user?.displayName && id === 0) {
      setNickname(user?.displayName);
    }
  }, [user]);

  const htmlToText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (productEdit?.id) {
      setBody(htmlToText(productEdit.description));
      setSelectedCategory(productEdit.categoryId);
      setProductName(productEdit.title);
      setProductType(productEdit.type);
      setNickname(productEdit.nickname);
      setContactInfoType(productEdit.contactInfo);
    }
  }, [productEdit]);

  const resetState = () => {
    setSelectedCategory(undefined);
    setProductName("");
    setProductType("");
    setBody("");
    setErrors({});
    setContactInfoType(0);
    setNickname(user?.displayName);
  };
  const fetchCategories = async () => {
    setLoadingCat(true);
    try {
      const categoryData = await getUserAdFilter2();
      setCategoryList(categoryData?.categories);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingCat(false);
    }
  };

  useEffect(() => {
    if (productEdit?.id) {
      fetchCategories();
    }
  }, [productEdit]);

  const handleDropdownVisibleChange = (open) => {
    setDropdownOpen(open);
    if (open && categoryList.length === 0 && !loadingCat) {
      fetchCategories();
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = true;
    if (!nickname.trim()) newErrors.nickname = true;
    if (selectedCategory === undefined) newErrors.selectedCategory = true;
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
      id: id ? id : 0,
      categoryId: selectedCategory ? selectedCategory : 0,
      title: productName,
      type: productType,
      description: body,
      contactInfo: contactInfoType,
      nickname,
    };

    try {
      setLoadingForm(true);
      const response = await PostUserBuyAd(data, user?.token);

      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        title: `آگهی شما با موفقیت ${id ? "ویرایش" : "ثبت"} شد`,
      });
      startTransition(() => {
        router.push("/profile/second-hand");
      });
      disPatch(setFlag(!flag));
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
      <div className="w-full">
        {pathname === "/profile/second-hand" && (
          <ListProductBuy productsSec={productsSec} />
        )}
        {(pathname === "/profile/second-hand/add" ||
          pathname.includes("/profile/second-hand/edit/")) && (
          <div className="bg-white sm:p-5 p-1 rounded-lg">
            {/* عنوان */}
            <div className="flex justify-between items-center mb-4 sm:mt-0 mt-4">
              <h2 className="sm:text-xl font-semibold text-gray-800 line-clamp-1">
                فرم خرید کالای دسته دوم
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    router.back();
                  });
                }}
                className="sm:px-4 px-2 sm:py-2 py-1 whitespace-nowrap text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626]"
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
                  className={`block text-gray-700 text-sm font-bold mb-2${
                    errors.selectedCategory ? " text-red-important" : ""
                  }`}
                >
                  دسته‌بندی کالا <span className="text-red-500">*</span>
                </label>
                <Select
                  allowClear
                  showSearch
                  placeholder="انتخاب دسته‌بندی"
                  loading={loadingCat}
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
                    loadingCat ? <Spin size="small" /> : "دسته‌بندی یافت نشد"
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
                  نام کاربر قابل نمایش <span className="text-red-500">*</span>
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
              <div className="mb-6 sm:hidden block">
                <label className={`block text-gray-700 text-sm font-bold mb-2`}>
                  اطلاعات تماس <span className="text-red-500">*</span>
                </label>
                <Select
                  value={contactInfoType}
                  onChange={(value) => {
                    setContactInfoType(value);
                  }}
                  className="w-full"
                  options={[
                    { value: 0, label: "نمایش ایمیل و موبایل" },
                    { value: 1, label: "فقط نمایش موبایل" },
                    { value: 2, label: "فقط نمایش ایمیل" },
                  ]}
                />
              </div>
              <div className="sm:flex hidden flex-col mb-6 items-start justify-center p-2 rounded-lg border border-[#0003]">
                <span className="mb-2 font-bold text-gray-700">
                  اطلاعات تماس
                </span>
                <div className="SegmentedBuy overflow-hidden flex justify-center bg-white z-50 transition-all duration-300 w-full ">
                  <Segmented
                    className="w-full overflow-auto"
                    value={contactInfoType}
                    onChange={(value) => {
                      setContactInfoType(value);
                    }}
                    options={[
                      {
                        label: (
                          <div style={{ padding: 4 }}>
                            <Avatar
                              style={{
                                backgroundColor:
                                  contactInfoType === 0 ? "#d1182b" : "#3338",
                              }}
                              icon={<FaVoicemail />}
                            />
                            <div className="pt-2">نمایش ایمیل و موبایل</div>
                          </div>
                        ),
                        value: 0,
                      },
                      {
                        label: (
                          <div style={{ padding: 4 }}>
                            <Avatar
                              style={{
                                backgroundColor:
                                  contactInfoType === 1 ? "#d1182b" : "#3338",
                              }}
                              icon={<FaMobile />}
                            />

                            <div className="pt-2">نمایش موبایل</div>
                          </div>
                        ),
                        value: 1,
                      },
                      {
                        label: (
                          <div style={{ padding: 4 }}>
                            <Avatar
                              style={{
                                backgroundColor:
                                  contactInfoType === 2 ? "#d1182b" : "#3338",
                              }}
                              icon={<MdEmail />}
                            />
                            <div className="pt-2">نمایش ایمیل</div>
                          </div>
                        ),
                        value: 2,
                      },
                    ]}
                  />
                </div>
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
                  className="w-full !text-justify"
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

                .SegmentedBuy .ant-segmented {
                  background-color: #ebebeb;
                }
                .SegmentedBuy .ant-segmented-item {
                  width: 100%;
                  font-weight: 600 !important;
                  font-size: 14px;
                  transition: 0.3s;
                }
                .SegmentedBuy .ant-segmented-item-selected {
                  background-color: #fff !important;
                  color: #d1182b !important;
                  border-radius: 6px;
                  font-weight: 900 !important;
                  font-size: 16px !important;
                  transition: 0.3s;
                }
                .SegmentedBuy .ant-segmented-item-selected:hover {
                  color: #d1182b !important;
                }
                .SegmentedBuy .ant-segmented-thumb {
                  background-color: #fff !important;
                  font-weight: 900 !important;
                }
                /* حالت جمع و جورتر در sticky */
                .SegmentedBuy.sticky .ant-segmented-item {
                  font-size: 12px;
                }
                .SegmentedBuy.sticky .ant-segmented-item-selected {
                  font-size: 13px !important;
                  border-radius: 4px;
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
                  {id ? "ویرایش" : "ثبت درخواست"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default Buy;
