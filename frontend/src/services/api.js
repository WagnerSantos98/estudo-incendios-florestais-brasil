import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.RENDER_API_URL
});

export default api;