import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import ClearCart from './ClearCart';

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyOrder = dynamic(() => import("@/components/profile/order/BodyOrder"));
const BodyPaymentFinal = dynamic(() => import("@/components/profile/order/BodyPaymentFinal"));



export default async function Order(props) {
  const prop = await props.searchParams;
  const trackCode = await prop.trackCode;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const token = userCookie ? JSON.parse(userCookie.value).token : null;



  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        {trackCode && <HeaderCard />}
        {
          trackCode ? (
            <>
              <ClearCart />
              <BodyPaymentFinal trackCode={trackCode} token={token} />
            </>
          ) : (
            <BodyOrder />
          )
        }
      </div>
    </>
  );
}
