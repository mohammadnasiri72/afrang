// export const mainDomain = "http://localhost:5000/";
export const mainDomain = "https://api.afrangdigital.com";
// export const mainDomain = "https://afrangapi.aitest2.ir";
export const mainDomainImg = "https://admin.afrangdigital.com";
export const mainUrl = "https://www.afrangdigital.com";

export const getImageUrl = (image) => {
  if (!image) return null;
  try {
    if (image.startsWith("http")) {
      return image;
    }
    return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, "")}`;
  } catch (error) {
    console.error("Error processing image URL:", error);
    return null;
  }
};










