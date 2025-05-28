import { api } from '../api';

export const getSettings = async () => {
    try {
        const response = await api.get('/settings');
        return response.data;
    } catch (error) {
        throw error;
    }
}; 