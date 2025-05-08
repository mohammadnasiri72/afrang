'use client';

import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleGoToCart = () => {
    router.push('/card');
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="success-modal"
      width={400}
    >
      <div className="flex flex-col items-center p-6">
        <FaCheckCircle className="text-6xl text-green-500 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">محصول با موفقیت به سبد خرید اضافه شد</h3>
        <p className="text-gray-600 mb-6">آیا مایل به ادامه فرآیند خرید هستید؟</p>
        
        <div className="flex gap-4 w-full">
          <button
            onClick={handleGoToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-[#d1182b] text-white py-2 rounded-lg hover:bg-[#40768c] transition-all duration-300 cursor-pointer"
          >
            <FaShoppingCart />
            <span>رفتن به سبد خرید</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          >
            <span>ادامه خرید</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal; 