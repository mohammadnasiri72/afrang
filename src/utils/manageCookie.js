import Cookies from 'js-cookie';
import { store } from '@/redux/store';
import { setUser } from '@/redux/slices/userSlice';

/**
 * Reads user data from cookie and syncs it with Redux store
 * @returns {Object|null} User data from cookie or null if not found
 */
export const syncUserCookieWithRedux = () => {
    try {
        const userCookie = Cookies.get('user');
        
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            // Update Redux store with user data
            store.dispatch(setUser(userData));
            return userData;
        }
        
        return null;
    } catch (error) {
        console.error('Error syncing user cookie with Redux:', error);
        return null;
    }
};

/**
 * Generates a random user ID
 * @returns {string} Random user ID
 */
export const generateRandomUserId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Creates initial user data structure
 * @returns {Object} Initial user data
 */
export const createInitialUserData = () => {
    return {
        token: "",
        refreshToken: "",
        expiration: "",
        userId: generateRandomUserId(),
        displayName: "",
        roles: [],
    };
};

/**
 * Resets user data in both cookie and Redux store
 */
export const resetUserData = () => {
    const initialData = createInitialUserData();
    Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
    store.dispatch(setUser(initialData));
};
