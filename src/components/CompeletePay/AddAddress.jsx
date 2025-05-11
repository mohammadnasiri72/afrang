"use client";
import {
  addAddress,
  getAddress,
  getAddressId,
  getCity,
  getProvince,
} from "@/services/order/orderService";
import { Button, Divider, Modal, Select, Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { MdEditSquare, MdOutlinePhoneAndroid } from "react-icons/md";
import Swal from "sweetalert2";

function AddAddress({ getAddressFu, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const isRequestedProvince = useRef(false);

  

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const user = Cookies.get("user");
  const userId = JSON.parse(user).userId;
  const token = JSON.parse(user).token;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "نام الزامی است";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "نام خانوادگی الزامی است";
    }
    if (!selectedProvince) {
      newErrors.selectedProvince = "استان الزامی است";
    }
    if (!selectedCity) {
      newErrors.selectedCity = "شهر الزامی است";
    }
    if (!nationalCode.trim()) {
      newErrors.nationalCode = "کد ملی الزامی است";
    }
    if (!postalCode.trim()) {
      newErrors.postalCode = "کد پستی الزامی است";
    }
    if (!address.trim()) {
      newErrors.address = "آدرس الزامی است";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOk = async () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      id: id || 0,
      userId,
      fullName,
      mobile,
      provinceId: selectedProvince,
      provinceTitle: provinceList.find(
        (ev) => ev.provinceId === selectedProvince
      ).title,
      cityId: selectedCity,
      cityTitle: cityList.find((ev) => ev.id === selectedCity).title,
      address,
      nationalCode,
      postalCode,
      latitude: "",
      longitude: "",
    };

    setLoading(true);
    try {
      await addAddress(data, token);
      resetHandler();
      getAddressFu();
      Toast.fire({
        icon: "success",
        text: id ? "ویرایش آدرس با موفقیت انجام شد" : "آدرس جدید اضافه شد",
        customClass: {
          container: "toast-modal",
        },
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const resetHandler = () => {
    setIsModalOpen(false);
    setErrors({});
    setFullName("");
    setMobile("");
    setSelectedCity("");
    setNationalCode("");
    setPostalCode("");
    setAddress("");
    setLoading(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // get province
  useEffect(() => {
    if (isModalOpen) {
      const getProvinceFu = async () => {
        if (isRequestedProvince.current) return;
        isRequestedProvince.current = true;

        try {
          const items = await getProvince();

          if (items) {
            setProvinceList(items);
          }
        } catch (error) {}
      };
      getProvinceFu();
    }
  }, [isModalOpen]);

  // get city
  useEffect(() => {
    const getCityFu = async () => {
      try {
        const items = await getCity(selectedProvince);
        if (items) {
          setCityList(items);
        }
      } catch (error) {
      } finally {
        //   setLoading(false);
      }
    };

    if (selectedProvince) {
      getCityFu();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (id && isModalOpen) {
      const getAddressIdFu = async () => {
        try {
          const items = await getAddressId(id, token);

          if (items) {
            setFullName(items[0].fullName);
            setMobile(items[0].mobile);
            setSelectedProvince(items[0].provinceId);
            setSelectedCity(items[0].cityId);
            setNationalCode(items[0].nationalCode);
            setPostalCode(items[0].postalCode);
            setAddress(items[0].address);
          }
        } catch (error) {
        } finally {
          //   setLoading(false);
        }
      };
      getAddressIdFu();
    }
  }, [isModalOpen]);

  return (
    <>
      {id ? (
        <div className="flex justify-end items-center gap-3 border-t border-gray-100">
          <div className="w-[100px]">
            <button
              onClick={showModal}
              className="text-center text-[#fff] w-full rounded-[5px] bg-[#1e88e5] block font-[600] p-2 cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <MdEditSquare />
                <span>ویرایش</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <Button type="primary" onClick={showModal}>
          افزودن آدرس تحویل
        </Button>
      )}
      <Modal
        title={id ? "ویرایش آدرس" : "آدرس تحویل"}
        open={isModalOpen}
        onOk={handleOk}
        width={{
          xs: "100%",
          sm: "90%",
          md: "80%",
          lg: "70%",
          xl: "60%",
          xxl: "50%",
        }}
        onCancel={handleCancel}
        footer={[
          <div key="footer" className="flex items-center gap-3 justify-end">
            <div className="">
              <div className="w-full">
                <button
                  disabled={loading}
                  onClick={handleOk}
                  className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-5 py-[12px] ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span>{id ? "درحال ویرایش" : "درحال ثبت"}</span>
                      <Spin className="white-spin" size="small" />
                    </div>
                  ) : id ? (
                    "ویرایش"
                  ) : (
                    "تایید"
                  )}
                </button>
              </div>
            </div>
            <div className="w-24">
              <div
                onClick={handleCancel}
                className="text-center text-[#545454] w-full rounded-[5px] bg-[#eceded] block font-[600] px-0 py-[12px] cursor-pointer"
              >
                بازگشت
              </div>
            </div>
          </div>,
        ]}
      >
        <Divider />
        <div>
          <div className="w-full flex items-start flex-wrap mt-4">
            <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                نام و نام خانوادگی تحویل گیرنده*
              </label>
              <div
                className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border  ${
                  errors.fullName ? " border-red-500" : "border-[#0005]"
                }`}
              >
                <FaUser className="text-[#656565]" />
                <input
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  value={fullName}
                  className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="نام و نام خانوادگی تحویل گیرنده."
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="sm:w-1/2 w-full mb-4 sm:pr-2">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                شماره تلفن تحویل گیرنده*
              </label>
              <div
                className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${
                  errors.mobile ? "border-red-500" : "border-[#0005]"
                }`}
              >
                <MdOutlinePhoneAndroid className="text-[#656565] text-2xl" />
                <input
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setErrors((prev) => ({ ...prev, mobile: "" }));
                  }}
                  value={mobile}
                  className="mr-[10px] py-[4px] w-full bg-transparent text-right outline-none"
                  type="tel"
                  name=""
                  id=""
                  placeholder="شماره تلفن تحویل گیرنده"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div
              className={`sm:w-1/2 w-full sm:pl-2  ${
                errors.selectedProvince ? "order-select-err" : "order-select"
              }`}
            >
              <label className="text-[#656565] text-[16px] mb-[10px]">
                استان*
              </label>
              <div className="mt-3">
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  className="w-full flex items-center"
                  size="large"
                  value={selectedProvince ? selectedProvince : "انتخاب استان"}
                  onChange={(value) => {
                    setSelectedProvince(value);
                    setErrors((prev) => ({ ...prev, selectedProvince: "" }));
                  }}
                  suffixIcon={
                    <FaCaretDown className="text-[#d1182b] text-lg" />
                  }
                  options={provinceList.map((province) => ({
                    value: province.provinceId,
                    label: <div className="p-3">{province.title}</div>,
                  }))}
                />
              </div>
              {errors.selectedProvince && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.selectedProvince}
                </p>
              )}
            </div>
            <div
              className={`sm:w-1/2 w-full sm:pr-2  ${
                errors.selectedCity ? "order-select-err" : "order-select"
              }`}
            >
              <label className="text-[#656565] text-[16px] mb-[10px]">
                شهر*
              </label>
              <div className="mt-3">
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  className=" w-full flex items-center"
                  size="large"
                  value={selectedCity ? selectedCity : "انتخاب شهر"}
                  onChange={(value) => {
                    setSelectedCity(value);
                    setErrors((prev) => ({ ...prev, selectedCity: "" }));
                  }}
                  suffixIcon={
                    <FaCaretDown className="text-[#d1182b] text-lg" />
                  }
                  options={cityList.map((city) => ({
                    value: city.id,
                    label: <div className="p-3">{city.title}</div>,
                  }))}
                />
              </div>
              {errors.selectedCity && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.selectedCity}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex items-start flex-wrap mt-5">
            <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                کد ملی*
              </label>
              <div
                className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border  ${
                  errors.nationalCode ? " border-red-500" : "border-[#0005]"
                }`}
              >
                <FaUser className="text-[#656565]" />
                <input
                  onChange={(e) => {
                    setNationalCode(e.target.value);
                    setErrors((prev) => ({ ...prev, nationalCode: "" }));
                  }}
                  value={nationalCode}
                  className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                  type="number"
                  name=""
                  id=""
                  placeholder="کد ملی تحویل گیرنده."
                />
              </div>
              {errors.nationalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nationalCode}
                </p>
              )}
            </div>

            <div className="sm:w-1/2 w-full mb-4 sm:pr-2">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                کد پستی*
              </label>
              <div
                className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${
                  errors.postalCode ? "border-red-500" : "border-[#0005]"
                }`}
              >
                <MdOutlinePhoneAndroid className="text-[#656565] text-2xl" />
                <input
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    setErrors((prev) => ({ ...prev, postalCode: "" }));
                  }}
                  value={postalCode}
                  className="mr-[10px] py-[4px] w-full bg-transparent text-right outline-none"
                  type="number"
                  name=""
                  id=""
                  placeholder="کد پستی تحویل گیرنده"
                />
              </div>
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>
          <div className="w-full flex items-center flex-wrap mt-5">
            <div className="w-full mb-4">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                آدرس پستی*
              </label>

              <textarea
                className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-start mt-2 border h-32 ${
                  errors.address ? " border-red-500" : "border-[#0005]"
                }`}
                name=""
                id=""
                placeholder="آدرس پستی تحویل گیرنده"
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, address: "" }));
                }}
                value={address}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddAddress;
