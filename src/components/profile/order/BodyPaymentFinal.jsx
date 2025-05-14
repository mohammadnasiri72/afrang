import TitlePaymentFinal from "./TitlePaymentFinal";
import DescPaymentFinal from "./DescPaymentFinal";
import { getOrderTrackCode } from "@/services/order/orderService";

async function getOrderTrackCodeData(trackCode , token) {
    try {
      const response = await getOrderTrackCode(trackCode , token);
      return response;
    } catch (error) {
      console.error('Error fetching order data:', error);
      return null;
    }
  }

export default async function BodyPaymentFinal({ trackCode , token}) {

    let orderDataTrackCode = null;
  if (token) {
    orderDataTrackCode = await getOrderTrackCodeData(trackCode , token);
  }
    // const estimateData = useSelector((state) => state.payment.estimateData);
    // const router = useRouter();
    // useEffect(() => {
    //     if (!estimateData) {
    //         router.push("/card");
    //     }
    // }, [estimateData, router]);

    // if (!estimateData) {
    //     return null;
    // }


    return (
        <>
            <div className="flex flex-wrap items-start">
                <TitlePaymentFinal orderData={orderDataTrackCode} />
                <DescPaymentFinal orderData={orderDataTrackCode} />
            </div>
        </>
    );
}
