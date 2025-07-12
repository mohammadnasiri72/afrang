import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { fetchSettingsData } from "@/redux/slices/settingsSlice";
import { fetchSocialNetworksData } from "@/redux/slices/socialNetworksSlice";
import { getMenuFooter } from "@/services/menu/menuService";
import { mainDomainImg } from "@/utils/mainDomain";
import { FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "./Newsletter";

const FooterSkeleton = () => {
  return (
    <div className="footer sm:pb-0 pb-16">
      <div className="lg:px-16 px-2 pt-10 border-b-8 border-[#d1182b] relative">
        <div className="flex flex-wrap">
          {/* Logo and Contact Section */}
          <div className="lg:w-1/3 sm:w-1/2 w-full p-3 flex flex-col items-center justify-center">
            <div className="w-full flex sm:justify-start justify-center">
              <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-lg" />
            </div>
            <div className="mt-5 w-full flex sm:justify-start justify-center">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-48" />
            </div>
            <div className=" flex justify-center gap-2 items-center mt-3 border-b w-full pb-3 border-[#6666] sm:border-none">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap sm:justify-between justify-around items-center w-full border-b py-5 border-[#6666] sm:border-none">
              {/* Phone Section */}
              <div className="flex items-center sm:flex-row flex-col">
                <div className="bg-white p-3 rounded-full">
                  <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full" />
                </div>
                <div className="flex flex-col justify-center sm:items-start items-center px-2">
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-20 sm:mt-0 mt-2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-32 mt-1" />
                </div>
              </div>
              {/* Email Section */}
              <div className="flex items-center sm:flex-row flex-col">
                <div className="bg-white p-3 rounded-full">
                  <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full" />
                </div>
                <div className="flex flex-col justify-center sm:items-start items-center px-2">
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-20 sm:mt-0 mt-2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-40 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:w-1/3 sm:w-1/2 w-full p-3">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-48 sm:mx-0 mx-auto" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full mt-4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mt-2" />
            <div className="flex items-center justify-between p-2 rounded-[50px] bg-white mt-2">
              <div className="px-3">
                <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full" />
              </div>
              <div className="w-full h-8 bg-gray-200 animate-pulse rounded mx-2" />
              <div className="h-8 bg-gray-200 animate-pulse rounded-[50px] w-24" />
            </div>
            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Working Hours Section */}
          <div className="lg:w-1/6 w-1/2 p-3">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
            <div className="mt-3">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mt-2" />
            </div>
          </div>

          {/* Certificates Section */}
          <div className="lg:w-1/6 w-1/2 p-3">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-24" />
            <div className="flex flex-wrap justify-start items-center gap-2 mt-3">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Menu Section */}
      <div className="sm:px-16 px-2 sm:flex hidden flex-wrap justify-between items-center py-4">
        <div className="xl:w-1/2 w-full">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mx-auto" />
        </div>
        <div className="flex sm:flex-nowrap flex-wrap justify-center items-center xl:w-1/2 w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 animate-pulse rounded w-20 mx-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);
  const { socialNetworks, loading: socialNetworksLoading } = useSelector(
    (state) => state.socialNetworks
  );
  const hasFetchedSocialNetworks = useRef(false);
  const [footerMenu, setFooterMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);

  console.log(socialNetworks);

  useEffect(() => {
    if (!settings || settings.length === 0) {
      dispatch(fetchSettingsData());
    }
    if (
      !socialNetworks ||
      (socialNetworks.length === 0 &&
        !socialNetworksLoading &&
        !hasFetchedSocialNetworks.current)
    ) {
      hasFetchedSocialNetworks.current = true;
      dispatch(fetchSocialNetworksData());
    }
  }, [dispatch, settings, socialNetworks, socialNetworksLoading]);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        setMenuLoading(true);
        const menuData = await getMenuFooter();
        setFooterMenu(menuData);
      } catch (error) {
        console.error("Error fetching footer menu:", error);
      } finally {
        setMenuLoading(false);
      }
    };

    fetchFooterMenu();
  }, []);

  if (loading || socialNetworksLoading || menuLoading) {
    return <FooterSkeleton />;
  }

  return (
    <div className="footer sm:pb-0 pb-16 ">
      <div className="lg:px-16 px-2 pt-10 border-b-8 border-[#d1182b] relative">
        <div className="flex flex-wrap">
          <div className="lg:w-1/3 sm:w-1/2 w-full p-3 flex flex-col items-center justify-center">
            <div className="w-full flex sm:justify-start justify-center">
              {settings?.find(
                (item) => item.propertyKey === "site_home_url"
              ) ? (
                <Link
                  href={
                    settings?.find(
                      (item) => item.propertyKey === "site_home_url"
                    )?.value || "/"
                  }
                >
                  <img
                    className="w-20 "
                    src={
                      mainDomainImg +
                      settings?.find(
                        (item) => item.propertyKey === "site_footer_logo"
                      )?.value
                    }
                    alt=""
                  />
                </Link>
              ) : (
                <img className="w-20" src="/images/logo.png" alt="" />
              )}
            </div>
            <div className="mt-5 w-full flex sm:justify-start justify-center border-b pb-3 border-[#6666] sm:border-none">
              <span className="text-[#d1182b] whitespace-nowrap pl-1">
                آدرس :{" "}
              </span>
              <span>
                {settings?.find((item) => item.propertyKey === "site_address1")
                  ?.value || "آدرس در دسترس نیست"}
              </span>
            </div>
            {/* لینک منو های فوتر در موبایل */}
            <div className="sm:hidden pt-4">
              <h4 className="font-semibold text-lg">لینک ها</h4>
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
                      {settings?.find((item) => item.propertyKey === "site_tel")
                        ?.value || "77615546"}
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
            <h4 className="font-semibold text-[16px] sm:text-start text-center">
              عضویت در خبرنامه <span className="text-[#d1182b]">افرنگ</span>
            </h4>
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
                  key={item.id}
                  href={item.sourceLink || "#"}
                  target="_blank"
                  className="bg-[#434347] p-2 overflow-hidden rounded-lg cursor-pointer duration-300 hover:bg-white hover:!text-[#d1182b] group hover:shadow-lg hover:border-[#0001] border border-transparent"
                >
                  {item.title === "telegram" ? (
                    <FaTelegram className="text-white group-hover:text-teal-500 duration-300 text-xl" />
                  ) : item.title === "instagram" ? (
                    <FaInstagram className="text-white group-hover:text-teal-500 duration-300 text-xl" />
                  ) : item.title === "Linkdin" ? (
                    <FaLinkedin className="text-white group-hover:text-teal-500 duration-300 text-xl" />
                  ) : (
                    <img
                      src={mainDomainImg + item.image}
                      alt={item.title || "social network"}
                      className="w-6 h-6 object-contain "
                    />
                  )}
                </Link>
              ))}
              <i className="fab fa-telegram"></i>

            </div>
          </div>

          <div className="lg:w-1/6 sm:w-1/2 w-full p-3 sm:text-start text-center">
            <h4 className="font-semibold text-[16px]">ساعت کاری</h4>
            <div className="mt-3">
              <p className="text-xs whitespace-nowrap">
                {settings?.find((item) => item.propertyKey === "site_worktime")
                  ?.value ||
                  "شنبه تا چهارشنبه از ساعت 10 الی 18 و پنج شنبه از ساعت 10 الی 16"}
              </p>
            </div>
          </div>
          <div className="lg:w-1/6 sm:w-1/2 w-full p-3 sm:text-start text-center">
            <h4 className="font-semibold text-[16px]">مجوزها</h4>
            <div className="flex sm:justify-start justify-center items-center gap-2 mt-3">
              <div className="py-2 px-5 rounded-lg bg-red-300 cursor-pointer duration-300 hover:bg-[#d1182b]">
                <img src="/images/icons/namad.png" alt="#" />
              </div>
              <div className="py-2 px-5 rounded-lg bg-red-300 cursor-pointer duration-300 hover:bg-[#d1182b]">
                <img src="/images/icons/namad.png" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-16 px-2 flex flex-wrap justify-between items-center text-xs">
        <p className="xl:w-1/2 w-full text-justify py-2">
          {settings?.find((item) => item.propertyKey === "site_copyright")
            ?.value ||
            "© کلیه حقوق این وب سایت محفوظ و متعلق به خانه عکاسان افرنگ می باشد. طراحی سایت و بهینه سازی سایت : ایده پویا"}
        </p>
        <div className="sm:flex hidden sm:flex-nowrap flex-wrap  items-center xl:w-1/2 w-full">
          {footerMenu[0]?.menuItems?.map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.url || "#"}
              className="hover:bg-white hover:text-[#d1182b] px-2 py-2 cursor-pointer duration-300"
            >
              {menuItem.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
