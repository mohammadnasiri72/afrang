"use client";

import { UploadFile } from "@/services/File/FileServices";
import { getUserAdFilter } from "@/services/UserAd/UserAdServices";
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
import Swal from "sweetalert2";
const { TextArea } = Input;

function Sell() {
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
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
  const [warrantyMonths, setWarrantyMonths] = useState("");
  const [insuranceStatus, setInsuranceStatus] = useState(false);
  const [insuranceMonths, setInsuranceMonths] = useState("");
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [body, setBody] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

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

  const handleSubmit = () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = true;
    if (!serialNumber.trim()) newErrors.serialNumber = true;
    if (!appearance.trim()) newErrors.appearance = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      message.error("لطفا فیلدهای اجباری را تکمیل کنید");
      return;
    }
    // اینجا می‌توانی ارسال به سرور یا سایر منطق‌ها را اضافه کنی
    message.success("محصول با موفقیت ثبت شد!");
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
      setImageList([...imageList, uploadResult.imageUrl]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoadingFile(false);
    }
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            دسته‌بندی کالا
          </label>
          <Select
            showSearch
            placeholder="انتخاب دسته‌بندی"
            loading={loading}
            value={selectedCategory}
            onChange={setSelectedCategory}
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
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تاریخ خرید محصول
          </label>
          <div className="relative">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={purchaseDate}
              onChange={(date) => {
                setPurchaseDate(
                  date?.isValid ? date.format("YYYY-MM-DD") : null
                );
              }}
              format="YYYY/MM/DD"
              inputClass={`w-full px-4 py-1`}
              placeholder="انتخاب تاریخ خرید"
              calendarPosition="bottom-right"
            />
            {purchaseDate && (
              <button
                type="button"
                onClick={() => setPurchaseDate(null)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
            value={suggestedPrice}
            onChange={(e) => setSuggestedPrice(e.target.value)}
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
          <div className="flex gap-2 items-center">
            <Radio.Group
              onChange={(e) => setWarrantyStatus(e.target.value)}
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
                  type="number"
                  min={1}
                  value={warrantyMonths}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setWarrantyMonths(val);
                    }
                  }}
                  placeholder="تعداد ماه‌های باقی‌مانده گارانتی"
                  className="w-40"
                  inputMode="numeric"
                />
                <span className="text-gray-600">ماه</span>
              </div>
            )}
          </div>
        </div>
        {/* وضعیت بیمه */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            وضعیت بیمه
          </label>
          <div className="flex gap-2 items-center">
            <Radio.Group
              onChange={(e) => setInsuranceStatus(e.target.value)}
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
                  type="number"
                  min={1}
                  value={insuranceMonths}
                  onChange={(e) => {
                    // فقط اعداد مثبت و بدون اعشار
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setInsuranceMonths(val);
                    }
                  }}
                  placeholder="تعداد ماه‌های باقی‌مانده بیمه"
                  className="w-40"
                  inputMode="numeric"
                />
                <span className="text-gray-600">ماه </span>
              </div>
            )}
          </div>
        </div>
        {/* تصاویر محصول  */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تصاویر محصول (حداکثر 10 عکس)
          </label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => {
              setFileList(fileList);
            }}
            beforeUpload={(file) => {
              uploadHandler(file);
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("فقط فایل تصویری مجاز است!");
                return Upload.LIST_IGNORE;
              }
              if (fileList.length >= 10) {
                message.error("حداکثر 10 عکس می‌توانید آپلود کنید.");
                return Upload.LIST_IGNORE;
              }
              return true;
            }}
            maxCount={10}
            multiple
            className="custom-upload-grid"
          >
            {fileList.length < 10 && (
              <div>
                <span className="text-[#d1182b] text-2xl">+</span>
                <div style={{ marginTop: 8 }}>آپلود</div>
              </div>
            )}
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
          .text-red-important {
            color: #ef4444 !important;
          }
          .custom-upload-grid .ant-upload-list-picture-card {
            display: grid !important;
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
            }
          }
        `}</style>
        <div className="flex justify-end">
          <Button
            disabled={loadingFile}
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
