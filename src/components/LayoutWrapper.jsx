// این فایل نیازی به "use client" ندارد چون یک Server Component است
import { getImageUrl } from "@/utils/mainDomain";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { forwardRef, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import HeaderNavbarWrapper from "./HeaderNavbarWrapper";
import SocialNetworks from "./SocialNetworks";
import SubFooter from "./SubFooter";
import SubHeader from "./SubHeader";
import BoxImgBranding from "./home/BoxImgBranding";
import SupportBox from "./home/SupportBox";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LayoutWrapper({
  children,
  showHeaderFooter = true,
  showPro = true,
  showCart = true,
  isShowPopups = true,
  menuItems,
  brandItems,
  itemsSupport,
  socialNetworks,
  footerMenu,
  popupsData,
}) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }

  const popupsList = useSelector((state) => state.popups.popupsList);
  const [openModal, setOpenModal] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(true);
    }, 3000);
  }, [pathname]);

  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  useEffect(() => {
    if (popupsList.length > 0) {
      setDataPopup(popupsList.find((e) => e.category === "popup_site"));
    }
  }, [popupsList]);

  const handleClose = () => {
    setOpenModal(false);
    localStorage.setItem("showPopups", true);
  };

  const LoadingSkeletonBrand = () => {
    return (
      <div className="sm:px-16 px-2 bg-[#f6f6f6] relative z-50">
        <div className="absolute left-0 -top-52">
          <img src="/images/gallery/bg-shadow-1.png" />
        </div>
        <div className="absolute right-0 top-0">
          <img src="/images/gallery/bg-shadow-2.png" />
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
    <>
      <div className={showPro ? "" : "pb-16 sm:pb-0"}>
        <div className={showCart ? "" : "pb-28 sm:pb-0"}>
           <SubHeader popupsList={popupsData} />
          <HeaderNavbarWrapper menuItems={menuItems} />
          <SocialNetworks />
          {children}
          <Suspense fallback={<LoadingSkeletonBrand />}>
            <BoxImgBranding brands={brandItems} />
          </Suspense>
          <div className="h-10"></div>
          <Suspense fallback={<LoadingSkeletonSupport />}>
            <SupportBox items={itemsSupport} />
          </Suspense>
          <Suspense fallback={<FooterSkeleton />}>
            <Footer socialNetworks={socialNetworks} footerMenu={footerMenu} />
          </Suspense>
          <SubFooter />
        </div>
      </div>
      {(dataPopup?.showInPage === "all" ||
        (dataPopup?.showInPage === "main" && pathname === "/")) &&
        (dataPopup?.showNumber === "all" || isShowPopups !== "true") && (
          <Dialog
            fullWidth={500}
            slots={{
              transition: Transition,
            }}
            keepMounted
            sx={{
              zIndex: 15000,
              "& .MuiPaper-root": {
                backgroundColor: dataPopup?.backgroundColor,
                color: dataPopup?.color,
              },
            }}
            open={openModal}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="توضیحات popup"
          >
            <DialogContent>
              {!dataPopup?.image && (
                <div
                  sx={{
                    color: dataPopup?.color,
                  }}
                >
                  <div
                    className="sm:block hidden "
                    dangerouslySetInnerHTML={renderHTML(dataPopup?.desktopBody)}
                  />
                  <div
                    className="sm:hidden block  "
                    dangerouslySetInnerHTML={renderHTML(dataPopup?.mobileBody)}
                  />
                </div>
              )}
              {dataPopup?.image && (
                <div className="flex justify-center items-center">
                  <img
                    className="w-full"
                    src={getImageUrl(dataPopup?.image)}
                    alt={dataPopup?.title}
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions sx={{ borderTop: "1px solid #0002" }}>
              <Button type="primary" onClick={handleClose}>
                بستن
              </Button>
            </DialogActions>
          </Dialog>
        )}
    </>
  );
}
