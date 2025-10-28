"use client";

import { reportMissing } from "@/services/MissingReport/MissingReportServices";
import { getUserCookie } from "@/utils/cookieUtils";
import { Alert, Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Option } = Select;

const ReportLossForm = ({ categories }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const user = getUserCookie();
      if (!user?.token) {
        message.error("لطفا ابتدا وارد حساب کاربری خود شوید");
        router.push("/login");
        return;
      }

      setLoading(true);

      const response = await reportMissing(values, user.token);

      if (response.type === "error") {
        message.error(response.message);
        return;
      }

      message.success("گزارش مفقودی با موفقیت ثبت شد");
      form.resetFields();
    } catch (error) {
      message.error("خطا در ثبت گزارش مفقودی");
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm z-50 relative">
      <Alert
        message="راهنمای اعلام مفقودی"
        description={
          <div>
            <p className="text-justify">
              کاربر گرامی لطفا اطلاعات کالای مفقودی خود را در این قسمت وارد
              نمایید ، در اینصورت هنگام جستجو در فروش محصولات دست دوم چک می گردد
              که این کالا به کسی فروخته نشود
            </p>
          </div>
        }
        type="info"
        showIcon
        className="!mb-6 !px-3 !py-2"
      />

      <h2 className="text-xl font-bold my-6 text-gray-800">گزارش مفقودی</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-2xl"
      >
        <Form.Item
          name="categoryId"
          label="گروه محصولات"
          rules={[
            { required: true, message: "لطفا گروه محصولات را انتخاب کنید" },
          ]}
        >
          <Select size="large" placeholder="گروه محصولات را انتخاب کنید">
            {categories?.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="نام محصول"
          rules={[{ required: true, message: "لطفا نام محصول را وارد کنید" }]}
        >
          <Input
            className="!text-[16px]"
            size="large"
            placeholder="نام محصول"
          />
        </Form.Item>

        <Form.Item
          name="serialNumber"
          label="سریال محصول"
          rules={[{ required: true, message: "لطفا سریال محصول را وارد کنید" }]}
        >
          <Input
            className="!text-[16px]"
            size="large"
            placeholder="سریال محصول"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            className="mt-5"
            style={{
              backgroundColor: isHovered ? "#b91626" : "#d1182b",
              color: "white",
              border: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            ثبت گزارش
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReportLossForm;
