import axios from 'axios';

export const fetchResources = async (resources, itemsPerPage, itemsToSkip) => {
    try {
        const response = await axios.get(`https://dummyjson.com/${resources}?limit=${itemsPerPage}&skip=${itemsToSkip}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching resources: ${error}`);
        throw error;
    }
}
