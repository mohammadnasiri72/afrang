"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Newsletter from "./Newsletter";

const Footer = ({ socialNetworks, footerMenu, settings }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const coordinates = settings?.find(
    (item) => item.propertyKey === "site_geo_location"
  )?.value;

  const [lat, lng] = coordinates?.split(",").map((coord) => coord.trim()) || [
    "35.6892",
    "51.3890",
  ]; // Default to Tehran coordinates if not available

  // const handleNavigation = () => {
  //   // استفاده از geo URI استاندارد - مثل واتساپ
  //   const geoUrl = `geo:${lat},${lng}?q=${lat},${lng}`;

  //   // فال‌بک به گوگل مپس
  //   const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  //   // ابتدا geo URI را امتحان می‌کنیم (باز کردن انتخاب‌گر اپ‌ها)
  //   window.location.href = geoUrl;

  //   // اگر بعد از 1 ثانیه صفحه رفرش نشد (یعنی geo کار نکرد)
  //   setTimeout(() => {
  //     window.open(mapsUrl, "_blank");
  //   }, 1000);
  // };

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
      <div className="footer sm:pb-0 pb-16">
        <div className="lg:px-16 px-2 pt-10  relative max-w-[1600px] mx-auto overflow-hidden">
          <div className="flex flex-wrap">
            <div className="lg:w-1/3 sm:w-1/2 w-full px-3 flex flex-col items-center justify-start">
              <div className="w-full flex sm:justify-start justify-center ">
                {settings?.find(
                  (item) => item.propertyKey === "site_home_url"
                ) && (
                  <Link
                    aria-label="صفحه اصلی"
                    href={
                      settings?.find(
                        (item) => item.propertyKey === "site_home_url"
                      )?.value || "/"
                    }
                    className="relative overflow-hidden !w-12 !h-12"
                  >
                    <Image
                      className={`object-contain ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      src={
                        mainDomainImg +
                        settings?.find(
                          (item) => item.propertyKey === "site_footer_logo"
                        )?.value
                      }
                      alt={
                        settings?.find(
                          (item) => item.propertyKey === "site_title"
                        )?.propertyValue
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                      priority={false}
                      onLoad={() => {
                        setIsLoaded(true);
                      }}
                      loading={"lazy"}
                      placeholder={"blur"}
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                    />
                    <div
                      className={`absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center ${
                        isLoaded ? "!hidden" : ""
                      }`}
                    >
                      <Skeleton.Image active className={`!w-5 !h-5`} />
                    </div>
                  </Link>
                )}
                <div className="">
                  <div className="w-full px-3 mt-3 text-justify flex sm:justify-start justify-center border-b pb-3 border-[#6666] sm:border-none">
                    <span>
                      <span className="text-[#d1182b] whitespace-nowrap pl-1">
                        آدرس:
                      </span>
                      {settings?.find(
                        (item) => item.propertyKey === "site_address1"
                      )?.value ?? (
                        <span className="inline-block w-[200px] h-[1em] bg-gray-200 animate-pulse align-middle rounded" />
                      )}
                      {lat && lng && (
                        <div className="flex">
                          <Link
                            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation();
                            }}
                            className="bg-[#d1182b] !text-white cursor-pointer py-0 px-2 rounded-xl duration-300 font-semibold lg:hidden flex  items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                          >
                            <IoLocationSharp />
                            <span>مسیریابی</span>
                          </Link>

                          <Link
                            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:flex hidden bg-[#d1182b] !text-white cursor-pointer py-0 px-2 rounded-xl duration-300 font-semibold items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                          >
                            <IoLocationSharp />
                            <span>مسیریابی</span>
                          </Link>
                        </div>
                      )}
                    </span>
                  </div>

                  <div className="w-full px-3 text-justify flex sm:justify-start justify-center border-b pb-3 border-[#6666] sm:border-none">
                    <span>
                      <span className="text-[#d1182b] whitespace-nowrap pl-1">
                        ساعت کاری :{" "}
                      </span>
                      {settings?.find(
                        (item) => item.propertyKey === "site_worktime"
                      )?.value ? (
                        settings?.find(
                          (item) => item.propertyKey === "site_worktime"
                        )?.value
                      ) : (
                        <span className="inline-block w-[250px] h-[1em] bg-gray-200 animate-pulse rounded" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {/* لینک منو های فوتر در موبایل */}
              <div className="sm:hidden pt-4">
                <span className="font-semibold text-lg">لینک ها</span>
                <ul className="flex sm:hidden flex-wrap items-start w-full px-2">
                  {footerMenu[0]?.menuItems?.map((menuItem) => (
                    <li key={menuItem.id} className="w-full list-none p-1">
                      <Link
                        href={menuItem.url || "#"}
                        className="block w-full bg-white/90 rounded-xl shadow-sm border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-[#d1182b] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:ring-offset-2"
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className=" flex justify-center">
                  <Link
                    target="_blank"
                    href={
                      "https://trustseal.enamad.ir/?id=308830&Code=9d6pzy1Mr4leQbMigsJs"
                    }
                  >
                    <img src="/public/images/enamad.jpeg" alt="enamad" />
                  </Link>
                </div>
              </div>
              <div className="sm:hidden flex justify-center gap-2 items-center mt-3 border-b w-full pb-3 border-[#6666] sm:border-none">
                {/* Social networks section */}
              </div>
              <div className="flex flex-wrap sm:justify-between justify-around items-center w-full border-b py-5 border-[#6666] sm:border-none">
                <div className="flex items-center sm:flex-row flex-col">
                  <div className="bg-white p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M17.7138 16.4214C17.7138 16.7141 17.6488 17.015 17.5106 17.3077C17.3723 17.6004 17.1934 17.8768 16.9577 18.137C16.5592 18.5761 16.1202 18.8932 15.6242 19.0965C15.1363 19.2998 14.6078 19.4055 14.0386 19.4055C13.2093 19.4055 12.323 19.2103 11.3879 18.8119C10.4529 18.4135 9.51783 17.8768 8.5909 17.202C7.65584 16.519 6.76957 15.7628 5.92395 14.9253C5.08646 14.0797 4.33028 13.1934 3.65541 12.2665C2.98868 11.3396 2.45203 10.4126 2.06175 9.49383C1.67146 8.5669 1.47632 7.68063 1.47632 6.83501C1.47632 6.2821 1.57389 5.75359 1.76903 5.26573C1.96418 4.76975 2.27315 4.31441 2.70409 3.90786C3.22447 3.39561 3.79364 3.14355 4.39533 3.14355C4.623 3.14355 4.85066 3.19234 5.05394 3.28991C5.26534 3.38748 5.45235 3.53384 5.59871 3.74525L7.48509 6.40407C7.63145 6.60734 7.73715 6.79435 7.81033 6.97323C7.88351 7.14398 7.92416 7.31473 7.92416 7.46922C7.92416 7.66436 7.86725 7.85951 7.75341 8.04652C7.64771 8.23353 7.49322 8.42867 7.29808 8.62382L6.68013 9.26616C6.59069 9.3556 6.55003 9.46131 6.55003 9.5914C6.55003 9.65645 6.55816 9.71336 6.57443 9.77841C6.59882 9.84346 6.62321 9.89225 6.63947 9.94103C6.78583 10.2094 7.03789 10.559 7.39565 10.9818C7.76154 11.4046 8.15183 11.8355 8.57464 12.2665C9.01371 12.6974 9.43652 13.0958 9.86746 13.4617C10.2903 13.8195 10.6399 14.0634 10.9164 14.2098C10.957 14.226 11.0058 14.2504 11.0627 14.2748C11.1278 14.2992 11.1928 14.3074 11.266 14.3074C11.4042 14.3074 11.5099 14.2586 11.5994 14.1691L12.2173 13.5593C12.4206 13.356 12.6157 13.2015 12.8027 13.104C12.9897 12.9901 13.1768 12.9332 13.38 12.9332C13.5345 12.9332 13.6971 12.9657 13.876 13.0389C14.0549 13.1121 14.2419 13.2178 14.4452 13.356L17.1365 15.2668C17.3479 15.4132 17.4943 15.5839 17.5837 15.7872C17.665 15.9905 17.7138 16.1937 17.7138 16.4214Z"
                        stroke="#D1182B"
                        strokeWidth="1.17086"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M14.8922 8.83509C14.8922 8.34723 14.5101 7.59919 13.9409 6.98936C13.4205 6.42833 12.7294 5.98926 12.0464 5.98926"
                        stroke="#D1182B"
                        strokeWidth="1.17086"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.7381 8.83522C17.7381 5.68854 15.1931 3.14355 12.0464 3.14355"
                        stroke="#D1182B"
                        strokeWidth="1.17086"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center sm:items-start items-center px-2">
                    <span className="text-[#666] text-xs sm:mt-0 mt-2">
                      آیا سوالی دارید
                    </span>

                    <span className="text-[#d1182b] text-sm font-semibold">
                      <a
                        href={`tel:${
                          settings?.find(
                            (item) => item.propertyKey === "site_tel"
                          )?.value || "02177615546"
                        }`}
                      >
                        {settings?.find(
                          (item) => item.propertyKey === "site_tel"
                        )?.value || "77615546"}
                      </a>
                    </span>
                  </div>
                </div>
                <div className="flex items-center sm:flex-row flex-col">
                  <div className="bg-white p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M14.4655 17.2103H6.33452C3.89523 17.2103 2.26904 15.9907 2.26904 13.1448V7.45317C2.26904 4.60734 3.89523 3.3877 6.33452 3.3877H14.4655C16.9048 3.3877 18.5309 4.60734 18.5309 7.45317V13.1448C18.5309 15.9907 16.9048 17.2103 14.4655 17.2103Z"
                        stroke="#D1182B"
                        strokeWidth="1.17086"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.4654 7.85986L11.9204 9.8926C11.0829 10.5593 9.70881 10.5593 8.87133 9.8926L6.33447 7.85986"
                        stroke="#D1182B"
                        strokeWidth="1.17086"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center sm:items-start items-center px-2">
                    <span className="text-[#666] text-xs sm:mt-0 mt-2">
                      ارتباط باما
                    </span>

                    <span className="text-[#d1182b] text-sm font-semibold">
                      <a
                        href={`mailto:${
                          settings?.find(
                            (item) => item.propertyKey === "site_email"
                          )?.value || "unreal@outlook.com"
                        }`}
                      >
                        {settings?.find(
                          (item) => item.propertyKey === "site_email"
                        )?.value || "unreal@outlook.com"}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 w-full p-3">
              <div className="font-semibold text-[16px] sm:text-start text-center">
                عضویت در خبرنامه <span className="text-[#d1182b]">افرنگ</span>
              </div>

              <p className="text-[#666] mt-4 sm:text-start text-center">
                {settings?.find(
                  (item) => item.propertyKey === "site_footer_description"
                )?.value ||
                  "و از تخفیف در خرید، مشاهده سوابق سفارشات، شرکت در نقد و بررسی و بسیاری از خدمات دیگر بهره مند شوید."}
              </p>

              <Newsletter />
              <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                {socialNetworks?.map((item) => (
                  <Link
                    aria-label={item.title}
                    key={item.id}
                    href={item.sourceLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-6 h-6 items-center justify-center overflow-hidden cursor-pointer duration-300 group"
                  >
                    {item.image ? (
                      <img
                        src={mainDomainImg + item.image}
                        alt={item.title || "social network"}
                        className="object-contain "
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 w-full p-3 sm:text-start text-center">
              <div className="sm:flex hidden flex-wrap  items-center w-full justify-end">
                <div className="flex ">
                  <ul className="flex flex-wrap items-start w-full px-2">
                    {footerMenu[0]?.menuItems?.map((menuItem) => (
                      <li key={menuItem.id} className="list-none p-1">
                        <Link
                          href={menuItem.url || "#"}
                          className="block bg-white/90 rounded-xl shadow-sm border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-[#d1182b] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:ring-offset-2"
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                   target="_blank"
                    href={
                      "https://trustseal.enamad.ir/?id=308830&Code=9d6pzy1Mr4leQbMigsJs"
                    }
                  >
                    <img src="/public/images/enamad.jpeg" alt="enamad" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:px-16 px-2 flex flex-wrap justify-between items-center text-xs border-t-8 border-[#d1182b]">
          <p className="xl:w-1/2 w-full text-justify py-2">
            {settings?.find((item) => item.propertyKey === "site_copyright")
              ?.value ? (
              <span>
                <span>
                  {
                    settings?.find(
                      (item) => item.propertyKey === "site_copyright"
                    )?.value
                  }
                </span>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://activeidea.net/"
                  className=" px-1 font-semibold"
                >
                  طراحی سایت و بهینه سازی سایت : ایده پویا
                </Link>
              </span>
            ) : (
              <span>
                © کلیه حقوق این وب سایت محفوظ و متعلق به خانه عکاسان افرنگ می
                باشد. طراحی سایت و بهینه سازی سایت : ایده پویا
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
