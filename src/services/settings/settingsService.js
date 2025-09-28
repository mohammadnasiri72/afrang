import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getSettings = async () => {
  try {
    const response = await axios.get(
      `${mainDomain}/api/Property/value/setting`
    );

    return response.data;
  } catch (error) {
    // throw new Error("API request failed");
  }
};
