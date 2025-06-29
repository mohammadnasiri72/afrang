"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare, clearCompare } from '@/redux/features/compareSlice';
import { getImageUrl } from '@/utils/mainDomain';
import { message } from 'antd';
import { FaTrash, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const ComparePage = () => {
  const dispatch = useDispatch();
  const { compareItems } = useSelector((state) => state.compare);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCompare(productId));
    message.success('محصول از مقایسه حذف شد');
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    message.success('تمام محصولات از مقایسه حذف شدند');
  };

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="text-center z-50 relative">
          <div className="text-6xl text-gray-300 mb-4">⚖️</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">لیست مقایسه خالی است</h1>
          <p className="text-gray-500 mb-6">محصولاتی را برای مقایسه انتخاب کنید</p>
          <Link 
            href="/products" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  // ویژگی‌های قابل مقایسه
  const comparisonFields = [
    { key: 'image', label: 'تصویر', type: 'image' },
    { key: 'title', label: 'نام محصول', type: 'text' },
    { key: 'price', label: 'قیمت', type: 'price' },
    { key: 'brand', label: 'برند', type: 'text' },
    { key: 'category', label: 'دسته‌بندی', type: 'text' },
    { key: 'description', label: 'توضیحات', type: 'text' },
    { key: 'rating', label: 'امتیاز', type: 'rating' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">مقایسه محصولات</h1>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash className="text-sm" />
            حذف همه
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    ویژگی
                  </th>
                  {compareItems.map((item, index) => (
                    <th key={item.id} className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b relative">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="absolute top-2 left-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                      <div className="text-xs text-gray-500 mb-2">محصول {index + 1}</div>
                      <div className="font-medium">{item.title || item.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">
                      {field.label}
                    </td>
                    {compareItems.map((item) => (
                      <td key={`${item.id}-${field.key}`} className="px-4 py-3 text-center">
                        {field.type === 'image' ? (
                          <div className="flex justify-center">
                            <Image
                              src={getImageUrl(item.image) || '/images/placeholder.jpg'}
                              alt={item.title || item.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ) : field.type === 'price' ? (
                          <div className="text-lg font-bold text-green-600">
                            {item.price ? `${item.price.toLocaleString()} تومان` : 'نامشخص'}
                          </div>
                        ) : field.type === 'rating' ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{item.rating || 'نامشخص'}</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            {item[field.key] || 'نامشخص'}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage; 