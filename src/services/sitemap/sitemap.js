export const getSitemap = async () => {
  try {
    const response = await fetch("https://api.afrangdigital.com/api/SiteMap", {
      method: "GET",
      headers: {
        Accept: "application/xml",
      },
      cache: "default",
      next: { revalidate: 3369600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // دریافت پاسخ به صورت متن (XML)
    const xmlText = await response.text();

    // اگر نیاز به پردازش XML دارید، می‌توانید از DOMParser استفاده کنید
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // بررسی خطای XML
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      throw new Error("Invalid XML format");
    }

    return {
      type: "success",
      xmlContent: xmlText,
      xmlDoc: xmlDoc,
    };
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
      error: err.message,
    };
  }
};
