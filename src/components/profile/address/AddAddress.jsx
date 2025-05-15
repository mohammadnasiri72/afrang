"use client";
import {
  addAddress,
  getAddressId,
  getCity,
  getProvince,
} from "@/services/order/orderService";
import { Button, Modal, Select, Spin, Switch, Tooltip } from "antd";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePhoneAndroid, MdLocationOn } from "react-icons/md";
import Swal from "sweetalert2";
import dynamic from 'next/dynamic';
import L from 'leaflet';

// Dynamic import for Map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const useMapEvent = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMapEvent),
  { ssr: false }
);

// Create a separate Map component
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-50">
      <Spin size="large" />
    </div>
  ),
});

function AddAddress({ getAddressFu, id, isOpen, onClose }) {
  const mapRef = useRef();
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
  const [position, setPosition] = useState({ lat: 35.6892, lng: 51.3890 }); // تهران
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
    if (typeof window !== 'undefined') {
      const iconUrl = '/images/marker-icon.png';
      const iconRetinaUrl = '/images/marker-icon-2x.png';
      const shadowUrl = '/images/marker-shadow.png';

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "نام الزامی است";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "شماره موبایل الزامی است";
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

  const updatePosition = (newPosition) => {
    console.log('Updating position:', newPosition);
    if (newPosition && typeof newPosition.lat === 'number' && typeof newPosition.lng === 'number') {
      setPosition(newPosition);
    } else {
      console.warn('Invalid position:', newPosition);
    }
  };

  // Add map click handler when map is created
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e) => {
      console.log('Map clicked:', e.latlng);
      updatePosition(e.latlng);
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map]);

  // Map marker component
  const LocationMarker = () => {
    const markerIcon = new L.Icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
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
            console.log('Marker dragged to:', newPos);
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
      provinceTitle: provinceList.find(
        (ev) => ev.provinceId === selectedProvince
      ).title,
      cityId: selectedCity,
      cityTitle: cityList.find((ev) => ev.id === selectedCity).title,
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
    setErrors({});
    setFullName("");
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

  // Add geolocation
  useEffect(() => {
    if (useMapToggle && typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.warn('Error getting location:', error);
          // Fallback to Tehran coordinates
          setPosition({ lat: 35.6892, lng: 51.3890 });
        }
      );
    }
  }, [useMapToggle]);

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
            <FaTimes className="text-gray-400 hover:text-gray-600" />
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
              if (checked) {
                // Get user location when map is enabled
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ lat: latitude, lng: longitude });
                  },
                  (error) => {
                    console.warn('Error getting location:', error);
                    setPosition({ lat: 35.6892, lng: 51.3890 });
                  }
                );
              }
            }}
            className={useMapToggle ? "bg-[#d1182b]" : ""}
          />
          <span className="text-gray-700 flex items-center gap-1">
            <MdLocationOn />
            انتخاب موقعیت از روی نقشه
          </span>
          {useMapToggle && (
            <Tooltip title="برای تغییر موقعیت روی نقشه کلیک کنید یا مارکر را بکشید">
              <FaMapMarkerAlt className="text-gray-400 cursor-help" />
            </Tooltip>
          )}
        </div>

        {/* Map Component */}
        {useMapToggle && (
          <div className="h-[300px] rounded-lg overflow-hidden border border-gray-300 relative">
            <MapComponent
              position={position}
              onPositionChange={updatePosition}
            />
          </div>
        )}

        {/* Row 1: نام و نام خانوادگی، استان، شهر */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">نام و نام خانوادگی*</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="نام و نام خانوادگی"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">استان*</label>
            <Select
              placeholder="انتخاب استان"
              className={`w-full ${errors.selectedProvince ? "select-error" : ""}`}
              onChange={handleProvinceChange}
              value={selectedProvince}
              size="large"
              suffixIcon={<FaCaretDown className="text-[#d1182b]" />}
              popupClassName="custom-select-dropdown"
            >
              {provinceList.map((province) => (
                <Select.Option key={province.provinceId} value={province.provinceId}>
                  {province.title}
                </Select.Option>
              ))}
            </Select>
            {errors.selectedProvince && (
              <p className="text-red-500 text-sm mt-1">{errors.selectedProvince}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">شهر*</label>
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
              popupClassName="custom-select-dropdown"
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">شماره موبایل*</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setErrors((prev) => ({ ...prev, mobile: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="شماره موبایل"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">کد ملی*</label>
            <input
              type="text"
              value={nationalCode}
              onChange={(e) => {
                setNationalCode(e.target.value);
                setErrors((prev) => ({ ...prev, nationalCode: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.nationalCode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="کد ملی"
            />
            {errors.nationalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.nationalCode}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">کد پستی*</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                setErrors((prev) => ({ ...prev, postalCode: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="کد پستی"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        {/* آدرس */}
        <div>
          <label className="block text-gray-700 mb-2">آدرس*</label>
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
            className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${
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
            className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${
              loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <Spin className="white-spin" size="small" />
                <span>{id ? "در حال ویرایش" : "در حال ثبت"}</span>
              </div>
            ) : (
              id ? "ویرایش" : "ثبت"
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
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 1;
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
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
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
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
      `}</style>
    </Modal>
  );
}

export default AddAddress; 