import HeaderCard from "@/components/Card/HeaderCard";
import Container from "@/components/container";
import BodyOrder from "@/components/profile/order/BodyOrder";
import BodyPaymentFinal from "@/components/profile/order/BodyPaymentFinal";
import { getOrder } from "@/services/order/orderService";
import { cookies } from 'next/headers';

async function getOrderData(token) {
  try {
    const response = await getOrder(token);
    return response;
  } catch (error) {
    console.error('Error fetching order data:', error);
    return null;
  }
}

export default async function Order(props) {
  const prop = await props.searchParams;
  const trackCode = await prop.trackCode;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const token = userCookie ? JSON.parse(userCookie.value).token : null;

  let orderData = null;
  if (token) {
    orderData = await getOrderData(token);
  }



  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        {
          trackCode &&
          <HeaderCard />
        }
        {orderData ? (
          trackCode ? <BodyPaymentFinal trackCode={trackCode} token={token} /> :

            <BodyOrder orderData={orderData} />
        ) : (
          <div className="mt-4 text-center text-red-600">
            خطا در دریافت اطلاعات سفارش
          </div>

        )}



      </div>
    </>
  );
}
