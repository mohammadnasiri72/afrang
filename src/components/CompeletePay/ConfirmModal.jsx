import { useState, useEffect } from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />
      <div 
        className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100"
        style={{
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-[#d1182b] cursor-pointer text-white rounded-lg transition-colors"
          >
            تایید
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
}

export default ConfirmModal; 