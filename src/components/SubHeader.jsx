"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubHeader({ popupsList }) {
  const [openModal, setOpenModal] = useState(true);
  const [dataPopup, setDataPopup] = useState({});
  const pathname = usePathname();

  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(true);
    }, 3000);
  }, [pathname]);

  const handleClose = () => {
    setOpenModal(false);
    localStorage.setItem("showPopups", true);
  };

  useEffect(() => {
    if (
      popupsList.length > 0 &&
      popupsList?.find((e) => e.category === "popup_site")
    ) {
      setDataPopup(popupsList?.find((e) => e.category === "popup_site"));
    }
  }, [popupsList]);

  return (
    <>
      {
        <>
          {popupsList?.find((e) => e.category === "popup_header") && (
            <>
              {popupsList.length > 0 ? (
                <div className="h-10  !overflow-hidden">
                  <div className="hidden">
                    <h4>
                      {
                        popupsList?.find((e) => e.category === "popup_header")
                          ?.title
                      }
                    </h4>
                    <div
                      style={{
                        color: popupsList?.find(
                          (e) => e.category === "popup_header"
                        )?.color,
                      }}
                      className="sm:block hidden"
                      dangerouslySetInnerHTML={renderHTML(
                        popupsList?.find((e) => e.category === "popup_header")
                          ?.desktopBody
                      )}
                    />
                    <div
                      style={{
                        color: popupsList?.find(
                          (e) => e.category === "popup_header"
                        )?.color,
                      }}
                      className="sm:hidden block"
                      dangerouslySetInnerHTML={renderHTML(
                        popupsList?.find((e) => e.category === "popup_header")
                          .mobileBody
                      )}
                    />
                  </div>
                  {(popupsList?.find((e) => e.category === "popup_header")
                    ?.showInPage === "all" ||
                    (popupsList?.find((e) => e.category === "popup_header")
                      ?.showInPage === "main" &&
                      pathname === "/")) && (
                    <div className="z-[1200] relative !overflow-hidden">
                      {popupsList?.find((e) => e.category === "popup_header")
                        ?.id && (
                        <div
                          className={`marquee flex items-center py-3 w-full !overflow-hidden h-10 !text-white text-sm`}
                          style={{
                            direction: "ltr",
                            backgroundColor: popupsList?.find(
                              (e) => e.category === "popup_header"
                            ).backgroundColor,
                          }}
                        >
                          <Marquee
                            speed={50}
                            gradient={false}
                            direction="right"
                            className="!overflow-hidden"
                          >
                            <div
                              style={{
                                color: popupsList?.find(
                                  (e) => e.category === "popup_header"
                                ).color,
                              }}
                              className="sm:block hidden mt-2"
                              dangerouslySetInnerHTML={renderHTML(
                                popupsList?.find(
                                  (e) => e.category === "popup_header"
                                )?.desktopBody
                              )}
                            />
                            <div
                              style={{
                                color: popupsList?.find(
                                  (e) => e.category === "popup_header"
                                ).color,
                              }}
                              className="sm:hidden block mt-2"
                              dangerouslySetInnerHTML={renderHTML(
                                popupsList?.find(
                                  (e) => e.category === "popup_header"
                                )?.mobileBody
                              )}
                            />
                          </Marquee>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-10 bg-slate-400"></div>
              )}
            </>
          )}

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
                        dangerouslySetInnerHTML={renderHTML(
                          dataPopup?.desktopBody
                        )}
                      />
                      <div
                        className="sm:hidden block  "
                        dangerouslySetInnerHTML={renderHTML(
                          dataPopup?.mobileBody
                        )}
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
      }
    </>
  );
}
