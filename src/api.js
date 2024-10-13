import axios from 'axios';

const fetchData = async (query = null) => {
    try {
        let response;
        if (query) {
            response = await axios.post(`${process.env.REACT_APP_API_URL}/data`, { query });
        } else {
            response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export default fetchData;
