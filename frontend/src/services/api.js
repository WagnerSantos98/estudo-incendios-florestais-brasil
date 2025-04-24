import axios from 'axios';

const api = axios.create({
    baseURL: process.env.RENDER_APP_API_URL
});

export const getEstatisticasGeral = () => api.get('/estatisticas/geral');
export const getEstatisticasGrafico = () => api.get('')

export default api;