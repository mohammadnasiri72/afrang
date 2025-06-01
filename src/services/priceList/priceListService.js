import { mainDomain } from "@/utils/mainDomain";

export const getPriceList = async (categoryId) => {
    try {
        const response = await fetch(`${mainDomain}/api/priceList/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch price list');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getPriceList:', error);
        throw error;
    }
}; 