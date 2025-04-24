import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getEstatisticasGeral = () => api.get('/estatisticas/geral');
export const getEstatisticasGrafico = () => api.get('/estatisticas/grafico');
export const getAnaliseDescricao = () => api.get('/analise/descricao');
export const getRankingEstados = () => api.get('/ranking/estados');
export const getEstatisticasEstado = (estadoId) => api.get(`/estatisticas/estado/${estadoId}`);

export default api;