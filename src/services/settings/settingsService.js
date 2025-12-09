import { mainDomain } from "@/utils/mainDomain";

export const getSettings = async () => {
  try {
    const res = await fetch(`${mainDomain}/api/Property/value/setting`, {
      // cache: 'no-store',
      // next: { revalidate: 60 },
      // signal: AbortSignal.timeout(3000),
      // headers: {
      //   'Cache-Control': 'no-cache, no-store, must-revalidate',
      //   'Pragma': 'no-cache',
      //   'Expires': '0'
      // }
    });

    if (!res.ok) {
      // اگر response status 503 یا خطای سرور باشد
      if (res.status >= 500) {
        return {
          type: "error",
          message: "خطای سرور - سرور در دسترس نیست",
          status: res.status,
          isHard404: false,
        };
      }

      // برای خطاهای 4xx
      return {
        type: "error",
        message: "خطا در دریافت تنظیمات",
        status: res.status,
        isHard404: res.status === 404,
      };
    }

    return res.json();
  } catch (err) {
    // برای خطاهای شبکه (قطع سرور، timeout و غیره)
    console.error("Error fetching settings:", err);

    // بررسی نوع خطا
    if (err.name === "TimeoutError" || err.name === "AbortError") {
      return {
        type: "error",
        message: "خطای شبکه - سرور در دسترس نیست",
        status: 0,
        isHard404: false,
      };
    }

    return {
      type: "error",
      message: "خطای شبکه - سرور در دسترس نیست",
      status: 0,
      isHard404: false,
    };
  }
};
export const getSettingsNoCatch = async () => {
  try {
    const res = await fetch(`${mainDomain}/api/Property/value/setting`, {
      cache: 'no-store',
      // next: { revalidate: 60 },
      // signal: AbortSignal.timeout(3000),
      // headers: {
      //   'Cache-Control': 'no-cache, no-store, must-revalidate',
      //   'Pragma': 'no-cache',
      //   'Expires': '0'
      // }
    });

    if (!res.ok) {
      // اگر response status 503 یا خطای سرور باشد
      if (res.status >= 500) {
        return {
          type: "error",
          message: "خطای سرور - سرور در دسترس نیست",
          status: res.status,
          isHard404: false,
        };
      }

      // برای خطاهای 4xx
      return {
        type: "error",
        message: "خطا در دریافت تنظیمات",
        status: res.status,
        isHard404: res.status === 404,
      };
    }

    return res.json();
  } catch (err) {
    // برای خطاهای شبکه (قطع سرور، timeout و غیره)
    console.error("Error fetching settings:", err);

    // بررسی نوع خطا
    if (err.name === "TimeoutError" || err.name === "AbortError") {
      return {
        type: "error",
        message: "خطای شبکه - سرور در دسترس نیست",
        status: 0,
        isHard404: false,
      };
    }

    return {
      type: "error",
      message: "خطای شبکه - سرور در دسترس نیست",
      status: 0,
      isHard404: false,
    };
  }
};
