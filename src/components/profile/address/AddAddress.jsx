"use client";
import {
  addAddress,
  getAddressId,
  getCity,
  getProvince,
} from "@/services/order/orderService";
import { Modal, Select, Spin, Switch, Tooltip } from "antd";
import Cookies from "js-cookie";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Swal from "sweetalert2";

// Create custom icon function
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: "/images/marker-icon.png",
    iconRetinaUrl: "/images/marker-icon-2x.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Map Click Handler Component
const MapClickHandler = ({ onPositionChange }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      if (onPositionChange) {
        onPositionChange(e.latlng);
      }
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, onPositionChange]);

  return null;
};

// Add Search Control Component
const SearchControl = ({ onLocationSelect }) => {
  const map = useMap();
  const searchControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchControlPosition: "topcenter",
    });

    map.addControl(searchControl);
    searchControlRef.current = searchControl;

    // Add event listener for search results
    const handleSearchResult = (e) => {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.location.lat,
          lng: e.location.lng,
        });
      }
    };

    map.on("geosearch/showlocation", handleSearchResult);

    return () => {
      if (searchControlRef.current) {
        map.removeControl(searchControlRef.current);
      }
      map.off("geosearch/showlocation", handleSearchResult);
    };
  }, [map, onLocationSelect]);

  return null;
};

// Map Controller Component
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  return null;
};

// Custom Search Component
const CustomSearch = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (value) => {
    setSearchValue(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await provider.search({ query: value });
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result) => {
    if (onLocationSelect) {
      onLocationSelect({
        lat: result.y,
        lng: result.x,
      });
    }
    setSearchValue("");
    setResults([]);
  };

  return (
    <div className="relative !mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="جستجوی آدرس..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent text-right !text-[16px]"
          dir="rtl"
        />
        {isLoading && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Spin size="small" />
          </div>
        )}
      </div>
      {results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-right border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelect(result)}
            >
              <div className="text-sm text-gray-700">{result.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Map Component
const MapComponent = ({ position, onPositionChange }) => {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <MapClickHandler onPositionChange={onPositionChange} />
      <MapController position={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={createCustomIcon()}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const newPos = marker.getLatLng();
            onPositionChange(newPos);
          },
        }}
      >
        <Popup>
          <div className="text-center">
            <p>موقعیت انتخاب شده</p>
            <small className="text-gray-500 text-xs">
              {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </small>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// Dynamic Map Wrapper
const MapWrapper = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-50">
      <Spin size="large" />
    </div>
  ),
});

function AddAddress({ getAddressFu, id, isOpen, onClose }) {
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
  const [useMapToggle, setUseMapToggle] = useState(false);
  const [position, setPosition] = useState({ lat: 35.6892, lng: 51.389 }); // Default to Tehran
  const [map, setMap] = useState(null);

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

  // Initialize map icons
  useEffect(() => {
    if (typeof window !== "undefined") {
      const iconUrl = "/images/marker-icon.png";
      const iconRetinaUrl = "/images/marker-icon-2x.png";
      const shadowUrl = "/images/marker-shadow.png";

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });
    }
  }, []);

  // Validation patterns
  const patterns = {
    mobile: /^09[0|1|2|3|9][0-9]{8}$/, // شماره موبایل: 09 شروع و 11 رقم
    nationalCode: /^[0-9]{10}$/, // کد ملی: دقیقاً 10 رقم
    postalCode: /^[0-9]{10}$/, // کد پستی: دقیقاً 10 رقم
  };

  // Validation functions
  const validateMobile = (mobile) => {
    if (!mobile.trim()) {
      return "شماره موبایل الزامی است";
    }
    if (!patterns.mobile.test(mobile)) {
      return "شماره موبایل درست نیست";
    }
    return "";
  };

  const validateNationalCode = (code) => {
    if (!code.trim()) {
      return "کد ملی الزامی است";
    }
    if (!patterns.nationalCode.test(code)) {
      return "کد ملی درست نیست";
    }
    // الگوریتم اعتبارسنجی کد ملی ایران
    const digits = code.split("").map(Number);
    const lastDigit = digits[9];
    const sum = digits.slice(0, 9).reduce((acc, digit, index) => {
      return acc + digit * (10 - index);
    }, 0);
    const remainder = sum % 11;
    const isValid =
      remainder < 2 ? lastDigit === remainder : lastDigit === 11 - remainder;
    if (!isValid) {
      return "کد ملی وارد شده معتبر نیست";
    }
    return "";
  };

  const validatePostalCode = (code) => {
    if (!code.trim()) {
      return "کد پستی الزامی است";
    }

    // اطمینان از اینکه فقط اعداد هستند
    if (!/^\d+$/.test(code)) {
      return "کد پستی درست نیست";
    }

    // بررسی طول کد پستی
    if (code.length !== 10) {
      return "کد پستی باید 10 رقم باشد";
    }

    // بررسی اینکه رقم اول صفر نباشد
    if (code[0] === "0") {
      return "کد پستی نمی‌تواند با صفر شروع شود";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    // نام و نام خانوادگی
    if (!fullName.trim()) {
      newErrors.fullName = "نام الزامی است";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "نام باید حداقل 3 حرف باشد";
    }

    // شماره موبایل
    const mobileError = validateMobile(mobile);
    if (mobileError) {
      newErrors.mobile = mobileError;
    }

    // استان و شهر
    if (!selectedProvince) {
      newErrors.selectedProvince = "استان الزامی است";
    }
    if (!selectedCity) {
      newErrors.selectedCity = "شهر الزامی است";
    }

    // کد ملی
    const nationalCodeError = validateNationalCode(nationalCode);
    if (nationalCodeError) {
      newErrors.nationalCode = nationalCodeError;
    }

    // کد پستی
    const postalCodeError = validatePostalCode(postalCode);
    if (postalCodeError) {
      newErrors.postalCode = postalCodeError;
    }

    // آدرس
    if (!address.trim()) {
      newErrors.address = "آدرس الزامی است";
    } else if (address.trim().length < 10) {
      newErrors.address = "آدرس باید حداقل 10 حرف باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePosition = (newPosition) => {
    if (
      newPosition &&
      typeof newPosition.lat === "number" &&
      typeof newPosition.lng === "number"
    ) {
      setPosition(newPosition);
    }
  };

  // Add map click handler when map is created
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e) => {
      updatePosition(e.latlng);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);

  // Map marker component
  const LocationMarker = () => {
    const markerIcon = new L.Icon({
      iconUrl: "/images/marker-icon.png",
      iconRetinaUrl: "/images/marker-icon-2x.png",
      shadowUrl: "/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    return (
      <Marker
        position={position}
        icon={markerIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const newPos = marker.getLatLng();
            updatePosition(newPos);
          },
        }}
      >
        <Popup>
          <div className="text-center">
            <p>موقعیت انتخاب شده</p>
            <small className="text-gray-500 text-xs">
              {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </small>
          </div>
        </Popup>
      </Marker>
    );
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
      provinceTitle: provinceList?.find(
        (ev) => ev.provinceId === selectedProvince
      ).title,
      cityId: selectedCity,
      cityTitle: cityList?.find((ev) => ev.id === selectedCity).title,
      address,
      nationalCode,
      postalCode,
      latitude: useMapToggle ? position.lat.toString() : "",
      longitude: useMapToggle ? position.lng.toString() : "",
    };
    setLoading(true);
    try {
      await addAddress(data, token);
      resetHandler();
      getAddressFu();
      Toast.fire({
        icon: "success",
        text: id ? "ویرایش آدرس با موفقیت انجام شد" : "آدرس جدید اضافه شد",
      
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
       
      });
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setErrors({});
    setFullName("");
    setPosition({ lat: 35.6892, lng: 51.389 });
    setMobile("");
    setSelectedCity("");
    setNationalCode("");
    setPostalCode("");
    setAddress("");
    setLoading(false);
    onClose();
  };

  // get province
  useEffect(() => {
    const getProvinceFu = async () => {
      try {
        const items = await getProvince();
        if (items) {
          setProvinceList(items);
        }
      } catch (error) {}
    };

    getProvinceFu();
  }, []);

  // get city
  useEffect(() => {
    const getCityFu = async () => {
      try {
        const items = await getCity(selectedProvince);
        if (items) {
          setCityList(items);
        }
      } catch (error) {}
    };

    if (selectedProvince) {
      getCityFu();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (id && isOpen) {
      const getAddressIdFu = async () => {
        try {
          const items = await getAddressId(id, token);
          if (items) {
            setFullName(items[0].fullName);
            setPosition({
              lat: parseFloat(items[0].latitude),
              lng: parseFloat(items[0].longitude),
            });
            setMobile(items[0].mobile);
            setSelectedProvince(items[0].provinceId);
            setSelectedCity(items[0].cityId);
            setNationalCode(items[0].nationalCode);
            setPostalCode(items[0].postalCode);
            setAddress(items[0].address);
          }
        } catch (error) {}
      };
      getAddressIdFu();
    }
  }, [isOpen, id]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedCity(""); // Clear city when province changes
    setErrors((prev) => ({ ...prev, selectedProvince: "" }));
  };

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            {id ? "ویرایش آدرس" : "افزودن آدرس جدید"}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="!text-gray-400 hover:!text-gray-600" />
          </button>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      className="custom-modal"
      style={{ zIndex: 9999 }}
    >
      <div className="mt-6 space-y-4">
        {/* Map Toggle Switch */}
        <div className="flex items-center gap-2">
          <Switch
            checked={useMapToggle}
            onChange={(checked) => {
              setUseMapToggle(checked);
            }}
            className={useMapToggle ? "bg-[#d1182b]" : ""}
          />
          <span className="text-gray-700 flex items-center gap-1">
            <MdLocationOn />
            انتخاب موقعیت از روی نقشه
          </span>
          {useMapToggle && (
            <Tooltip title="برای تغییر موقعیت روی نقشه کلیک کنید، مارکر را بکشید یا از جستجوی آدرس استفاده کنید">
              <FaMapMarkerAlt className="text-gray-400 cursor-help" />
            </Tooltip>
          )}
        </div>

        {/* Map Component */}
        {useMapToggle && (
          <>
            <CustomSearch onLocationSelect={updatePosition} />
            <div className="h-[300px] rounded-lg overflow-hidden border border-gray-300 relative">
              <MapWrapper
                position={position}
                onPositionChange={updatePosition}
              />
            </div>
          </>
        )}

        {/* Row 1: نام و نام خانوادگی، استان، شهر */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 !mb-2">
              نام و نام خانوادگی*
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border !text-[16px] ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="نام و نام خانوادگی"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 !mb-2">استان*</label>
            <Select
              placeholder="انتخاب استان"
              className={`w-full ${
                errors.selectedProvince ? "select-error" : ""
              }`}
              onChange={handleProvinceChange}
              value={selectedProvince}
              size="large"
              suffixIcon={<FaCaretDown className="text-[#d1182b]" />}
              classNames={{
                popup: {
                  root: "custom-select-dropdown",
                },
              }}
            >
              {provinceList.map((province) => (
                <Select.Option
                  key={province.provinceId}
                  value={province.provinceId}
                >
                  {province.title}
                </Select.Option>
              ))}
            </Select>
            {errors.selectedProvince && (
              <p className="text-red-500 text-sm mt-1">
                {errors.selectedProvince}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 !mb-2">شهر*</label>
            <Select
              placeholder="انتخاب شهر"
              className={`w-full ${errors.selectedCity ? "select-error" : ""}`}
              onChange={(value) => {
                setSelectedCity(value);
                setErrors((prev) => ({ ...prev, selectedCity: "" }));
              }}
              value={selectedCity}
              disabled={!selectedProvince}
              size="large"
              suffixIcon={<FaCaretDown className="text-[#d1182b]" />}
              classNames={{
                popup: {
                  root: "custom-select-dropdown",
                },
              }}
            >
              {cityList.map((city) => (
                <Select.Option key={city.id} value={city.id}>
                  {city.title}
                </Select.Option>
              ))}
            </Select>
            {errors.selectedCity && (
              <p className="text-red-500 text-sm mt-1">{errors.selectedCity}</p>
            )}
          </div>
        </div>

        {/* Row 2: شماره موبایل، کد ملی، کد پستی */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 !mb-2">شماره موبایل*</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                const value = toEnglishNumber(e.target.value)
                  .replace(/[^0-9]/g, "")
                  .slice(0, 11);
                setMobile(value);
                setErrors((prev) => ({ ...prev, mobile: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border !text-[16px] ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="09xxxxxxxxx"
              dir="ltr"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 !mb-2">کد ملی*</label>
            <input
              type="text"
              value={nationalCode}
              onChange={(e) => {
                const value = toEnglishNumber(e.target.value)
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
                setNationalCode(value);
                setErrors((prev) => ({ ...prev, nationalCode: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border !text-[16px] ${
                errors.nationalCode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="کد ملی 10 رقمی"
              dir="ltr"
            />
            {errors.nationalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.nationalCode}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 !mb-2">کد پستی*</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={postalCode}
              onChange={(e) => {
                const value = toEnglishNumber(e.target.value)
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
                setPostalCode(value);
                if (value.length === 10) {
                  const error = validatePostalCode(value);
                  if (error) {
                    setErrors((prev) => ({ ...prev, postalCode: error }));
                  } else {
                    setErrors((prev) => ({ ...prev, postalCode: "" }));
                  }
                } else {
                  setErrors((prev) => ({ ...prev, postalCode: "" }));
                }
              }}
              className={`w-full px-4 py-2 rounded-lg border !text-[16px] ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="کد پستی 10 رقمی"
              dir="ltr"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        {/* آدرس */}
        <div>
          <label className="block text-gray-700 !mb-2">آدرس*</label>
          <textarea
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent h-32`}
            placeholder="آدرس دقیق"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 text-sm bg-gray-100 !text-gray-700 rounded-md transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 cursor-pointer"
            }`}
          >
            انصراف
          </button>
          <button
            onClick={handleOk}
            disabled={loading}
            className={`px-4 py-2 text-sm bg-[#d1182b] !text-white rounded-md transition-colors min-w-[90px] ${
              loading
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-[#b91626]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <Spin className="white-spin" size="small" />
                <span>{id ? "در حال ویرایش" : "در حال ثبت"}</span>
              </div>
            ) : id ? (
              "ویرایش"
            ) : (
              "ثبت"
            )}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-modal .ant-modal-content {
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .custom-modal .ant-modal-close {
          display: none;
        }

        .custom-select-dropdown {
          z-index: 99999 !important;
        }

        .select-error .ant-select-selector {
          border-color: #ef4444 !important;
        }

        .ant-select-selection-placeholder {
          color: #9ca3af !important;
        }

        .ant-select-selector {
          height: 42px !important;
          padding: 5px 11px !important;
          border-radius: 0.5rem !important;
        }

        .ant-select-selection-item {
          line-height: 30px !important;
        }

        /* Override antd modal z-index */
        .ant-modal-wrap {
          z-index: 9999 !important;
        }
        .ant-modal-mask {
          z-index: 9998 !important;
        }
        .ant-select-dropdown {
          z-index: 99999 !important;
        }

        /* Leaflet Map Styles */
        .map-container {
          position: relative !important;
          height: 100% !important;
          width: 100% !important;
        }

        .leaflet-container {
          height: 100%;
          width: 100%;
          z-index: 1;
          font-family: Yekan !important;
        }

        /* Ensure map controls are above other elements */
        .leaflet-control-container {
          z-index: 1000;
        }

        .leaflet-popup-content {
          margin: 8px 12px;
          text-align: center;
          direction: rtl;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 2px;
        }

        .leaflet-popup-tip-container {
          margin-top: -1px;
        }

        .leaflet-control-zoom {
          border: none !important;
          margin: 15px !important;
        }

        .leaflet-control-zoom a {
          background-color: white !important;
          color: #666 !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }

        .leaflet-control-zoom a:hover {
          background-color: #f8f8f8 !important;
          color: #333 !important;
        }

        .leaflet-control-zoom-in {
          margin-bottom: 5px !important;
        }

        .custom-marker-container {
          background: none;
          border: none;
        }

        .custom-marker {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 41px;
        }

        /* Attribution styles */
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          padding: 4px 8px !important;
          border-radius: 4px !important;
          font-size: 11px !important;
          margin: 5px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }

        .leaflet-control-attribution a {
          color: #d1182b !important;
          text-decoration: none !important;
        }

        .leaflet-control-attribution a:hover {
          text-decoration: underline !important;
        }

        /* Position the attribution in the bottom-right corner */
        .leaflet-bottom.leaflet-right {
          margin-bottom: 5px;
          margin-right: 5px;
        }

        /* Search Control Styles */
        .geosearch {
          position: absolute !important;
          top: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 1000 !important;
          width: 90% !important;
          max-width: 400px !important;
        }

        .geosearch input {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 12px !important;
          font-size: 14px !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.2s !important;
          font-family: Yekan !important;
          direction: rtl !important;
          background-color: white !important;
        }

        .geosearch input:focus {
          outline: none !important;
          border-color: #d1182b !important;
          box-shadow: 0 0 0 3px rgba(209, 24, 43, 0.1) !important;
        }

        .geosearch input::placeholder {
          color: #9ca3af !important;
        }

        .geosearch .results {
          background: white !important;
          border-radius: 12px !important;
          margin-top: 8px !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          max-height: 200px !important;
          overflow-y: auto !important;
          direction: rtl !important;
          border: 1px solid #e5e7eb !important;
        }

        .geosearch .results .result {
          padding: 12px 16px !important;
          border-bottom: 1px solid #e5e7eb !important;
          cursor: pointer !important;
          transition: background-color 0.2s !important;
          font-size: 13px !important;
          color: #374151 !important;
        }

        .geosearch .results .result:last-child {
          border-bottom: none !important;
        }

        .geosearch .results .result:hover {
          background-color: #f3f4f6 !important;
        }

        .geosearch .results .result.active {
          background-color: #fee2e2 !important;
          color: #d1182b !important;
        }

        /* Custom scrollbar for results */
        .geosearch .results::-webkit-scrollbar {
          width: 6px !important;
        }

        .geosearch .results::-webkit-scrollbar-track {
          background: #f1f1f1 !important;
          border-radius: 3px !important;
        }

        .geosearch .results::-webkit-scrollbar-thumb {
          background: #d1d5db !important;
          border-radius: 3px !important;
        }

        .geosearch .results::-webkit-scrollbar-thumb:hover {
          background: #9ca3af !important;
        }

        /* اطمینان از اینکه کنترل‌های نقشه زیر input جستجو نباشند */
        .leaflet-control-container .leaflet-top {
          z-index: 999 !important;
        }
      `}</style>
    </Modal>
  );
}

export default AddAddress;
