export const mainDomain = 'https://afrangapi.aitest2.ir'
export const mainDomainImg = 'https://afrangadmin.aitest2.ir'
export const mainDomainImg2 = 'https://afrangdigital.com'

export const getImageUrl = (image) => {
  if (!image) return null;
  try {
    if (image.startsWith('http')) {
      return image;
    }
    return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return null;
  }
};

export const getImageUrl2 = (image) => {
  if (!image) return null;
  try {
    if (image.startsWith('http')) {
      return image;
    }
    return `${mainDomainImg2}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return null;
  }
};