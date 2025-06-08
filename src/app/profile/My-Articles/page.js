"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/userSlice';
import { Button, Form, Input, Select, message, Modal, Spin, Upload, Alert } from 'antd';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getUserCookie } from '@/utils/cookieUtils';
import { getCategory } from '@/services/Category/categoryService';
import { UploadFile } from "@/services/File/FileServices";
import { UploadOutlined } from "@ant-design/icons";
import { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const { TextArea } = Input;
const { Option } = Select;

export default function MyArticles() {
    const [form] = Form.useForm();
    const [articles, setArticles] = useState([]);
    const [categoryNews, setCategoryNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const user = useSelector(selectUser);
    const userCookie = getUserCookie();
    const router = useRouter();

    // Fetch articles on component mount
    useEffect(() => {
        if(isModalVisible){
            fetchCategoryNews();
        }
    }, [isModalVisible]);

    const fetchCategoryNews = async () => {
        try {
            const category = await getCategory({
                TypeId: 5,
                LangCode: "fa",
              })
              if(category.type === 'error'){
                message.error(category.message);
                return;
            }
            setCategoryNews(category);
        } catch (error) {
            message.error('خطا در دریافت مقالات');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        if (!userCookie?.token) {
            Toast.fire({
                icon: 'error',
                title: "لطفا ابتدا وارد حساب کاربری خود شوید"
            });
            router.push("/login");
            return;
        }

        if (fileList.length === 0) {
            Toast.fire({
                icon: 'error',
                title: "لطفا یک تصویر انتخاب کنید"
            });
            return;
        }

        setLoading(true);
        try {
            // اول فایل رو آپلود می‌کنیم
            const file = fileList[0].originFileObj;
            const uploadResult = await UploadFile(file);

            if (uploadResult.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: uploadResult.message
                });
                return;
            }

            // حالا اطلاعات رو با لینک عکس آپلود شده می‌فرستیم
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userCookie?.token}`
                },
                body: JSON.stringify({
                    ...values,
                    imageSrc: uploadResult
                })
            });

            if (response.ok) {
                message.success('مقاله با موفقیت ثبت شد');
                form.resetFields();
                setFileList([]);
                setIsModalVisible(false);
                fetchArticles();
            } else {
                throw new Error('خطا در ثبت مقاله');
            }
        } catch (error) {
            message.error('خطا در ثبت مقاله');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (article) => {
        setEditingArticle(article);
        form.setFieldsValue(article);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            // TODO: Replace with actual API call
            const response = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userCookie?.token}`
                }
            });

            if (response.ok) {
                message.success('مقاله با موفقیت حذف شد');
                fetchArticles();
            } else {
                throw new Error('خطا در حذف مقاله');
            }
        } catch (error) {
            message.error('خطا در حذف مقاله');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            setSubmitting(true);

            // TODO: Replace with actual API call
            const response = await fetch(`/api/articles/${editingArticle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userCookie?.token}`
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                message.success('مقاله با موفقیت ویرایش شد');
                setIsModalVisible(false);
                setEditingArticle(null);
                form.resetFields();
                fetchArticles();
            } else {
                throw new Error('خطا در ویرایش مقاله');
            }
        } catch (error) {
            message.error('خطا در ویرایش مقاله');
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingArticle(null);
        form.resetFields();
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
            Toast.fire({
                icon: 'error',
                title: 'فقط فایل‌های تصویری مجاز هستند!'
            });
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            Toast.fire({
                icon: 'error',
                title: 'حجم تصویر باید کمتر از 5MB باشد!'
            });
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">ارسال اخبار و مقالات</h1>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={() => {
                        setEditingArticle(null);
                        form.resetFields();
                        setIsModalVisible(true);
                    }}
                    className="!bg-[#d1182b] hover:!bg-[#b91626]"
                >
                    ارسال مقاله جدید
                </Button>
            </div>

            {/* Articles List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin size="large" />
                    </div>
                ) : articles.length > 0 ? (
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{article.category}</p>
                                        <p className="text-gray-600 mt-2 line-clamp-2">{article.content}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            icon={<FaEdit />}
                                            onClick={() => handleEdit(article)}
                                            className="text-blue-600 hover:text-blue-700"
                                        />
                                        <Button
                                            icon={<FaTrash />}
                                            onClick={() => handleDelete(article.id)}
                                            className="text-red-600 hover:text-red-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        هنوز مقاله‌ای ثبت نشده است
                    </div>
                )}
            </div>

            {/* Article Form Modal */}
            <Modal
                title={editingArticle ? "ویرایش مقاله" : "ارسال مقاله جدید"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                confirmLoading={submitting}
                okText={editingArticle ? "ویرایش" : "ثبت"}
                cancelText="انصراف"
                footer={[
                    <Button
                        key="cancel"
                        onClick={handleModalCancel}
                        className="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0"
                    >
                        انصراف
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleModalOk}
                        loading={submitting}
                        className="!bg-[#d1182b] hover:!bg-[#b91626] !border-0"
                    >
                        {editingArticle ? "ویرایش" : "ارسال مقاله"}
                    </Button>,
                ]}
                className="!w-[90%] md:!w-[500px]"
            >
                <Alert
                    message="راهنمای ارسال مقاله"
                    description={
                        <div>
                            توضیح : لطفا هر عکس را در سایز 600*800 ارسال نمایید . جهت کم کردن حجم عکس ها از گزینه Save For Web در برنامه photoshop استفاده نمایید
                        </div>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: '20px' }}
                />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="title"
                        label="عنوان مقاله"
                        rules={[{ required: true, message: 'لطفا عنوان مقاله را وارد کنید' }]}
                    >
                        <Input placeholder="عنوان مقاله را وارد کنید" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="دسته‌بندی"
                        rules={[{ required: true, message: 'لطفا دسته‌بندی را انتخاب کنید' }]}
                    >
                        <Select placeholder="دسته‌بندی را انتخاب کنید">
                            {categoryNews.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="summary"
                        label="خلاصه مقاله"
                        rules={[{ required: true, message: 'لطفا خلاصه مقاله را وارد کنید' }]}
                    >
                        <TextArea
                            rows={3}
                            placeholder="خلاصه مقاله را وارد کنید"
                        />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="متن مقاله"
                        rules={[{ required: true, message: "لطفا متن مقاله را وارد کنید" }]}
                    >
                        <TextArea
                            rows={6}
                            placeholder="متن مقاله را وارد کنید"
                        />
                    </Form.Item>

                    <Form.Item
                        name="source"
                        label="منبع"
                    >
                        <Input placeholder="منبع مقاله را وارد کنید (اختیاری)" />
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="تصویر شاخص"
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
                </Form>
            </Modal>
        </div>
    );
} 