import { mainDomain } from "@/utils/mainDomain";

export const getSettings = async () => {
  try {
    const response = await fetch(`${mainDomain}/api/Property/value/setting`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching settings:", err);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getSettingsNoCatch = async () => {
  try {
    const response = await fetch(`${mainDomain}/api/Property/value/setting`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching settings:", err);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};