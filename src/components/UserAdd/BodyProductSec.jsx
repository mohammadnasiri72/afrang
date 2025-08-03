import React from 'react'

function BodyProductSec({product}) {    
    // تابع تبدیل قیمت به فرمت قابل خواندن
    const formatPrice = (price) => {
        return new Intl.NumberFormat("fa-IR").format(price);
    };

    // تابع تبدیل تاریخ شمسی به فرمت بهتر
    const formatDate = (dateString) => {
        if (!dateString) return "نامشخص";
        return dateString;
    };

    // تابع نمایش HTML content
    const renderHTML = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#d1182b]">
                            {formatPrice(product.price)} تومان
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {product.categoryTitle}
                        </span>
                    </div>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            اطلاعات پایه
                        </h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">شماره سریال:</span>
                                <span className="text-gray-900 font-semibold">{product.serialNumber || "نامشخص"}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">نوع محصول:</span>
                                <span className="text-gray-900 font-semibold">{product.type || "نامشخص"}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">تاریخ خرید:</span>
                                <span className="text-gray-900 font-semibold">{formatDate(product.purchaseDate)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">مدت استفاده:</span>
                                <span className="text-gray-900 font-semibold">{product.usageTime || "نامشخص"}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">تعداد استفاده:</span>
                                <span className="text-gray-900 font-semibold">{product.usageCount || "نامشخص"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Warranty & Insurance */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            گارانتی و بیمه
                        </h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">گارانتی:</span>
                                <span className="text-gray-900 font-semibold">
                                    {product.warranty ? `${product.warranty} ماه` : "ندارد"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">بیمه:</span>
                                <span className="text-gray-900 font-semibold">
                                    {product.insurance ? `${product.insurance} ماه` : "ندارد"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance Description */}
                {product.appearance && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                            وضعیت ظاهری
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">{product.appearance}</p>
                        </div>
                    </div>
                )}

                {/* Detailed Description */}
                {product.body && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                            توضیحات تکمیلی
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div 
                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={renderHTML(product.body)}
                            />
                        </div>
                    </div>
                )}

                {/* Additional Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 space-x-reverse">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800 mb-1">اطلاعات تکمیلی</h4>
                            <p className="text-sm text-blue-700">
                                این محصول در دسته‌بندی <strong>{product.categoryTitle}</strong> قرار دارد و دارای شناسه <strong>{product.id}</strong> می‌باشد.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BodyProductSec