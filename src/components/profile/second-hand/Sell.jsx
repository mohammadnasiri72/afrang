"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { UploadFile } from "@/services/File/FileServices";
import { getUserAdFilter } from "@/services/UserAd/UserAdServices";
import { PostUserSellAd } from "@/services/UserSellAd/UserSellAdServices";
import {
  Alert,
  Button,
  Input,
  Radio,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const { TextArea } = Input;

function Sell() {
  const [loading, setLoading] = useState(false);
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
  const [imageList, setImageList] = useState([]);
  const [body, setBody] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  console.log(fileList);

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
    setImageList([]);
  };

  const user = useSelector(selectUser);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categoryData = await getUserAdFilter();
      setCategoryList(categoryData?.categories);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownOpen(open);
    if (open && categoryList.length === 0 && !loading) {
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
      id: 0,
      categoryId: selectedCategory ? selectedCategory : 0,
      imageList,
      title: productName,
      serialNumber,
      price: Number(suggestedPrice),
      purchaseDate,
      type: productType,
      usageCount: shutterCount,
      usageTime: usageDuration,
      warranty: warrantyMonths ? Number(warrantyMonths) : 0,
      insurance: insuranceMonths ? Number(insuranceMonths) : 0,
      appearance,
      body,
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
        title: "آگهی شما با موفقیت ثبت شد",
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

      if (uploadResult.type === "error") {
        Toast.fire({
          icon: "error",
          title: uploadResult.message,
        });
        return;
      }
      setImageList([...imageList, uploadResult?.imageUrl]);
      
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleRemoveImage = (img) => {
    const index = fileList.findIndex((item) => item.uid === img.uid);
    setImageList((item) => item.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="max-w-2xl mx-auto">
        {/* عنوان */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2 ">
            فروش کالای دسته دوم
          </h2>
        </div>
        {/* راهنما */}
        <div className="mb-8">
          <Alert
            message={
              <span className="font-bold">
                کاربر گرامی توجه داشته باشید که شماره همراه شما در سایت نمایش
                داده خواهد شد.
              </span>
            }
            description={
              <span className="text-sm font-bold text-teal-500">
                توجه : ثبت سریال محصول و یا جعبه آن جهت دوربین های دیجیتال ،
                دوربین های فیلمبرداری و انواع لنز اجباری می باشد
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
            loading={loading}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value === undefined ? undefined : value);
              if (errors.selectedCategory && value !== undefined) {
                setErrors((prev) => ({ ...prev, selectedCategory: false }));
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
                  date?.isValid ? date.format("YYYY-MM-DD") : null
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
                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
        {/* قیمت پیشنهادی */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            قیمت پیشنهادی
          </label>
          <Input
            suffix="تومان"
            value={suggestedPrice.toLocaleString()}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                const formatted =
                  raw === "" ? "" : Number(raw).toLocaleString();
                setSuggestedPrice(formatted);
              }
            }}
            placeholder="قیمت پیشنهادی را وارد کنید"
            className="w-full"
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
            className={`w-full${
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
            className="w-full"
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
            className="w-full"
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
            className="w-full"
          />
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
                  className="w-40"
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
                  className="w-40"
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
            onChange={({ fileList }) => {
              setFileList(fileList);
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
            showUploadList={{ showRemoveIcon: true }}
          >
            {fileList.length < 10 &&
              (loadingFile ? (
                <div className="flex flex-col justify-center items-center text-[#d1182b]">
                  <Spin size="large" />
                  <div className="mt-5">در حال آپلود...</div>
                </div>
              ) : (
                <div>
                  <span className="text-[#d1182b] text-2xl">+</span>
                  <div style={{ marginTop: 8 }}>آپلود</div>
                </div>
              ))}
          </Upload>
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
        `}</style>
        <div className="flex justify-end">
          <Button
            loading={loadingForm}
            disabled={loadingFile || loadingForm}
            type="primary"
            className="bg-[#d1182b] hover:bg-[#b91626]"
            onClick={handleSubmit}
          >
            ثبت درخواست
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
