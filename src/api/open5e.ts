import axios from 'axios';

const BASE_URL = 'https://api.open5e.com';

export const fetchMonsters = async (cr?: string, environments?: string[]) => {
    try {
        const response = await axios.get(`${BASE_URL}/monsters/`, {
            params: {
                document__slug__iexact: 'wotc-srd',
                ...(cr !== undefined && { cr }),
                ...(environments && { environments__icontains: environments })
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching monsters:', error);
        throw error;
    }
};
