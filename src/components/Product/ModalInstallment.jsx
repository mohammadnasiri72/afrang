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
  Typography,
} from "@mui/material";
import { Select } from "antd";
import { useState } from "react";
import {
  FaCalculator,
  FaInfoCircle,
  FaLink,
  FaMoneyBillWave,
  FaTimes,
  FaWallet,
} from "react-icons/fa";

const { Option } = Select;

function ModalInstallment({ openModal, setOpenModal }) {
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [productPrice] = useState(10000000);

  const calculateInstallments = (months, price) => {
    const prepayment = Math.ceil(price / 3);
    const totalWithInterest = Math.ceil(price * 1.1);
    const installmentAmount = Math.ceil(
      (totalWithInterest - prepayment) / months
    );

    return {
      prepayment,
      installmentAmount,
      totalAmount: totalWithInterest,
      productPrice: price,
    };
  };

  const installmentData = calculateInstallments(selectedMonths, productPrice);

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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaWallet style={{ color: "#1976d2" }} />
          <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
            خرید اقساطی
          </Typography>
        </Box>
        <Button onClick={handleClose} sx={{ minWidth: "auto", padding: "4px" }}>
          <FaTimes />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ fontFamily: "inherit", direction: "rtl" }}>
        {/* سلکت Ant Design با استایل‌های خاص */}
        <Box
          sx={{ mb: 3, direction: "rtl", position: "relative", zIndex: 9999 }}
        >
          <Typography sx={{ mb: 1, fontFamily: "inherit" }}>
            تعداد اقساط را انتخاب کنید
          </Typography>
          <Select
            value={selectedMonths}
            onChange={handleMonthsChange}
            size="large"
            style={{
              width: "100%",
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
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
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
              {installmentData.prepayment.toLocaleString()} تومان
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
              {installmentData.installmentAmount.toLocaleString()} تومان
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
              {installmentData.totalAmount.toLocaleString()} تومان
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
              {installmentData.productPrice.toLocaleString()} تومان
            </Typography>
          </Box>
        </Box>

        <Alert
          severity="info"
          icon={<FaInfoCircle />}
          sx={{ mt: 3, fontFamily: "inherit" }}
        >
          <Typography fontWeight="bold" gutterBottom fontFamily="inherit">
            شرایط ویژه برای اقساط سه ماهه
          </Typography>
          <Typography fontFamily="inherit">
            لطفا جهت اعتبار سنجی نام و نام خانوادگی، شماره موبایل و کدملی دارنده
            چک را به شماره
            <Link
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
            mt: 3,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
             fontSize: "16px",
          }}
        >
          <FaLink />
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
