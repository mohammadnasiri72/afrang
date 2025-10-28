"use client";

import { getCsrf } from "@/services/csrf/csrf";
import { getInstallments } from "@/services/Installments/Installments";
import { CalculatorOutlined } from "@ant-design/icons";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { FaCalculator, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import Swal from "sweetalert2";

// تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
const toEnglishNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

const { Option } = Select;
const { Title, Text } = Typography;

function CalculationInstallments() {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [installmentMonths, setInstallmentMonths] = useState(10);
  const [prepaymentType, setPrepaymentType] = useState("suggested");
  const [customPrepayment, setCustomPrepayment] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [installmentsData, setInstallmentsData] = useState({});

  // محاسبات اقساط
  const calculateInstallments = async () => {
    setLoading(true);
    setInstallmentsData({});
    const data = {
      total: Number(totalAmount.replace(/,/g, "")),
      number: installmentMonths,
      prePayment:
        prepaymentType === "suggested"
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
      setInstallmentsData({});
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const prepaymentSelect = (
    <Select
      value={prepaymentType}
      onChange={setPrepaymentType}
      style={{ width: 120 }}
    >
      <Option value="suggested">پیشنهادی</Option>
      <Option value="custom">انتخابی</Option>
    </Select>
  );

  return (
    <div className="w-full sm:px-10 px-3 py-3 max-w-[2000px] mx-auto overflow-hidden">
      <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
        <CalculatorOutlined /> محاسبه گر اقساط
      </Title>

      <div className="flex flex-wrap">
        <div className="sm:w-1/2 w-full p-2">
          <Card title="ورودی اطلاعات" style={{ height: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {/* سطر اول: مبلغ کل و تعداد اقساط */}
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>مبلغ کل به تومان *</Text>
                  <Input
                    type="tel"
                    value={totalAmount}
                    onChange={(e) => {
                      const raw = toEnglishNumber(e.target.value).replace(
                        /,/g,
                        ""
                      );
                      if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                        const formatted =
                          raw === "" ? "" : Number(raw).toLocaleString();
                        setTotalAmount(formatted);
                      }
                    }}
                    placeholder="مثال: ۱۰,۰۰۰,۰۰۰"
                    style={{ marginTop: 4 }}
                    size="middle"
                  />
                </Col>
                <Col span={12}>
                  <Text strong>تعداد اقساط *</Text>
                  <Select
                    value={installmentMonths}
                    onChange={setInstallmentMonths}
                    style={{ width: "100%", marginTop: 4 }}
                    size="middle"
                  >
                    {Array.from({ length: 22 }, (_, i) => i + 3).map(
                      (month) => (
                        <Option key={month} value={month}>
                          {month} ماهه
                        </Option>
                      )
                    )}
                  </Select>
                </Col>
              </Row>

              {/* پیش پرداخت */}
              <div>
                <Text strong>پیش پرداخت</Text>
                <Input
                  type="tel"
                  addonBefore={prepaymentSelect}
                  value={prepaymentType === "suggested" ? "" : customPrepayment}
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
                  disabled={prepaymentType === "suggested"}
                  placeholder={
                    prepaymentType === "suggested"
                      ? "پیش پرداخت پیشنهادی"
                      : "مثال: ۳,۰۰۰,۰۰۰"
                  }
                  style={{ marginTop: 4 }}
                  size="middle"
                />
              </div>

              {/* دکمه محاسبه */}
              <Button
                type="primary"
                size="middle"
                onClick={calculateInstallments}
                disabled={
                  !totalAmount ||
                  (prepaymentType === "custom" && !customPrepayment)
                }
                style={{ width: "100%", height: 40 }}
                // icon={!loading ? <CircularProgress size={15} color="inherit" /> : <CalculatorOutlined />}
              >
                <div className="flex items-center gap-1">
                  {loading ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    <CalculatorOutlined />
                  )}
                  <span>محاسبه</span>
                </div>
              </Button>
            </Space>
          </Card>
        </div>
        <div className="sm:w-1/2 w-full p-2">
          <Card title="نتایج محاسبه" style={{ height: "100%" }}>
            <div>
              {!loading && installmentsData?.prePayment && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaMoneyBillWave style={{ color: "#2e7d32" }} />
                      <Typography color="text.secondary">
                        پیش پرداخت (حداقل یک سوم):
                      </Typography>
                    </Box>
                    <Text strong style={{ color: "#2e7d32", fontSize: "14px" }}>
                      <span className="font-bold text-lg">
                        {installmentsData?.prePayment?.toLocaleString()}
                      </span>{" "}
                      تومان
                    </Text>
                  </div>

                  <Divider style={{ margin: "4px 0" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaMoneyBillWave style={{ color: "#1976d2" }} />
                      <Typography color="text.secondary">
                        مبلغ هر قسط:
                      </Typography>
                    </Box>
                    <Text strong style={{ color: "#1976d2", fontSize: "14px" }}>
                      <span className="font-bold text-lg">
                        {installmentsData?.amountEachInstallment?.toLocaleString()}
                      </span>
                      تومان
                    </Text>
                  </div>

                  <Divider style={{ margin: "4px 0" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaCalculator style={{ color: "#ed6c02" }} />
                      <Typography color="text.secondary">
                        جمع کل مبلغ اقساط:
                      </Typography>
                    </Box>
                    <Text strong style={{ color: "#ed6c02", fontSize: "14px" }}>
                      <span className="font-bold text-lg">
                        {installmentsData?.sumAmountInstallment?.toLocaleString()}
                      </span>
                      تومان
                    </Text>
                  </div>

                  <Divider style={{ margin: "4px 0" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaWallet style={{ color: "#374151" }} />
                      <Typography color="text.secondary">
                        قیمت تمام شده کالا:
                      </Typography>
                    </Box>
                    <Text strong style={{ color: "#374151", fontSize: "14px" }}>
                      <span className="font-bold text-lg">
                        {installmentsData?.finalAmountInstallment?.toLocaleString()}
                      </span>
                      تومان
                    </Text>
                  </div>
                </div>
              )}

              {!loading && !installmentsData?.prePayment && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#999",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CalculatorOutlined
                    style={{
                      fontSize: "48px",
                      marginBottom: "16px",
                      opacity: 0.5,
                    }}
                  />
                  <Text>
                    لطفاً اطلاعات را وارد کرده و روی دکمه "محاسبه" کلیک کنید
                  </Text>
                </div>
              )}
              {loading && (
                <div className="flex flex-col gap-2.5 mt-0.5">
                  <Skeleton variant="rounded" width={"100%"} height={43} />
                  <Skeleton variant="rounded" width={"100%"} height={43} />
                  <Skeleton variant="rounded" width={"100%"} height={43} />
                  <Skeleton variant="rounded" width={"100%"} height={43} />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CalculationInstallments;
