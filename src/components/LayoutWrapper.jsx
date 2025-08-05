// این فایل نیازی به "use client" ندارد چون یک Server Component است
import { setPopupsList } from "@/redux/slices/popupsSlice";
import { getPopUpsData } from "@/services/popups/popups";
import { getImageUrl } from "@/utils/mainDomain";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import { Button } from "antd";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Footer from "./Footer";
import HeaderNavbarWrapper from "./HeaderNavbarWrapper";
import SocialNetworks from "./SocialNetworks";
import SubFooter from "./SubFooter";
import SubHeader from "./SubHeader";
import BoxImgBranding from "./home/BoxImgBranding";
import SupportBox from "./home/SupportBox";
import { usePathname } from "next/navigation";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LayoutWrapper({
  children,
  showHeaderFooter = true,
  showPro = true,
  showCart = true,
}) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }

  const popupsList = useSelector((state) => state.popups.popupsList);
  const disPatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const pathname = usePathname();

  const isShowPopups = localStorage.getItem("showPopups");

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

  // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const fetchPopups = async () => {
    try {
      const popupsData = await getPopUpsData();
      if (popupsData?.type === "error") {
        Toast.fire({
          icon: "error",
          title: popupsData.message,
        });
        return;
      }
      disPatch(setPopupsList(popupsData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleClose = () => {
    setOpenModal(false);
    localStorage.setItem("showPopups", true);
  };


  return (
    <>
      <div className={showPro ? "" : "pb-16 sm:pb-0"}>
        <div className={showCart ? "" : "pb-28 sm:pb-0"}>
          <SubHeader />
          <HeaderNavbarWrapper />
          <SocialNetworks />
          {children}
          <BoxImgBranding />
          <div className="h-10"></div>
          <SupportBox />
          <Footer />
          <SubFooter />
        </div>
      </div>
      {(dataPopup.showInPage === "all" ||
        (dataPopup.showInPage === "main" && pathname === "/")) &&
        (dataPopup.showNumber === "all" || isShowPopups !== "true") && (
          <Dialog
            fullWidth={500}
            slots={{
              transition: Transition,
            }}
            keepMounted
            sx={{
              zIndex: 1500,
              "& .MuiPaper-root": {
                backgroundColor: dataPopup.backgroundColor,
                color: dataPopup.color,
              },
            }}
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="توضیحات popup"
          >
            <DialogContent>
              {!dataPopup.image && (
                <div
                  sx={{
                    color: dataPopup.color,
                  }}
                >
                  <div
                    className="sm:block hidden "
                    dangerouslySetInnerHTML={renderHTML(dataPopup.desktopBody)}
                  />
                  <div
                    className="sm:hidden block  "
                    dangerouslySetInnerHTML={renderHTML(dataPopup.mobileBody)}
                  />
                </div>
              )}
              {dataPopup.image && (
                <div className="flex justify-center items-center">
                  <img
                    className="w-full"
                    src={getImageUrl(dataPopup.image)}
                    alt={dataPopup.title}
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
