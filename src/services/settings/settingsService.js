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
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};
