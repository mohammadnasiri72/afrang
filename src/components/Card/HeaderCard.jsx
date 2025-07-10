"use client";
import { Steps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaCheckCircle, FaCreditCard, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";

function HeaderCard() {
  const router = useRouter();
  const pathname = usePathname();
  const isCompleteinfosend = pathname.includes("infosend");
  const isCompleteinfopay = pathname.includes("infopay");
  const isCompletepayment = pathname.includes("order");

 

  const handleStepClick = (step) => {
    // اگر در مرحله پرداخت هستیم، فقط اجازه برگشت به سبد خرید رو میدیم
    if (isCompletepayment && step !== 0) {
      return;
    }

    switch (step) {
      case 0:
        router.push('/cart');
        break;
      case 1:
        if (isCompleteinfopay || isCompleteinfosend || isCompletepayment) {
          router.push('/cart/infosend');
        }
        break;
      case 2:
        if (isCompleteinfopay || isCompletepayment) {
          router.push('/cart/infopay');
        }
        break;
      case 3:
        if (isCompletepayment) {
          router.push('/cart/order');
        }
        break;
    }
  };

  return (
    <>
     
      <div className="flex flex-wrap items-center justify-center py-2">
        <div className="md:w-1/2 w-full md:mt-0 mt-4">
          <Steps
            direction="horizontal"
            responsive={false}
            items={[
              {
                title: "سبد خرید",
                // description: "انتخاب و بررسی محصولات",
                status: "finish",
                icon: <FaShoppingCart className="text-red-600 text-2xl" />,
                onClick: () => handleStepClick(0),
                className: "cursor-pointer hover:opacity-80 transition-opacity"
              },
              {
                title: "اطلاعات ارسال",
                // description: "ثبت آدرس و روش ارسال",
                status: (isCompleteinfopay || isCompleteinfosend || isCompletepayment) ? "finish" : "wait",
                icon: <FaMapMarkerAlt className={`text-2xl ${(isCompleteinfosend || isCompleteinfopay || isCompletepayment) ? "text-red-600" : ""}`} />,
                onClick: () => handleStepClick(1),
                className: (isCompleteinfopay || isCompleteinfosend || isCompletepayment) && !isCompletepayment ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-not-allowed"
              },
              {
                title: "اطلاعات پرداخت",
                // description: "انتخاب روش پرداخت",
                status: (isCompleteinfopay || isCompletepayment) ? "finish" : "wait",
                icon: <FaCreditCard className={`text-2xl ${(isCompleteinfopay || isCompletepayment) ? "text-red-600" : ""}`} />,
                onClick: () => handleStepClick(2),
                className: (isCompleteinfopay || isCompletepayment) && !isCompletepayment ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-not-allowed"
              },
              {
                title: "پرداخت و اتمام",
                // description: "تکمیل و ثبت سفارش",
                status: isCompletepayment ? "finish" : "wait",
                icon: <FaCheckCircle className={`text-2xl ${isCompletepayment ? "text-red-600" : ""}`} />,
                onClick: () => handleStepClick(3),
                className: isCompletepayment ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-not-allowed"
              },
            ]}
          />
        </div>
      </div>

      <style jsx global>{`
        .ant-steps-item-title {
          font-size: 10px !important;
          margin-top: -10px !important;
          text-align: center !important;
        }
        .ant-steps-item-description {
          font-size: 10px !important;
          text-align: center !important;
          margin-top: 1px !important;
        }
        .ant-steps-item-icon {
          width: 40px !important;
          height: 40px !important;
          line-height: 40px !important;
        }
        .ant-steps-item-content {
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }
        .ant-steps-item-tail {
          top: 20px !important;
          width: 100% !important;
          padding: 0 !important;
        }
        .ant-steps-item-tail::after {
          height: 3px !important;
          width: 100% !important;
        }
        .ant-steps-item {
          flex: 1 !important;
          text-align: center !important;
        }
        .ant-steps-item:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}

export default HeaderCard;
