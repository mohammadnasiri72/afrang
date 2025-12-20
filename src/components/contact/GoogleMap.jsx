"use client";

import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

function GoogleMap() {
  const { settings } = useSelector((state) => state.settings);
  const siteAddress = settings?.find(item => item.propertyKey === "site_address1")?.value;
  const map = settings?.find(item => item.propertyKey === "site_map_script")?.value;
 const coordinates = settings?.find(
    (item) => item.propertyKey === "site_geo_location"
  )?.value;

  const [lat, lng] = coordinates?.split(",").map((coord) => coord.trim()) || ["35.6892", "51.3890"]; // Default to Tehran coordinates if not available

 const handleNavigation = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    // تشخیص دستگاه
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      // برای iOS از maps خاص استفاده می‌کنیم
      const iosMapsUrl = `maps://maps.google.com/maps?daddr=${lat},${lng}`;
      window.location.href = iosMapsUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else if (isAndroid) {
      // برای اندروید از geo URI استفاده می‌کنیم
      const geoUrl = `geo:${lat},${lng}?q=${lat},${lng}`;
      window.location.href = geoUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else {
      // برای سایر دستگاه‌ها مستقیماً به گوگل مپس
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <>
      <div className="w-full -mt-14">
        <div className="!mb-[30px]">
          <div className="google-map">
            <div dangerouslySetInnerHTML={{ __html: map }} />
          </div>

          <div className="max-w-[600px] py-[25px] px-[20px] flex rounded-[7px] bg-[#ffffffeb] m-auto relative z-10 sm:mt-[-40px] items-center text-[13px] text-[#210600]">
            <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center h-[40px] justify-center rounded-[4px] ml-[15px]">
              <GrLocation />
            </div>
            <div>
              <div className="flex justify-between w-full items-center">
              <span className="text-[#747475]">آدرس ما</span>
 <div className="flex">
                        <Link
                          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation();
                          }}
                          className="bg-[#18d1be] !text-white cursor-pointer py-0 px-2 rounded-xl duration-300 font-semibold lg:hidden flex  items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                        >
                          <IoLocationSharp />
                          <span>مسیریابی</span>
                        </Link>

                        <Link
                          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lg:flex hidden bg-[#18d1be] !text-white cursor-pointer py-0 px-2 rounded-xl duration-300 font-semibold items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                        >
                          <IoLocationSharp />
                          <span>مسیریابی</span>
                        </Link>
                      </div>
              </div>
              <p className="!mb-0 font-[600] mt-2!">
                {siteAddress || "میدان ونک، تهران"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoogleMap;
