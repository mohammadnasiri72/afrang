"use client";

import { getItemById } from "@/services/Item/item";
import { Box, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Button, Modal } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Yekan !important",
  },
});

function BoxTabDetailsProduct({ product }) {
  const [valTab, setValTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = Cookies.get("user");
  const token = JSON.parse(user).token;

  console.log(modalData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  const fetchDataModal = async () => {
    setLoading(true);
    try {
      const itemsData = await getItemById(31927, token);
      setModalData(itemsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchDataModal();
    }
  }, [isModalOpen]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={valTab}
                onChange={(event, newValue) => {
                  setValTab(newValue);
                }}
                aria-label="basic tabs example"
              >
                <Tab label="اطلاعات صاحب کالا" />
                <Tab label="وضعیت ظاهری" />
                <Tab label="توضیحات تکمیلی" />
                <Tab label="توضیحات مدیر" />
              </Tabs>
            </Box>
            <div>
              {valTab === 0 && (
                <div className="pt-4">
                  <Button type="primary" onClick={showModal}>
                    نمایش اطلاعات تماس
                  </Button>
                  <Modal
                    loading={loading}
                    footer={
                      <div className="flex justify-start gap-2 border-t border-[#3335] pt-3">
                        <Button
                          className="!bg-green-600 duration-300 hover:!bg-green-700 !font-semibold"
                          type="primary"
                          onClick={handleOk}
                        >
                          مورد تایید است
                        </Button>
                        <Button type="primary" onClick={handleCancel}>
                          بستن
                        </Button>
                      </div>
                    }
                    title={
                      <span className="font-semibold text-lg">
                        {modalData?.title}
                      </span>
                    }
                    closable={{ "aria-label": "Custom Close Button" }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div className="overflow-auto max-h-[50vh] p-2">
                      <div
                        className="text-gray-700 leading-relaxed prose prose-sm max-w-none !text-justify"
                        dangerouslySetInnerHTML={renderHTML(modalData.body)}
                      />
                    </div>
                  </Modal>
                </div>
              )}
              {valTab === 1 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed !text-justify">
                    {product.appearance
                      ? product.appearance
                      : "موردی ثبت نشده است"}
                  </p>
                </div>
              )}
              {valTab === 2 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  {product.body ? (
                    <div
                      className="text-gray-700 leading-relaxed prose prose-sm max-w-none !text-justify"
                      dangerouslySetInnerHTML={renderHTML(product.body)}
                    />
                  ) : (
                    "موردی ثبت نشده است"
                  )}
                </div>
              )}
              {valTab === 3 && (
                <div className="mt-3">
                  <Alert
                    message="
   صحت و سقم اطلاعات وارد شده به عهده کاربر می باشد و افرنگ در این مورد هیچ گونه مسئولیتی را نمی پذیرد.
   "
                    type="info"
                    showIcon
                  />
                </div>
              )}
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
}

export default BoxTabDetailsProduct;
