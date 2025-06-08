"use client";

import { getCategory } from "@/services/Category/categoryService";
import { UploadFile } from "@/services/File/FileServices";
import { getGalleryUser, sendGallery, deleteGalleryUser } from "@/services/gallery/galleryServices";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import { PlusOutlined, UploadOutlined, EyeOutlined, HeartOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal, Select, Upload, Tooltip, Rate } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import { FaSpinner } from "react-icons/fa";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// تنظیمات Fancybox
Fancybox.defaults.Keyboard = {
    Escape: "close",
    ArrowRight: "next",
    ArrowLeft: "prev",
};

Fancybox.bind("[data-fancybox='my-gallery']", {
    Animation: {
        duration: 500,
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    },
    Toolbar: true,
    Buttons: true,
    Thumbs: {
        autoStart: true,
    },
    dragToClose: true,
});

const GallerySkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative aspect-[4/3]">
                        <div className="w-full h-full bg-gray-200 animate-pulse" />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DeleteImageModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300"
                onClick={onClose}
            />
            <div 
                className="relative bg-white rounded-lg p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100 opacity-100 shadow-xl"
                style={{
                    animation: 'modalFadeIn 0.3s ease-out'
                }}
            >
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#d1182b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">حذف تصویر</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">آیا از حذف این تصویر اطمینان دارید؟</p>
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${
                            isLoading 
                                ? "opacity-50 cursor-not-allowed" 
                                : "hover:bg-gray-200 cursor-pointer"
                        }`}
                    >
                        انصراف
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${
                            isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-1">
                                <FaSpinner className="animate-spin text-xs" />
                                <span>در حال حذف</span>
                            </div>
                        ) : (
                            "تایید"
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );

    return createPortal(modalContent, document.body);
};

const SendImage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const userData = getUserCookie();
    const [category, setCategory] = useState([]);
    const [loadingSelect, setLoadingSelect] = useState(true);
    const [listMyGallery, setListMyGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    

    // تنظیمات Toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const fetchCategory = async () => {
        try {
            setLoadingSelect(true);
            const categoryData = await getCategory({
                TypeId: 9,
                LangCode: 'fa',
            });

            if (categoryData.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: categoryData.message
                });
                return;
            }

            setCategory(categoryData)
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.response?.data || "خطای شبکه"
            });
        } finally {
            setLoadingSelect(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchCategory();
        }
    }, [isModalOpen])

    const onFinish = async (values) => {
        if (!userData?.token) {
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
            const response = await sendGallery({
                ...values,
                imageSrc: uploadResult
            }, userData.token);

            if (response.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });
                return;
            }

            Toast.fire({
                icon: 'success',
                title: "تصویر با موفقیت ارسال شد"
            });
            form.resetFields();
            setFileList([]);
            setIsModalOpen(false);
            
            // بروزرسانی لیست تصاویر
            await fetchMyGallery();
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: "خطا در ارسال تصویر"
            });
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
    };

    const fetchMyGallery = async () => {
        setIsLoading(true);
        try {
            const response = await getGalleryUser(userData.token);
            if (response.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });
                return;
            }
            setListMyGallery(response);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: "خطا در دریافت لیست تصاویر"
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userData?.token) {
            fetchMyGallery();
        }
    }, [userData?.token])

    const handleDelete = async () => {
        if (!selectedImageId) return;
        
        setIsDeleting(true);
        try {
            const response = await deleteGalleryUser(selectedImageId , userData.token);
            if (response.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });
                return;
            }

            Toast.fire({
                icon: 'success',
                title: 'تصویر با موفقیت حذف شد'
            });

            await fetchMyGallery();
            setIsDeleteModalOpen(false);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'خطا در حذف تصویر'
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedImageId(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">تصاویر من</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                    className="!bg-[#d1182b] hover:!bg-[#b91626]"
                >
                    افزودن عکس
                </Button>
            </div>

            {/* لیست تصاویر اینجا قرار می‌گیرد */}
            <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
                {isLoading ? (
                    <GallerySkeleton />
                ) : listMyGallery.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listMyGallery.map((item) => (
                            <div 
                                key={item.id} 
                                className={`bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 relative
                                    ${item.isActive ? 'border-2 border-green-500' : 'border-2 border-orange-500'}`}
                            >
                                {/* لیبل وضعیت روی عکس */}
                                <div className="absolute top-2 right-2 z-10">
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${item.isActive 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-orange-400 text-gray-800'}`}
                                    >
                                        {item.isActive ? 'تایید شده' : 'در انتظار تایید'}
                                    </div>
                                </div>

                                <div className="relative aspect-[4/3]">
                                    <a
                                        data-fancybox="my-gallery"
                                        data-caption={item.categoryTitle}
                                        href={getImageUrl(item.image)}
                                        className="block relative w-full h-full"
                                    >
                                        <img 
                                            src={getImageUrl(item.image)} 
                                            alt={item.categoryTitle}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                        <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="inline-block px-3 py-1 bg-[#d1182b]/10 rounded-full">
                                                <span className="text-sm font-medium text-[#d1182b]">{item.categoryTitle}</span>
                                            </div>
                                        </div>
                                            <Tooltip title={`امتیاز: ${item.adminScore}`} placement="bottom">
                                                <div>
                                                    <Rate 
                                                        disabled 
                                                        value={item.adminScore} 
                                                        allowHalf 
                                                        className="!text-[15px]"
                                                    />
                                                </div>
                                            </Tooltip>
                                        <div className="flex items-center gap-2">
                                            <Tooltip title="حذف تصویر" placement="bottom">
                                                <button
                                                    onClick={() => openDeleteModal(item.id)}
                                                    className="p-2 text-gray-500 hover:text-[#d1182b] transition-colors cursor-pointer"
                                                >
                                                    <DeleteOutlined className="text-base" />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                        <div className="flex items-center gap-1.5 bg-gray-50/50 px-2 py-1 rounded">
                                            <span className="text-gray-600">دوربین:</span>
                                            <span className="text-gray-700">{item.cameraType}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-gray-50/50 px-2 py-1 rounded">
                                            <span className="text-gray-600">لنز:</span>
                                            <span className="text-gray-700">{item.lenzType}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-gray-50/50 px-2 py-1 rounded col-span-2">
                                            <span className="text-gray-600">تاریخ:</span>
                                            <span className="text-gray-700">{item.photoTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <EyeOutlined className="text-xs" />
                                                <span>{item.visit} بازدید</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <HeartOutlined className="text-xs" />
                                                <span>{item.like} لایک</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <UploadOutlined className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">تصویری ارسال نشده</h3>
                        <p className="text-gray-500 mb-4">هنوز هیچ تصویری ارسال نکرده‌اید</p>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                            className="!bg-[#d1182b] hover:!bg-[#b91626]"
                        >
                            افزودن عکس
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                title="ارسال تصویر جدید"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <Alert
                    message="راهنمای ارسال تصویر"
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
                    onFinish={onFinish}
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

                    <Form.Item className="mb-0">
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={handleCancel}
                                className="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-gray-300 "
                            >
                                انصراف
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="!bg-[#d1182b] hover:!bg-[#b91626]"
                            >
                                ارسال تصویر
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <DeleteImageModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default SendImage; 