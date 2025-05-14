import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }) {
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />
      <div 
        className="relative bg-white rounded-lg p-4 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100 opacity-100"
        style={{
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{message}</p>
        </div>
        <div className="flex justify-center gap-2">
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
}

export default ConfirmModal; 