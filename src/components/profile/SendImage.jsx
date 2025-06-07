"use client";

import { Button, Form, Input, Select, Upload, message, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/utils/mainDomain";
import { getUserCookie } from "@/utils/cookieUtils";
import { useRouter } from "next/navigation";
import { getCategory } from "@/services/Category/categoryService";
import { sendGallery } from "@/services/gallery/galleryServices";

const SendImage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const router = useRouter();
    const userData = getUserCookie();
    const [category, setCategory] = useState([]);
    const [loadingSelect, setLoadingSelect] = useState(true);

    const fetchCategory = async () => {
        try {
            setLoadingSelect(true);
            const categoryData = await getCategory({
                TypeId: 9,
                LangCode: 'fa',
            });

            if (categoryData.type === 'error') {
                message.error(categoryData.message);
                return;
            }

            setCategory(categoryData)
        } catch (error) {
            message.error(error.response?.data || "خطای شبکه");
        } finally {
            setLoadingSelect(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [])

    const onFinish = async (values) => {
        if (!userData?.token) {
            message.error("لطفا ابتدا وارد حساب کاربری خود شوید");
            router.push("/login");
            return;
        }

        if (fileList.length === 0) {
            message.error("لطفا یک تصویر انتخاب کنید");
            return;
        }

        setLoading(true);
        try {
            const response = await sendGallery(values, userData.token);
            if (response.type === 'error') {
                message.error(response.message);
                return;
            }
            message.success("تصویر با موفقیت ارسال شد");
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error("خطا در ارسال تصویر");
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

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('فقط فایل‌های تصویری مجاز هستند!');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('حجم تصویر باید کمتر از 5MB باشد!');
            return Upload.LIST_IGNORE;
        }
        return true;
    };



    return (
        <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
            <h1 className="text-2xl font-bold mb-6">ارسال تصویر</h1>

            <Alert
                message="راهنمای ارسال تصویر"
                description={
                    <div>
                        توضیح : لطفا هر عکس را در سایز 600*800 ارسال نمایید . جهت کم کردن حجم عکس ها از گزینه Save For Web در برنامه photoshop استفاده نمایید
                    </div>
                }
                type="info"
                showIcon
                style={{marginBottom:'20px'}}
            />

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="max-w-2xl"
            >
                <Form.Item
                    name="category"
                    label="دسته‌بندی"
                    rules={[{ required: true, message: "لطفا دسته‌بندی را انتخاب کنید" }]}
                >
                    <Select
                        placeholder="دسته‌بندی را انتخاب کنید"
                        loading={loadingSelect}
                        notFoundContent={loadingSelect ? "در حال بارگذاری..." : "دسته‌بندی یافت نشد"}
                    >
                        {category?.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="camera"
                    label="نوع دوربین"
                    rules={[{ required: true, message: "لطفا نوع دوربین را وارد کنید" }]}
                >
                    <Input placeholder="نوع دوربین را وارد کنید" />
                </Form.Item>

                <Form.Item
                    name="lens"
                    label="نوع لنز"
                    rules={[{ required: true, message: "لطفا نوع لنز را وارد کنید" }]}
                >
                    <Input placeholder="نوع لنز را وارد کنید" />
                </Form.Item>

                <Form.Item
                    name="photoDate"
                    label="تاریخ و زمان عکاسی"
                    rules={[{ required: true, message: "لطفا تاریخ و زمان عکاسی را وارد کنید" }]}
                >
                    <Input placeholder="تاریخ و زمان عکاسی را وارد کنید" />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="تصویر"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "لطفا یک تصویر انتخاب کنید" }]}
                >
                    <Upload
                        name="file"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                    >
                        <Button icon={<UploadOutlined />}>انتخاب تصویر</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-[#d1182b] hover:bg-[#b31526]"
                    >
                        ارسال تصویر
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SendImage; 