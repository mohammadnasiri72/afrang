import TitlePaymentFinal from "./TitlePaymentFinal";
import DescPaymentFinal from "./DescPaymentFinal";
import { getOrderTrackCode } from "@/services/order/orderService";



export default async function BodyPaymentFinal({ trackCode , token}) {

    let orderDataTrackCode = null;
  if (token) {
    orderDataTrackCode = await getOrderTrackCode(trackCode , token);
    if (orderDataTrackCode.type === 'error') {
      Toast.fire({
        icon: "error",
        text: orderDataTrackCode.message,
      });
      return null;
    }
  }
   

    return (
        <>
            <div className="flex flex-wrap items-start">
                <TitlePaymentFinal orderData={orderDataTrackCode} />
                <DescPaymentFinal orderData={orderDataTrackCode} />
            </div>
        </>
    );
}
