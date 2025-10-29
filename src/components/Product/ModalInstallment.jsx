import { getCsrf } from "@/services/csrf/csrf";
import { getInstallments } from "@/services/Installments/Installments";
import {
  Alert,
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
import { Select } from "antd";
import { useEffect, useState } from "react";
import {
  FaCalculator,
  FaInfoCircle,
  FaLink,
  FaMoneyBillWave,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
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

  const handleAmountes = async () => {
    setLoading(true);
    const data = {
      total: product.product.finalPrice,
      number: selectedMonths,
      prePayment: 0,
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
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          fontFamily: '"Yekan", "Vazir", sans-serif',
          direction: "rtl",
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
              <div className="flex items-center gap-1 sm:flex-nowrap flex-wrap">
                <Typography
                  sx={{ mb: 1, fontFamily: "inherit", whiteSpace: "nowrap" }}
                >
                  تعداد اقساط را انتخاب کنید
                </Typography>
                <Select
                  value={selectedMonths}
                  onChange={handleMonthsChange}
                  size="middle"
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
                  {Array.from({ length: 22 }, (_, i) => i + 3).map((month) => (
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
                  ))}
                </Select>
              </div>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
              </Box>
            </Box>

            <Alert
              severity="info"
              icon={<FaInfoCircle />}
              sx={{ mt: 1, fontFamily: "inherit" }}
            >
              <Typography fontWeight="bold" gutterBottom fontFamily="inherit">
                شرایط ویژه برای اقساط سه ماهه
              </Typography>
              <Typography fontFamily="inherit">
                لطفا جهت اعتبار سنجی نام و نام خانوادگی، شماره موبایل و کدملی
                دارنده چک را به شماره
                <Link className="px-2"
                  href={`https://wa.me/989013450132`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  09128397329
                </Link>
                از طریق واتس آپ ارسال بفرمایید
              </Typography>
            </Alert>

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
