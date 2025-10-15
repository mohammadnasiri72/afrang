"use client";

import { CalculatorOutlined } from "@ant-design/icons";
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

const { Option } = Select;
const { Title, Text } = Typography;

function CalculationInstallments() {
  const [totalAmount, setTotalAmount] = useState("");
  const [installmentMonths, setInstallmentMonths] = useState(3);
  const [prepaymentType, setPrepaymentType] = useState("suggested");
  const [customPrepayment, setCustomPrepayment] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);

  // فرمت کردن اعداد با جداکننده هزارگان
  const formatNumber = (num) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  // تبدیل رشته به عدد (حذف جداکننده‌ها)
  const parseNumber = (str) => {
    // if (!str) return 0;
    // const numericString = str.replace(/[^\d]/g, "");
    // return parseInt(numericString) || 0;
  };

  // هندل تغییر پیش پرداخت دستی
  const handleCustomPrepaymentChange = (e) => {
    const value = e.target.value;

    // استخراج فقط اعداد از مقدار جدید
    const newNumericValue = value.replace(/[^\d]/g, "");

    if (newNumericValue === "") {
      setCustomPrepayment("");
    } else {
      // تبدیل به عدد و سپس فرمت کردن
      const number = parseInt(newNumericValue);
      setCustomPrepayment(formatNumber(number));
    }
  };

  // محاسبات اقساط
  const calculateInstallments = () => {
    const amount = parseNumber(totalAmount);
    if (!amount || amount <= 0) {
      return;
    }

    let prepaymentAmount;
    if (prepaymentType === "suggested") {
      prepaymentAmount = Math.ceil(amount / 3);
    } else {
      prepaymentAmount = parseNumber(customPrepayment);
    }

    const totalWithInterest = Math.ceil(amount * 1.1);
    const remainingAmount = totalWithInterest - prepaymentAmount;
    const installmentAmount = Math.ceil(remainingAmount / installmentMonths);

    setCalculationResult({
      cashPrepayment: prepaymentAmount,
      totalInstallmentAmount: totalWithInterest,
      monthlyInstallment: installmentAmount,
      finalProductPrice: totalWithInterest,
    });
  };

  const suggestedPrepayment = totalAmount
    ? formatNumber(Math.ceil(parseNumber(totalAmount) / 3))
    : "";

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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
        <CalculatorOutlined /> محاسبه گر اقساط
      </Title>

      <Row gutter={24} align="stretch">
        {/* بخش ورودی‌ها */}
        <Col span={12}>
          <Card
            title="ورودی اطلاعات"
            style={{ height: "100%" }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {/* سطر اول: مبلغ کل و تعداد اقساط */}
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>مبلغ کل به تومان *</Text>
                  <Input
                    value={totalAmount}
                    onChange={(e) => {
                      setTotalAmount(e.target.value);
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
                  addonBefore={prepaymentSelect}
                  value={
                    prepaymentType === "suggested"
                      ? suggestedPrepayment
                      : customPrepayment
                  }
                  onChange={(e) => {
                    setCustomPrepayment(e.target.value);
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
                disabled={!totalAmount}
                style={{ width: "100%", height: 40 }}
                icon={<CalculatorOutlined />}
              >
                محاسبه
              </Button>
            </Space>
          </Card>
        </Col>

        {/* بخش نتایج */}
        <Col span={12}>
          <Card
            title="نتایج محاسبه"
            style={{ height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                minHeight: "200px",
              }}
            >
              {calculationResult ? (
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="middle"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Text style={{ fontSize: "14px" }}>
                      مبلغ نقدی پیش پرداخت :
                    </Text>
                    <Text strong style={{ color: "#1890ff", fontSize: "14px" }}>
                      {formatNumber(calculationResult.cashPrepayment)} تومان
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
                    <Text style={{ fontSize: "14px" }}>
                      جمع کل مبلغ اقساط :
                    </Text>
                    <Text strong style={{ color: "#52c41a", fontSize: "14px" }}>
                      {formatNumber(calculationResult.totalInstallmentAmount)}{" "}
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
                    <Text style={{ fontSize: "14px" }}>مبلغ هر قسط :</Text>
                    <Text strong style={{ color: "#fa8c16", fontSize: "14px" }}>
                      {formatNumber(calculationResult.monthlyInstallment)} تومان
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
                    <Text style={{ fontSize: "14px" }}>
                      قیمت تمام شده کالا :
                    </Text>
                    <Text strong style={{ color: "#722ed1", fontSize: "14px" }}>
                      {formatNumber(calculationResult.finalProductPrice)} تومان
                    </Text>
                  </div>
                </Space>
              ) : (
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
                  <Text style={{ fontStyle: "italic" }}>
                    لطفاً اطلاعات را وارد کرده و روی دکمه "محاسبه" کلیک کنید
                  </Text>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CalculationInstallments;
