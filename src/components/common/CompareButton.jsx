"use client";

import { useDispatch, useSelector } from 'react-redux';
import { addToCompare, removeFromCompare } from '@/redux/features/compareSlice';
import { message } from 'antd';
import { FaBalanceScale } from 'react-icons/fa';

const CompareButton = ({ product }) => {
  const dispatch = useDispatch();
  const { compareItems, maxItems } = useSelector((state) => state.compare);
  
  const isInCompare = compareItems.some(item => item.id === product.id);
  const isFull = compareItems.length >= maxItems && !isInCompare;

  const handleCompareToggle = () => {
    if (isInCompare) {
      dispatch(removeFromCompare(product.id));
      message.success('محصول از لیست مقایسه حذف شد');
    } else {
      if (isFull) {
        message.warning(`حداکثر ${maxItems} محصول می‌توانید برای مقایسه انتخاب کنید`);
        return;
      }
      dispatch(addToCompare(product));
      message.success('محصول به لیست مقایسه اضافه شد');
    }
  };

  return (
    <button
      onClick={handleCompareToggle}
      disabled={isFull && !isInCompare}
      className={`
        flex items-center cursor-pointer py-2 px-1 rounded-lg transition-all duration-300
        ${isInCompare 
          ? 'bg-blue-200 text-gray-700 hover:bg-blue-300' 
          : isFull 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
      title={isInCompare ? 'حذف از مقایسه' : isFull ? 'لیست مقایسه پر است' : 'افزودن به مقایسه'}
    >
      <img src="/images/icons/benchmark.png" alt="" />
      <span className="text-sm font-medium px-2">
        {isInCompare ? 'حذف از مقایسه' : 'مقایسه محصول'}
      </span>
    </button>
  );
};

export default CompareButton; 