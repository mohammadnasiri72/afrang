"use client";

import Loading from "@/components/Loading";
import { setFlag } from "@/redux/slices/idEditSec";
import { selectUser } from "@/redux/slices/userSlice";
import { UploadFile } from "@/services/File/FileServices";
import { getUserAdFilter } from "@/services/UserAd/UserAdServices";
import { PostUserSellAd } from "@/services/UserSellAd/UserSellAdServices";
import { getImageUrl } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import {
  Alert,
  Avatar,
  Button,
  Input,
  message,
  Radio,
  Segmented,
  Select,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  FaMobile,
  FaStar,
  FaTimes,
  FaTrash,
  FaVoicemail,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ListProductSec from "./ListProductSec";
const { TextArea } = Input;

function Sell({ productsSec, productEdit, id }) {
  const [loadingCat, setLoadingCat] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [shutterCount, setShutterCount] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [appearance, setAppearance] = useState("");
  const [warrantyStatus, setWarrantyStatus] = useState(false);
  const [warrantyMonths, setWarrantyMonths] = useState(null);
  const [insuranceStatus, setInsuranceStatus] = useState(false);
  const [insuranceMonths, setInsuranceMonths] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const [body, setBody] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [contactInfoType, setContactInfoType] = useState(0);
  const [showPrice, setShowPrice] = useState(1);
  const user = useSelector(selectUser);
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();
  const disPatch = useDispatch();

  useEffect(() => {
    if (showPrice === 0) {
      setSuggestedPrice("");
    }
  }, [showPrice]);

  useEffect(() => {
    if (pathname === "/profile/second-hand") {
      resetState();
    }
  }, [pathname]);

  const htmlToText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (productEdit?.id) {
      setBody(htmlToText(productEdit.body));
      setAppearance(productEdit.appearance);
      setSelectedCategory(productEdit.categoryId);
      setInsuranceMonths(productEdit.insurance.toLocaleString());
      if (productEdit.insurance !== 0) {
        setInsuranceStatus(true);
      }
      setWarrantyMonths(productEdit.warranty.toLocaleString());
      if (productEdit.warranty !== 0) {
        setWarrantyStatus(true);
      }
      setUsageDuration(productEdit.usageTime);
      setSerialNumber(productEdit.serialNumber);
      setProductName(productEdit.title);
      setProductType(productEdit.type);
      setShutterCount(productEdit.usageCount);
      if (productEdit.price === 0) {
        setSuggestedPrice("");
        setShowPrice(0);
      } else {
        setSuggestedPrice(productEdit.price.toLocaleString());
      }
      setPurchaseDate(productEdit.purchaseDate);
      setContactInfoType(productEdit.contactInfo);
      // مقداردهی اولیه عکس‌ها در حالت ویرایش
      if (Array.isArray(productEdit.imageList)) {
        const mappedImages = productEdit.imageList.map((imgUrl, idx) => ({
          uid: `product-edit-img-${idx}`,
          name: imgUrl.split("/").pop() || `image-${idx}`,
          status: "done",
          url: imgUrl,
          thumbUrl: getImageUrl(imgUrl),
          uploadedData: { imageUrl: imgUrl },
        }));
        setFileList(mappedImages);
        setMainImageIdx(0); // اولین عکس را عکس اصلی قرار بده
      }
    }
  }, [productEdit]);

  // افزایش z-index fancybox (مشابه BoxImageGallery)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const resetState = () => {
    setSelectedCategory(undefined);
    setProductName("");
    setProductType("");
    setSuggestedPrice("");
    setSerialNumber("");
    setShutterCount("");
    setUsageDuration("");
    setAppearance("");
    setBody("");
    setPurchaseDate("");
    setWarrantyStatus(false);
    setInsuranceStatus(false);
    setWarrantyMonths(null);
    setInsuranceMonths(null);
    setErrors({});
    setFileList([]);
    setContactInfoType(0);
  };

  const fetchCategories = async () => {
    setLoadingCat(true);
    try {
      const categoryData = await getUserAdFilter();
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
    if (!serialNumber.trim()) newErrors.serialNumber = true;
    if (selectedCategory === undefined) newErrors.selectedCategory = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // message.error("لطفا فیلدهای اجباری را تکمیل کنید");
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
      imageList: getImageListForBackend(),
      title: productName,
      serialNumber,
      price: showPrice === 0 ? 0 : Number(suggestedPrice.replace(/,/g, "")),
      purchaseDate,
      type: productType,
      usageCount: shutterCount,
      usageTime: usageDuration,
      warranty: warrantyMonths ? Number(warrantyMonths.replace(/,/g, "")) : 0,
      insurance: insuranceMonths
        ? Number(insuranceMonths.replace(/,/g, ""))
        : 0,
      appearance,
      body,
      contactInfo: contactInfoType,
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
        title: `آگهی شما با موفقیت ${id ? "ویرایش" : "ثبت"} شد`,
      });
      disPatch(setFlag((e) => !e));
      startTransition(() => {
        router.push("/profile/second-hand");
      });

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

  const uploadHandler = async (file) => {
    setLoadingFile(true);
    try {
      const uploadResult = await UploadFile(file);
      setFileList((prevList) =>
        prevList.map((item) =>
          item.uid === file.uid
            ? {
                ...item,
                uploadedData: uploadResult,
                url: uploadResult.imageUrl,
                thumbUrl: getImageUrl(uploadResult.imageUrl),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleRemoveImage = (img) => {
    const index = fileList?.findIndex((item) => item.uid === img.uid);
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  // تابع تغییر عکس اصلی (فقط ترتیب ارسال به بک‌اند را تغییر می‌دهد)
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const handleSetMainImage = (index) => {
    setMainImageIdx(index);
  };

  // هنگام ارسال به بک‌اند، عکس اصلی را اول قرار بده
  const getImageListForBackend = () => {
    if (fileList.length === 0) return [];
    if (mainImageIdx === 0)
      return fileList.map((f) => f.uploadedData?.imageUrl).filter(Boolean);
    const arr = [...fileList];
    const [main] = arr.splice(mainImageIdx, 1);
    arr.unshift(main);
    return arr.map((f) => f.uploadedData?.imageUrl).filter(Boolean);
  };

  // تابع باز کردن Fancybox برای کروسل عکس‌ها
  const openGallery = (idx) => {
    const images = fileList
      .map(
        (file) =>
          file.thumbUrl ||
          file.url ||
          (file.uploadedData && getImageUrl(file.uploadedData.imageUrl))
      )
      .filter(Boolean);
    Fancybox.show(
      images.map((src, i) => ({
        src,
        thumb: src,
        type: "image",
        alt: `عکس ${i + 1}`,
      })),
      { startIndex: idx }
    );
  };

  const selectBefore = (
    <Select
      value={showPrice}
      onChange={(e) => {
        setShowPrice(e);
      }}
    >
      <Select.Option value={1}>قیمت پیشنهادی</Select.Option>
      <Select.Option value={0}>توافقی (تماس بگیرید)</Select.Option>
    </Select>
  );

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  return (
    <>
      <div className="w-full">
        {pathname === "/profile/second-hand" && (
          <ListProductSec productsSec={productsSec} />
        )}
        {(pathname === "/profile/second-hand/add" ||
          pathname.includes("/profile/second-hand/edit")) && (
          <div className="bg-white sm:p-5 p-1 rounded-lg">
            {/* عنوان */}
            <div className="flex justify-between items-center mb-4 mt-4 sm:mt-0">
              <h2 className="sm:text-xl font-semibold text-gray-800 line-clamp-1">
                فرم فروش کالای دسته دوم
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    router.back();
                  });
                }}
                className="sm:px-4 px-2 sm:py-2 py-1 text-sm bg-[#d1182b] !text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626] whitespace-nowrap"
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
                  description={
                    <span className="text-sm font-bold text-teal-500">
                      توجه : ثبت سریال محصول و یا جعبه آن جهت دوربین های دیجیتال
                      ، دوربین های فیلمبرداری و انواع لنز اجباری می باشد
                    </span>
                  }
                  type="info"
                  showIcon
                />
              </div>
              {/* دسته بندی محصول */}
              <div className="mb-6 box-category-select">
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
              {/* تاریخ خرید محصول */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  تاریخ خرید محصول
                </label>
                <div className="relative">
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={purchaseDate}
                    containerStyle={{
                      width: "100%",
                    }}
                    onChange={(date) => {
                      setPurchaseDate(
                        date?.isValid ? date.format("YYYY/MM/DD") : null
                      );
                    }}
                    format="YYYY/MM/DD"
                    inputClass={`w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
                    inputProps={{ readOnly: true }}
                    placeholder="انتخاب تاریخ خرید"
                    calendarPosition="bottom-right"
                  />
                  {purchaseDate && (
                    <button
                      type="button"
                      onClick={() => setPurchaseDate(null)}
                      className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 !text-gray-400 hover:!text-gray-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
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
                  className={`w-full !text-[16px] ${
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
                  className="w-full !text-[16px]"
                />
              </div>
              {/* قیمت پیشنهادی */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  قیمت پیشنهادی
                </label>
                <Input
                  disabled={showPrice === 0}
                  addonBefore={selectBefore}
                  suffix="تومان"
                  value={suggestedPrice.toLocaleString()}
                  onChange={(e) => {
                    const raw = toEnglishNumber(e.target.value).replace(
                      /,/g,
                      ""
                    );
                    if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                      const formatted =
                        raw === "" ? "" : Number(raw).toLocaleString();
                      setSuggestedPrice(formatted);
                    }
                  }}
                  placeholder="قیمت پیشنهادی را وارد کنید"
                  className="w-full !text-[16px]"
                />
              </div>
              {/* شماره سریال محصول */}
              <div className="mb-6">
                <label
                  className={`block text-gray-700 text-sm font-bold mb-2${
                    errors.serialNumber ? " text-red-important" : ""
                  }`}
                >
                  سریال محصول <span className="text-red-500">*</span>
                </label>
                <Input
                  value={serialNumber}
                  onChange={(e) => {
                    setSerialNumber(e.target.value);
                    if (errors.serialNumber && e.target.value.trim()) {
                      setErrors((prev) => ({ ...prev, serialNumber: false }));
                    }
                  }}
                  placeholder="سریال محصول را وارد کنید"
                  className={`w-full !text-[16px] ${
                    errors.serialNumber ? " border-red-important" : ""
                  }`}
                />
              </div>
              {/* کارکرد شاتر */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  کارکرد شاتر (فقط دوربین SLR)
                </label>
                <Input
                  value={shutterCount}
                  onChange={(e) => setShutterCount(e.target.value)}
                  placeholder="تعداد شات یا کارکرد شاتر را وارد کنید"
                  className="w-full !text-[16px]"
                />
              </div>
              {/* مدت زمان استفاده */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  مدت زمان استفاده
                </label>
                <Input
                  value={usageDuration}
                  onChange={(e) => setUsageDuration(e.target.value)}
                  placeholder="مدت زمان استفاده را وارد کنید"
                  className="w-full !text-[16px]"
                />
              </div>
              {/* وضعیت ظاهری */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  وضعیت ظاهری
                </label>
                <TextArea
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value)}
                  placeholder="توضیحی درباره وضعیت ظاهری محصول بنویسید"
                  autoSize={{ minRows: 4, maxRows: 8 }}
                  className="w-full !text-justify"
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
                <div className="SegmentedBuy  overflow-hidden flex justify-center bg-white z-50 transition-all duration-300 w-full ">
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
                            <div className="pt-2">ایمیل و موبایل</div>
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

                            <div className="pt-2">فقط موبایل</div>
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
                            <div className="pt-2">فقط ایمیل</div>
                          </div>
                        ),
                        value: 2,
                      },
                    ]}
                  />
                </div>
              </div>
              {/* وضعیت گارانتی */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  وضعیت گارانتی
                </label>
                <div className="flex flex-wrap gap-2 items-center">
                  <Radio.Group
                    onChange={(e) => {
                      setWarrantyStatus(e.target.value);
                      if (!e.target.value) {
                        setWarrantyMonths(null);
                      }
                    }}
                    value={warrantyStatus}
                    optionType="button"
                    buttonStyle="solid"
                    className=""
                  >
                    <Radio.Button value={true}>دارد</Radio.Button>
                    <Radio.Button value={false}>ندارد</Radio.Button>
                  </Radio.Group>
                  {warrantyStatus === true && (
                    <div className="flex items-center gap-2">
                      <Input
                        suffix="ماه"
                        value={warrantyMonths}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, "");
                          if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                            const formatted =
                              raw === "" ? "" : Number(raw).toLocaleString();
                            setWarrantyMonths(formatted);
                          }
                        }}
                        placeholder="تعداد ماه‌های باقی‌مانده گارانتی"
                        className="w-40 !text-[16px]"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* وضعیت بیمه */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  وضعیت بیمه
                </label>
                <div className="flex flex-wrap gap-2 items-center">
                  <Radio.Group
                    onChange={(e) => {
                      setInsuranceStatus(e.target.value);
                      if (!e.target.value) {
                        setInsuranceMonths(null);
                      }
                    }}
                    value={insuranceStatus}
                    className=""
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value={true}>دارد</Radio.Button>
                    <Radio.Button value={false}>ندارد</Radio.Button>
                  </Radio.Group>
                  {insuranceStatus === true && (
                    <div className=" flex items-center gap-2 ">
                      <Input
                        suffix="ماه"
                        value={insuranceMonths}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, "");
                          if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                            const formatted =
                              raw === "" ? "" : Number(raw).toLocaleString();
                            setInsuranceMonths(formatted);
                          }
                        }}
                        placeholder="تعداد ماه‌های باقی‌مانده بیمه"
                        className="w-40 !text-[16px]"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* تصاویر محصول  */}
              <div className="mb-6 border-2 border-[#0001] rounded-lg p-4 duration-300 hover:border-blue-500 shadow-lg hover:shadow-2xl">
                <label className="block text-gray-700 text-sm font-bold mb-5">
                  تصاویر محصول (حداکثر 10 عکس)
                </label>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) => {
                    setFileList((prevList) =>
                      newFileList.map((file) => {
                        const old = prevList?.find((f) => f.uid === file.uid);
                        return old
                          ? { ...file, uploadedData: old.uploadedData }
                          : file;
                      })
                    );
                  }}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      message.error("فقط فایل تصویری مجاز است!");
                      return Upload.LIST_IGNORE;
                    }
                    if (fileList.length >= 10) {
                      message.error("حداکثر 10 عکس می‌توانید آپلود کنید.");
                      return Upload.LIST_IGNORE;
                    }
                    uploadHandler(file);
                    return true;
                  }}
                  onRemove={handleRemoveImage}
                  maxCount={10}
                  multiple
                  className="custom-upload-grid"
                  showUploadList={false}
                />
                {/* گرید سفارشی عکس‌ها */}
                <div className="flex flex-wrap justify-center w-full mt-2">
                  {fileList.map((file, idx) => (
                    <div className="sm:p-3 p-2">
                      <div
                        key={file.uid}
                        onClick={() => openGallery(idx)}
                        className={`relative group border rounded-lg overflow-hidden shadow-md transition-all duration-200 sm:w-[110px] w-[80px] sm:h-[110px] h-[80px] bg-white cursor-pointer ${
                          mainImageIdx === idx
                            ? "ring-2 ring-[#d1182b] border-[#d1182b]"
                            : "border-gray-200"
                        }`}
                      >
                        {file.thumbUrl ||
                        file.url ||
                        (file.uploadedData && file.uploadedData.imageUrl) ? (
                          <img
                            src={
                              file.thumbUrl ||
                              file.url ||
                              (file.uploadedData &&
                                getImageUrl(file.uploadedData.imageUrl))
                            }
                            alt={file.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : null}
                        {/* اسپینر فقط روی عکس در حال آپلود */}
                        {loadingFile && idx === fileList.length - 1 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-20">
                            <Spin size="large" />
                          </div>
                        )}
                        {/* آیکون حذف بالا چپ با سطل آشغال */}
                        <Tooltip title="حذف عکس">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(file);
                            }}
                            className="absolute cursor-pointer top-1 left-1 bg-white/90 rounded-full p-1 !text-red-500 hover:bg-red-100 shadow-sm z-10 border border-red-100"
                          >
                            <FaTrash size={16} />
                          </button>
                        </Tooltip>
                        {/* آیکون ستاره برای انتخاب عکس اصلی */}
                        <Tooltip
                          title={
                            mainImageIdx === idx
                              ? "عکس اصلی"
                              : "انتخاب به عنوان عکس اصلی"
                          }
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetMainImage(idx);
                            }}
                            className={`absolute cursor-pointer top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm z-10 border border-gray-200 ${
                              mainImageIdx === idx
                                ? "!text-yellow-400"
                                : "!text-[#333] hover:!text-yellow-400"
                            }`}
                          >
                            <FaStar size={16} />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                  {/* دکمه آپلود فقط اگر عکس در حال آپلود نیست */}
                  {!loadingFile && fileList.length < 10 && (
                    <div className="p-2">
                      <div
                        className="flex flex-col justify-center items-center border rounded-lg sm:h-[110px] w-[80px] sm:w-[110px] h-[80px] cursor-pointer hover:border-[#d1182b] bg-white"
                        onClick={() =>
                          document
                            .querySelector(
                              '.custom-upload-grid input[type="file"]'
                            )
                            .click()
                        }
                      >
                        <span className="text-[#d1182b] text-2xl">+</span>
                        <div style={{ marginTop: 8 }}>آپلود</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* شرح کامل */}
              <div className="mb-6 ">
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
                .box-category-select .ant-select-selector {
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
                  disabled={loadingFile || loadingForm}
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

export default Sell;
