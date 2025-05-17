import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useCookie(key) {
    const [value, setValue] = useState(() => {
        const cookie = Cookies.get(key);
        return cookie ? JSON.parse(cookie) : null;
    });

    useEffect(() => {
        const originalSetItem = Cookies.set;

        Cookies.set = function () {
            const result = originalSetItem.apply(this, arguments);
            const event = new Event('cookieChange');
            document.dispatchEvent(event);
            return result;
        };

        const handleChange = () => {
            const newValue = Cookies.get(key);
            setValue(newValue ? JSON.parse(newValue) : null);
        };

        document.addEventListener('cookieChange', handleChange);

        return () => {
            document.removeEventListener('cookieChange', handleChange);
            Cookies.set = originalSetItem;
        };
    }, [key]);

    return value;
} 