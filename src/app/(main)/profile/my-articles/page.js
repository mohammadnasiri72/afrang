"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { UploadFile } from "@/services/File/FileServices";
import {
  deleteUserNews,
  getUserNews,
  postUserNews,
  putUserNews,
} from "@/services/UserNews/UserNewsServices";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Fancybox } from "@fancyapps/ui";
import {
  Alert,
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Rate,
  Select,
  Tooltip,
  Upload,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const { TextArea } = Input;
const { Option } = Select;

// تنظیمات Fancybox
Fancybox.defaults.Keyboard = {
  Escape: "close",
  ArrowRight: "next",
  ArrowLeft: "prev",
};

Fancybox.bind("[data-fancybox='articles-gallery']", {
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

const DeleteArticleModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
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
          animation: "modalFadeIn 0.3s ease-out",
        }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#d1182b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">حذف مقاله</h3>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            آیا از حذف این مقاله اطمینان دارید؟
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 text-sm bg-gray-100 !text-gray-700 rounded-md transition-colors ${
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
            className={`px-4 py-2 text-sm bg-[#d1182b] !text-white rounded-md transition-colors min-w-[90px] ${
              isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-[#b91626]"
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

export default function MyArticles() {
  const [form] = Form.useForm();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingLoading, setEditingLoading] = useState({});
  const [editingArticle, setEditingArticle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const user = useSelector(selectUser);
  const userCookie = getUserCookie();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12); // تعداد مقالات در هر صفحه

  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await getUserNews(userCookie.token);

      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return;
      }
      setArticles(response);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "خطا در دریافت مقالات",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (values) => {
    if (!userCookie?.token) {
      Toast.fire({
        icon: "error",
        title: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
      router.push("/login");
      return;
    }

    if (fileList.length === 0) {
      Toast.fire({
        icon: "error",
        title: "لطفا یک تصویر انتخاب کنید",
      });
      return;
    }

    setLoading(true);
    try {
      // اول فایل رو آپلود می‌کنیم
      const file = fileList[0].originFileObj;
      const uploadResult = await UploadFile(file);

      if (uploadResult.type === "error") {
        Toast.fire({
          icon: "error",
          title: uploadResult.message,
        });
        return;
      }
      // حالا اطلاعات رو با لینک عکس آپلود شده می‌فرستیم
      const response = await postUserNews(
        {
          ...values,
          imageSrc: uploadResult.imageUrl,
        },
        userCookie.token
      );

      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return;
      }

      Toast.fire({
        icon: "success",
        title: "مقاله با موفقیت ثبت شد",
      });
      setFileList([]);
      setIsModalVisible(false);
      fetchArticles();
    } catch (error) {
      message.error("خطا در ثبت مقاله");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (article) => {
    setEditingLoading((prev) => ({ ...prev, [article.id]: true }));
    try {
      setEditingArticle(article);

      // تنظیم مقادیر فرم با ساختار دقیق داده‌ها
      form.setFieldsValue({
        title: article.title,
        category: article.categoryId,
        summary: article.summary,
        content: article.body,
        source: article.sourceLink,
        upload: [
          {
            uid: "-1",
            name: article.image.split("/").pop(),
            status: "done",
            url: getImageUrl(article.image),
            thumbUrl: getImageUrl(article.image),
          },
        ],
      });

      setFileList([
        {
          uid: "-1",
          name: article.image.split("/").pop(),
          status: "done",
          url: getImageUrl(article.image),
          thumbUrl: getImageUrl(article.image),
          originFileObj: null,
        },
      ]);

      setIsModalVisible(true);
    } finally {
      setEditingLoading((prev) => ({ ...prev, [article.id]: false }));
    }
  };

  const handleDelete = async () => {
    if (!selectedArticleId) return;

    setIsDeleting(true);
    try {
      if (!user?.token) {
        Toast.fire({
          icon: "error",
          title: "لطفا مجددا وارد شوید",
        });
        return;
      }

      const response = await deleteUserNews(selectedArticleId, user.token);

      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message || "خطا در حذف مقاله",
        });
        return;
      }

      Toast.fire({
        icon: "success",
        title: "مقاله با موفقیت حذف شد",
      });
      setIsDeleteModalOpen(false);
      setSelectedArticleId(null);
      fetchArticles(); // Refresh the articles list
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "خطا در حذف مقاله",
      });
      console.error("Delete article error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModalOk = async () => {
    setSubmitting(true);
    try {
      if (editingArticle) {
        await form.validateFields();
        const values = form.getFieldsValue();

        // اگر فایل جدید انتخاب شده
        let imageSrc = editingArticle.image;
        if (fileList.length > 0 && fileList[0].originFileObj) {
          const uploadResult = await UploadFile(fileList[0].originFileObj);
          if (uploadResult.type === "error") {
            Toast.fire({
              icon: "error",
              title: uploadResult.message,
            });
            return;
          }
          imageSrc = uploadResult.imageUrl;
        }

        const response = await putUserNews(
          {
            id: editingArticle.id,
            categoryId: values.category,
            imageSrc: imageSrc,
            title: values.title,
            summary: values.summary,
            body: values.content,
            sourceLink: values.source,
          },
          user.token
        );

        if (response.type === "error") {
          Toast.fire({
            icon: "error",
            title: response.message,
          });
          return;
        }

        Toast.fire({
          icon: "success",
          title: "مقاله با موفقیت ویرایش شد",
        });
        setIsModalVisible(false);
        setEditingArticle(null);
        form.resetFields();
        setFileList([]);
        fetchArticles();
      } else {
        await form.submit();
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingArticle(null);
    form.resetFields();
    setFileList([]);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      Toast.fire({
        icon: "error",
        title: "فقط فایل‌های تصویری مجاز هستند!",
      });
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      Toast.fire({
        icon: "error",
        title: "حجم تصویر باید کمتر از 5MB باشد!",
      });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const openDeleteModal = (id) => {
    setSelectedArticleId(id);
    setIsDeleteModalOpen(true);
  };

  // محاسبه مقالات قابل نمایش در صفحه فعلی
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return articles.slice(startIndex, endIndex);
  };

  // تغییر صفحه
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // تغییر تعداد آیتم در هر صفحه
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // برگشت به صفحه اول
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <style jsx global>{`
        .ant-select {
          z-index: 110000 !important;
        }
        .ant-select-item-option {
          z-index: 110000 !important;
        }
        .ant-select-dropdown {
          z-index: 110000 !important;
        }
        .ant-select-item {
          z-index: 110000 !important;
        }
        
      `}</style>
       
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          ارسال اخبار و مقالات
        </h1>
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
      <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-[4/3]">
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                </div>
                <div className="p-4 space-y-4">
                  {/* Category Badge Skeleton */}
                  <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse" />

                  {/* Title Skeleton */}
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>

                  {/* Summary Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  </div>

                  {/* Date and Stats Skeleton */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-4">
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentPageArticles().map((article) => (
                <div
                  key={article.id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 relative z-50   
                                        ${
                                          article.isActive
                                            ? "border-2 border-green-500"
                                            : "border-2 border-orange-500"
                                        }`}
                >
                  {/* لیبل وضعیت روی عکس */}
                  <div className="absolute top-2 right-2 z-10">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${
                                              article.isActive
                                                ? "bg-green-500 !text-white"
                                                : "bg-orange-400 text-gray-800"
                                            }`}
                    >
                      {article.isActive ? "تایید شده" : "در انتظار تایید"}
                    </div>
                  </div>

                  <div className="relative aspect-[4/3]">
                    <a
                      data-fancybox="articles-gallery"
                      data-caption={article.title}
                      href={getImageUrl(article.image)}
                      className="block relative w-full h-full"
                    >
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <div className="absolute bottom-2 left-2 z-10">
                      <Rate
                        disabled
                        defaultValue={Number(article.rate) / 2 || 0}
                        allowHalf
                        className="!text-gold-500"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="px-4 pt-2">
                    <div className="flex items-center justify-between mb-2">
                      {article?.url ? (
                        <Link href={article.url}>
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-[#d1182b] duration-300">
                            {article.title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {article.title}
                        </h3>
                      )}
                      <div className="flex items-center gap-2">
                        <Tooltip title="ویرایش مقاله" placement="bottom">
                          <button
                            onClick={() => handleEdit(article)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                          >
                            <EditOutlined className="text-lg !text-teal-500 hover:!text-t" />
                          </button>
                        </Tooltip>
                        <Tooltip title="حذف مقاله" placement="bottom">
                          <button
                            onClick={() => openDeleteModal(article.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                          >
                            <DeleteOutlined className="text-lg !text-[#d1182b] hover:!text-[#b91626]" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm mb-1">
                      <div className="flex items-center bg-gray-50/50 gap-1 py-1 rounded text-xs">
                        <span className="text-gray-600">دسته‌بندی :</span>
                        <span className="text-gray-700">
                          {article.categoryTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50/50 py-1 rounded text-xs">
                        <span className="text-gray-600">تاریخ :</span>
                        <span className="text-gray-700">
                          {new Date(article.created).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-t border-gray-100 p-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <EyeOutlined className="text-xs" />
                          <span>{article.visit || 0} بازدید</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartOutlined className="text-xs" />
                          <span>{article.like || 0} لایک</span>
                        </div>
                      </div>
                      {article.sourceLink && (
                        <Link
                          href={article.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        >
                          <span className="text-xs">مشاهده منبع</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div dir="ltr" className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                total={articles.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger={true}
                pageSizeOptions={["12", "24", "36", "48"]}
                className="custom-pagination"
                showLessItems={true}
                responsive={true}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UploadOutlined className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              مقاله‌ای ارسال نشده
            </h3>
            <p className="text-gray-500 mb-4">
              هنوز هیچ مقاله‌ای ارسال نکرده‌اید
            </p>
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
        )}
      </div>

      {/* Article Form Modal */}
      <Modal
        title={editingArticle ? "ویرایش مقاله" : "ارسال مقاله جدید"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
            disabled={submitting}
            className="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0"
          >
            انصراف
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalOk}
            loading={submitting}
            disabled={submitting}
            className="!bg-[#d1182b] hover:!bg-[#b91626] !border-0 min-w-[100px]"
          >
            {editingArticle ? (
              submitting ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  در حال ویرایش
                </span>
              ) : (
                "ویرایش"
              )
            ) : submitting ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                در حال ارسال
              </span>
            ) : (
              "ارسال مقاله"
            )}
          </Button>,
        ]}
        className="!w-[90%] md:!w-[500px]"
      >
        <Alert
          message="راهنمای ارسال مقاله"
          description={
            <div className="text-justify">
              توضیح : لطفا هر عکس را در سایز 600*800 ارسال نمایید . جهت کم کردن
              حجم عکس ها از گزینه Save For Web در برنامه photoshop استفاده
              نمایید
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: "20px" }}
        />

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="عنوان مقاله"
            rules={[
              { required: true, message: "لطفا عنوان مقاله را وارد کنید" },
            ]}
          >
            <Input placeholder="عنوان مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item
            name="category"
            label="دسته‌بندی"
            rules={[
              { required: true, message: "لطفا دسته‌بندی را انتخاب کنید" },
            ]}
          >
            <Select style={{zIndex:'1000000'}} placeholder="دسته‌بندی را انتخاب کنید">
              <Option value={3691}>مقالات کاربران</Option>
              <Option value={3690}>اخبار کاربران</Option>
            </Select>
           
          </Form.Item>

          <Form.Item
            name="summary"
            label="خلاصه مقاله"
            rules={[
              { required: true, message: "لطفا خلاصه مقاله را وارد کنید" },
            ]}
          >
            <TextArea rows={3} placeholder="خلاصه مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item
            name="content"
            label="متن مقاله"
            rules={[{ required: true, message: "لطفا متن مقاله را وارد کنید" }]}
          >
            <TextArea rows={6} placeholder="متن مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item name="source" label="منبع">
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

      {/* Delete Article Modal */}
      <DeleteArticleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

      <style jsx global>{`
        .custom-pagination .ant-pagination-item {
          border-radius: 8px;
          margin: 0 4px;
        }
        .custom-pagination .ant-pagination-item-active {
          background-color: #d1182b;
          border-color: #d1182b;
        }
        .custom-pagination .ant-pagination-item-active a {
          color: white;
        }
        .custom-pagination .ant-pagination-item:hover {
          border-color: #d1182b;
        }
        .custom-pagination .ant-pagination-item:hover a {
          color: #d1182b;
        }
        .custom-pagination .ant-pagination-prev .ant-pagination-item-link,
        .custom-pagination .ant-pagination-next .ant-pagination-item-link {
          border-radius: 8px;
        }
        .custom-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
        .custom-pagination
          .ant-pagination-next:hover
          .ant-pagination-item-link {
          border-color: #d1182b;
          color: #d1182b;
        }

        /* Select styles */
        .custom-pagination .ant-select-selector {
          border-radius: 8px !important;
        }
        .custom-pagination .ant-select:hover .ant-select-selector {
          border-color: #d1182b !important;
        }
        .custom-pagination .ant-select-focused .ant-select-selector {
          border-color: #d1182b !important;
          box-shadow: 0 0 0 2px rgba(209, 24, 43, 0.2) !important;
        }

        /* Responsive styles - only for mobile */
        @media (max-width: 640px) {
          .custom-pagination .ant-pagination-item {
            min-width: 28px;
            height: 28px;
            line-height: 28px;
            margin: 0 2px;
          }
          .custom-pagination .ant-pagination-prev .ant-pagination-item-link,
          .custom-pagination .ant-pagination-next .ant-pagination-item-link {
            min-width: 28px;
            height: 28px;
            line-height: 28px;
          }
          .custom-pagination .ant-pagination-item a {
            padding: 0 4px;
            font-size: 12px;
          }
          .custom-pagination .ant-pagination-jump-prev,
          .custom-pagination .ant-pagination-jump-next {
            margin: 0 2px;
          }
          .custom-pagination .ant-pagination-options {
            margin-right: 8px;
          }
          .custom-pagination .ant-select-selector {
            height: 28px !important;
            line-height: 28px !important;
          }
          .custom-pagination .ant-select-selection-item {
            line-height: 28px !important;
            font-size: 12px;
          }
        }
      `}</style>

      
    </div>
  );
}
