import { getOrderTrackCode } from "@/services/order/orderService";
import Swal from "sweetalert2";
import DescPaymentFinal from "./DescPaymentFinal";
import TitlePaymentFinal from "./TitlePaymentFinal";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

export default async function BodyPaymentFinal({ trackCode, token }) {
  let orderDataTrackCode = null;
  if (token) {
    orderDataTrackCode = await getOrderTrackCode(trackCode, token);
    if (orderDataTrackCode.type === "error") {
      Toast.fire({
        icon: "error",
        text: orderDataTrackCode.message,
        customClass: {
          container: "toast-modal",
        },
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
