'use client';

import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaShoppingCart, FaStore } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="success-modal"
      width={320}
      maskClosable={false}
    >
      <div className="flex flex-col items-center p-4">
        <FaCheckCircle className="text-4xl text-green-500 mb-3" />
        <h3 className="text-base font-semibold text-gray-800 mb-1 text-center">محصول به سبد خرید اضافه شد</h3>
        
        <div className="flex gap-2 w-full mt-4">
          <button
            onClick={handleGoToCart}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#d1182b] !text-white py-1.5 px-3 rounded-md hover:bg-red-700 transition-colors text-sm cursor-pointer"
          >
            <FaShoppingCart className="text-sm" />
            <span>سبد خرید</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 text-gray-600 py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm border border-gray-200 cursor-pointer"
          >
            <span>ادامه خرید</span>
            <FaStore className="text-sm" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal; 