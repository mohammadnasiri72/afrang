import Cookies from 'js-cookie';

export const getUserCookie = () => {
  try {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    return JSON.parse(userCookie);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

export const getUserId = () => {
  const user = getUserCookie();
  return user?.userId || null;
};

export const getUserToken = () => {
  const user = getUserCookie();
  return user?.token || null;
}; 