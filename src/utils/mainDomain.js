export const mainDomain = 'https://afrangapi.aitest2.ir'
export const mainDomainImg = 'https://afrangdigital.com'
// export const mainDomainImg = 'https://afrangadmin.aitest2.ir'

export const getImageUrl = (image) => {
    if (!image) return '';
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '';
    }
  };