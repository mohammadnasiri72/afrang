import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getLinkPaymentInfo = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/PaymentLink/${id}`);
    return response.data;
  } catch (err) {}
};
export const addLinkPaymentInfo = async (id) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/PaymentLink/Pay?id=${id}`
    );
    return response.data;
  } catch (err) {}
};

export const smsPaymentAlert = async (id) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/PaymentLink/Notify?id=${id}`
    );

    return response.response;
  } catch (err) {
    return err;
  }
};
