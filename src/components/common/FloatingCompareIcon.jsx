"use client";

import { useSelector } from 'react-redux';
import { FaBalanceScale } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';

const FloatingCompareIcon = () => {
  const { compareItems } = useSelector((state) => state.compare);
  const router = useRouter();
  const itemCount = compareItems.length;

  const handleClick = () => {
    if (itemCount > 0) {
      const ids = compareItems.map(item => item.productId).join(',');
      router.push(`/compare/${ids}`);
    } else {
      router.push('/products');
    }
  };

  if (itemCount === 0) {
    return null; // اگر محصولی در مقایسه نباشد، آیکون نمایش داده نمی‌شود
  }

  const icon = (
    <div className="fixed bottom-40 left-6 z-[100000]">
      <button
        onClick={handleClick}
        className="relative group cursor-pointer bg-white p-2 rounded-lg flex items-center justify-center shadow border border-transparent hover:bg-[#f5f5f5] transition duration-200"
      >
        <FaBalanceScale className="text-2xl !text-[#d1182b]" />
        {/* شمارنده */}
        <div className="absolute -top-2 -right-2 bg-red-500 !text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse border-2 border-white">
          {itemCount}
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 !text-white text-xs rounded-lg px-2 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
          مقایسه {itemCount} محصول
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </button>
    </div>
  );
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(icon, document.body);
};

export default FloatingCompareIcon; 