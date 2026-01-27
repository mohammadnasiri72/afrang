



import { mainDomain } from "@/utils/mainDomain";


export const getMenuFooter = async () => {
  try {
     const params = {
      langCode: "fa",
      menuKey: "menufooter",
    };
    
    const url = new URL(`${mainDomain}/api/Menu`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });


    const response = await fetch(url.toString(), {
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





