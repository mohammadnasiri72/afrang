import { mainDomain } from "@/utils/mainDomain";

export const getSettings = async () => {
  try {
    const res = await fetch(`${mainDomain}/api/Property/value/setting`, {
      // revalidate هر 60 ثانیه
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch settings");
    }

    return res.json();
  } catch (err) {
    // console.error("Error fetching settings:", error);
    // return null;
    const responseData = err.response?.data;
    const isHard404 =
      typeof responseData === "string" &&
      (responseData.includes("<!DOCTYPE") ||
        responseData.includes("<html") ||
        responseData.includes("Not Found") ||
        responseData.includes("HTTP Error") ||
        responseData.includes("<!DOCTYPE HTML PUBLIC")); 
   

    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
      status: err.response?.status,
      isHard404
    };
  }
};
