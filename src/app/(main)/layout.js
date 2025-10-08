import BoxImgBrandingSSR from "@/components/BoxImgBrandingSSR";
import FooterSSR from "@/components/FooterSSR";
import HeaderNavbarWrapperSSR from "@/components/HeaderNavbarWrapperSSR";
import SocialNetworks from "@/components/SocialNetworks";
import SubHeaderSSR from "@/components/SubHeaderSSR";
import SupportBoxSSR from "@/components/SupportBoxSSR";
import { getSettings } from "@/services/settings/settingsService";
import { mainUrl } from "@/utils/mainDomain";
import { Suspense } from "react";

export const metadata = {
  title: {
    default: "خانه عکاسان افرنگ",
    template: " افرنگ | %s ",
  },
  description: "خانه عکاسان افرنگ",
  alternates: {
    canonical: mainUrl,
  },
};
export default async function layoutMain({ children }) {
  const settings = await getSettings();

  const HeaderNavbarSkeleton = () => {
    return (
      <div className="bg-white w-full">
        {/* Header Skeleton */}
        <div
          style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
          className="flex items-center justify-between lg:px-16 px-4 py-1"
        >
          <div className="flex items-center lg:w-1/2 w-auto">
            <div className="flex items-center lg:w-2/5 w-auto">
              {/* Logo */}
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg" />
              {/* Logo Text */}
              <div className="flex-col px-1 lg:flex hidden">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20" />
              </div>
            </div>
            {/* Search Bar */}
            <div className="px-2 lg:flex hidden items-center justify-start rounded-lg bg-slate-200 lg:w-3/5 w-4/5">
              <div className="w-5 h-5 bg-gray-300 animate-pulse rounded-full mx-1" />
              <div className="h-6 bg-gray-300 animate-pulse rounded w-full" />
            </div>
          </div>
          {/* Right Section - Contact, User, Cart */}
          <div className="flex items-center justify-end lg:w-1/2 w-auto gap-4">
            {/* Contact Info */}
            <div className="lg:flex hidden items-center">
              <div className="bg-slate-200 rounded-lg p-1">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
              </div>
              <div className="flex flex-col pr-1 gap-1">
                <div className="h-2 bg-gray-200 animate-pulse rounded w-16" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
              </div>
            </div>
            {/* User Section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-8" />
              </div>
              <div className="border-r border-[#0005] pr-2">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-10" />
              </div>
            </div>
            {/* Cart Icon */}
            <div className="relative mt-1">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* NavBar Skeleton */}
        <div className="bg-[#d1182b] w-full">
          <div
            style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
            className="px-2 flex justify-between items-center !text-white py-2"
          >
            {/* Menu Items */}
            <div className="flex-1">
              <div className="flex justify-center w-full overflow-x-auto lg:overflow-visible">
                <div className="flex items-center">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`hover:bg-[#0002] duration-300 px-2 relative group hidden lg:flex items-center ${
                        i === 5 ? "" : "border-l border-[#fff8]"
                      }`}
                    >
                      <div className="h-4 bg-gray-300 animate-pulse rounded w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="p-3 lg:hidden flex justify-between items-center w-full">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 animate-pulse rounded" />
              </div>
            </div>
            {/* Search Navbar */}
            <div className="lg:flex hidden items-center">
              <div className="bg-white/20 rounded-lg p-1">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoadingSkeletonBrand = () => {
    return (
      <div className="sm:px-16 px-2 bg-[#f6f6f6] relative z-50">
        <div className="absolute left-0 -top-52">
          <img src="/images/bg-shadow-1.png" />
        </div>
        <div className="absolute right-0 top-0">
          <img src="/images/bg-shadow-2.png" />
        </div>
        <div className="flex gap-2 overflow-hidden justify-between items-center">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-36 h-36 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  };

  const LoadingSkeletonSupport = () => {
    return (
      <div className="sm:px-16 px-2 bg-[#f6f6f6]">
        <div className="bg-[#18d1be] p-3 rounded-lg">
          <div className="flex gap-2 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-5 flex sm:flex-row flex-col justify-center gap-2 items-center flex-1 min-w-[200px]"
              >
                <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <div>
      <SubHeaderSSR />
      <Suspense fallback={<HeaderNavbarSkeleton />}>
        <HeaderNavbarWrapperSSR settings={settings} />
      </Suspense>
      <SocialNetworks />
      {children}
      <Suspense fallback={<LoadingSkeletonBrand />}>
        <BoxImgBrandingSSR />
      </Suspense>
      <div className="h-10"></div>
      <Suspense fallback={<LoadingSkeletonSupport />}>
        <SupportBoxSSR />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterSSR settings={settings} />
      </Suspense>
    </div>
  );
}
