import dynamic from 'next/dynamic';
import { getOrder } from "@/services/order/orderService";
import { cookies } from 'next/headers';
import ClearCart from './ClearCart';

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyOrder = dynamic(() => import("@/components/profile/order/BodyOrder"));
const BodyPaymentFinal = dynamic(() => import("@/components/profile/order/BodyPaymentFinal"));

const ORDER_STATUS = {
  REGISTERED: 1,     // ثبت شده
  PENDING: 2,        // منتظر پردازش
  PROCESSING: 3,     // درحال انجام
  COMPLETED: 4,      // انجام شده
  CANCELLED: 5       // لغو شده
};

export default async function Order(props) {
  const prop = await props.searchParams;
  const trackCode = await prop.trackCode;
  const statusId = await prop.statusId ? parseInt(prop.statusId) : ORDER_STATUS.REGISTERED;
  const pageIndex = await prop.page ? parseInt(prop.page) : 1;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const token = userCookie ? JSON.parse(userCookie.value).token : null;

  let orderData = null;
  if (token) {
    try {
      orderData = await getOrder(token, {
        pageSize: 10,
        pageIndex,
        statusId: statusId === ORDER_STATUS.REGISTERED ? null : statusId
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        {trackCode && <HeaderCard />}
        {orderData ? (
          trackCode ? (
            <>
              <ClearCart />
              <BodyPaymentFinal trackCode={trackCode} token={token} />
            </>
          ) : (
            <BodyOrder 
              orderData={orderData} 
              currentStatus={statusId}
              currentPage={pageIndex}
            />
          )
        ) : (
          <div className="mt-4 text-center text-red-600">
            خطا در دریافت اطلاعات سفارش
          </div>
        )}
      </div>
    </>
  );
}
