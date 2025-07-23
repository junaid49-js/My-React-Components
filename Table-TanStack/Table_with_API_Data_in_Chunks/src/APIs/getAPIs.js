import axios from 'axios';

export const fetchResources = async (resources, itemsPerPage, itemsToSkip, query = '') => {
    try {
        const API_URL = query ? `https://dummyjson.com/${resources}/search?q=${query}&limit=${itemsPerPage}&skip=${itemsToSkip}` : `https://dummyjson.com/${resources}?limit=${itemsPerPage}&skip=${itemsToSkip}`
        console.log(API_URL)
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(`Error fetching resources: ${error}`);
        throw error;
    }
}
