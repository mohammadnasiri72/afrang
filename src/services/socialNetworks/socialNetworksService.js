import { api } from '../api';

export const getSocialNetworks = async () => {
    try {
        const response = await api.get('/social-networks');
        return response.data;
    } catch (error) {
        throw error;
    }
}; 