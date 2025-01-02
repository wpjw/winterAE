import axios from 'axios';

const BASE_URL = 'https://api.open5e.com';

export const fetchMonsters = async (cr?: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/monsters/`, {
            params: {
                document__slug__iexact: 'wotc-srd',
                ...(cr !== undefined && { cr }),
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching monsters:', error);
        throw error;
    }
};
