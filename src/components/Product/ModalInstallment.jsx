import { getCsrf } from "@/services/csrf/csrf";
import { getInstallments } from "@/services/Installments/Installments";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { Button as AntButton, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import {
  FaCalculator,
  FaInfoCircle,
  FaLink,
  FaMoneyBillWave,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

const { Option } = Select;

function ModalInstallment({ openModal, setOpenModal, product }) {
  const [loading, setLoading] = useState(false);
  const [installmentsData, setInstallmentsData] = useState({});
  const [selectedMonths, setSelectedMonths] = useState(10);
  const [prepaymentType, setPrepaymentType] = useState("suggested");
  const [customPrepayment, setCustomPrepayment] = useState("");
  const [flag, setFlag] = useState(false);
   const { settings } = useSelector((state) => state.settings);

  const siteMobile = settings?.find(
    (item) => item.propertyKey === "site_social_tel"
  )?.value;

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  useEffect(() => {
    if (prepaymentType === "suggested" && flag) {
      handleAmountes();
    }
  }, [prepaymentType]);

  const prepaymentSelect = (
    <Select
      value={prepaymentType}
      onChange={(e) => {
        setPrepaymentType(e);
        setCustomPrepayment("");
      }}
      style={{ width: 100 }}
    >
      <Option value="suggested">پیشنهادی</Option>
      <Option value="custom">انتخابی</Option>
    </Select>
  );

  const handleAmountes = async () => {
    setLoading(true);
    const data = {
      total: product.product.finalPrice,
      number: selectedMonths,
      prePayment: !customPrepayment
        ? 0
        : Number(customPrepayment.replace(/,/g, "")),
    };
    try {
      const csrf = await getCsrf();
      const response = await getInstallments(data, csrf);
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          text: response.message,
        });
        return;
      }
      setInstallmentsData(response);
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      handleAmountes();
      setFlag(true)
    }
  }, [openModal, selectedMonths]);

  const handleMonthsChange = (value) => {
    setSelectedMonths(value);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          fontFamily: '"Yekan", "Vazir", sans-serif',
          direction: "rtl",
          p: 0,
          m: 1,
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fafafa",
          fontFamily: "inherit",
          px: 3,
          py: 2,
          m: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaWallet style={{ color: "#1976d2" }} />
          <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
            خرید اقساطی
          </Typography>
        </Box>
        <Button onClick={handleClose} sx={{ minWidth: "auto", padding: "4px" }}>
          <FaTimes className="text-2xl" />
        </Button>
      </DialogTitle>

      {loading && (
        <div className="flex flex-col gap-2 mt-2 py-5 px-4">
          <Skeleton variant="rounded" width={"100%"} height={50} />
          <Skeleton variant="rounded" width={"100%"} height={50} />
          <Skeleton variant="rounded" width={"100%"} height={50} />
          <Skeleton variant="rounded" width={"100%"} height={50} />
          <Skeleton variant="rounded" width={"100%"} height={50} />
        </div>
      )}
      {!loading && (
        <>
          <DialogContent sx={{ fontFamily: "inherit", direction: "rtl" }}>
            {/* سلکت Ant Design با استایل‌های خاص */}
            <Box
              sx={{
                mt: 1,
                direction: "rtl",
                position: "relative",
                zIndex: 9999,
              }}
            >
              <div className="flex items-center gap-2 sm:flex-nowrap flex-wrap">
                <div className="flex items-center gap-1 ">
                  <span className="whitespace-nowrap"> تعداد اقساط</span>
                  <Select 
                    value={selectedMonths}
                    onChange={handleMonthsChange}
                    size="large"
                    style={{
                      fontFamily: '"Yekan", "Vazir", sans-serif',
                      zIndex: 10000,
                    }}
                    styles={{
                      popup: {
                        zIndex: 10001,
                      },
                    }}
                    popupRender={(menu) => (
                      <div
                        style={{
                          zIndex: 10001,
                          fontFamily: '"Yekan", "Vazir", sans-serif',
                          direction: "rtl",
                        }}
                      >
                        {menu}
                      </div>
                    )}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 22 }, (_, i) => i + 3).map(
                      (month) => (
                        <Option
                          key={month}
                          value={month}
                          style={{
                            fontFamily: '"Yekan", "Vazir", sans-serif',
                            direction: "rtl",
                            textAlign: "right",
                          }}
                        >
                          {month} ماهه
                        </Option>
                      )
                    )}
                  </Select>
                </div>
                <div className="mb-1 w-full">
                  <Space.Compact style={{ width: "100%" }}>
                    <Input
                      type="tel"
                      addonBefore={prepaymentSelect}
                      value={
                        prepaymentType === "suggested" ? "" : customPrepayment
                      }
                      onChange={(e) => {
                        const raw = toEnglishNumber(e.target.value).replace(
                          /,/g,
                          ""
                        );
                        if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                          const formatted =
                            raw === "" ? "" : Number(raw).toLocaleString();
                          setCustomPrepayment(formatted);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (
                            prepaymentType !== "suggested" &&
                            customPrepayment
                          ) {
                            handleAmountes();
                          }
                        }
                      }}
                      disabled={prepaymentType === "suggested"}
                      placeholder={
                        prepaymentType === "suggested"
                          ? "پیش پرداخت پیشنهادی"
                          : "مثال: ۳,۰۰۰,۰۰۰"
                      }
                      style={{ marginTop: 4, width: "100%" }}
                      size="large"
                    />
                    <AntButton size="large"
                      onClick={() => {
                        handleAmountes();
                      }}
                      disabled={
                        prepaymentType === "suggested" || !customPrepayment
                      }
                      className="!mt-1"
                      type="primary"
                    >
                      <MdOutlineSubdirectoryArrowRight />
                    </AntButton>
                  </Space.Compact>
                </div>
              </div>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <div className="flex justify-between items-center sm:flex-row flex-col bg-[#2e7d3222] rounded-lg py-1 px-3">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FaMoneyBillWave style={{ color: "#2e7d32" }} />
                  <Typography color="text.secondary" fontFamily="inherit">
                    پیش پرداخت (حداقل یک سوم):
                  </Typography>
                </Box>
                <Typography
                  fontWeight="bold"
                  color="success.main"
                  fontFamily="inherit"
                >
                  {installmentsData?.prePayment?.toLocaleString()} تومان
                </Typography>
              </div>

              <div className="flex justify-between items-center sm:flex-row flex-col bg-[#1976d222] rounded-lg py-1 px-3">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FaMoneyBillWave style={{ color: "#1976d2" }} />
                  <Typography color="text.secondary" fontFamily="inherit">
                    مبلغ هر قسط:
                  </Typography>
                </Box>
                <Typography
                  fontWeight="bold"
                  color="primary.main"
                  fontFamily="inherit"
                >
                  {installmentsData?.amountEachInstallment?.toLocaleString()}{" "}
                  تومان
                </Typography>
              </div>

              <div className="flex justify-between items-center sm:flex-row flex-col bg-[#ed6c0222] rounded-lg py-1 px-3">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FaCalculator style={{ color: "#ed6c02" }} />
                  <Typography color="text.secondary" fontFamily="inherit">
                    جمع کل مبلغ اقساط:
                  </Typography>
                </Box>
                <Typography
                  fontWeight="bold"
                  color="warning.main"
                  fontFamily="inherit"
                >
                  {installmentsData?.sumAmountInstallment?.toLocaleString()}{" "}
                  تومان
                </Typography>
              </div>

              <div className="flex justify-between items-center sm:flex-row flex-col bg-[#37415122] rounded-lg py-1 px-3">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FaWallet style={{ color: "#374151" }} />
                  <Typography color="text.secondary" fontFamily="inherit">
                    قیمت تمام شده کالا:
                  </Typography>
                </Box>
                <Typography
                  fontWeight="bold"
                  color="text.primary"
                  fontFamily="inherit"
                >
                  {installmentsData?.finalAmountInstallment?.toLocaleString()}{" "}
                  تومان
                </Typography>
              </div>
            </Box>

            <div
              className="rounded-lg bg-blue-100 mt-3 p-2"

              // icon={<FaInfoCircle />}
            >
              <div className="flex items-center gap-1 !text-teal-800">
                <FaInfoCircle />
                <span className="font-bold text-lg">
                  شرایط ویژه برای اقساط سه ماهه
                </span>
              </div>
              <Typography fontFamily="inherit">
                لطفا جهت اعتبار سنجی نام و نام خانوادگی، شماره موبایل و کدملی
                دارنده چک را به شماره
                <Link
                  className="px-2"
                  href={`https://wa.me/${siteMobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteMobile}
                </Link>
                از طریق واتس آپ ارسال بفرمایید
              </Typography>
            </div>

            <Box
              sx={{
                textAlign: "center",
                mt: 1,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                fontSize: "16px",
              }}
            >
              <FaLink className="text-[#1976d2]" />
              <Link
                href="/afrang-leasing"
                target="_blank"
                sx={{
                  fontFamily: "inherit",
                  fontSize: "20px",
                }}
              >
                شرایط خرید اقساطی
              </Link>
            </Box>
          </DialogContent>

          <DialogActions sx={{ fontFamily: "inherit" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ fontFamily: "inherit" }}
            >
              بستن
            </Button>
          </DialogActions>
        </>
      )}

      {/* استایل‌های خاص برای سلکت Ant Design */}
      <style jsx global>{`
        /* افزایش z-index برای dropdown سلکت */
        .ant-select-dropdown {
          z-index: 10001 !important;
          font-family: "Yekan", "Vazir", sans-serif !important;
          direction: rtl !important;
        }

        .ant-select-item {
          font-family: "Yekan", "Vazir", sans-serif !important;
          direction: rtl !important;
          text-align: right !important;
        }

        .ant-select-item-option-content {
          font-family: "Yekan", "Vazir", sans-serif !important;
          direction: rtl !important;
        }

        /* مطمئن شدن که dropdown بالای مودال نمایش داده میشه */
        .MuiDialog-root .ant-select-dropdown {
          z-index: 10001 !important;
        }
      `}</style>
    </Dialog>
  );
}

export default ModalInstallment;
