import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL
});

export const getEstatisticasGeral = async () => {
    const response = await api.get('/estatisticas/geral');
    return response.data;
};

export const getEstatisticasGrafico = async () => {
    const response = await api.get('/estatisticas/grafico');
    return response.data;
};

export const getAnaliseDescricao = async () => {
    const response = await api.get('/analise/descricao');
    return response.data;
};

export const getEstatisticasEstado = async (estadoId) => {
    const response = await api.get(`/estatisticas/estado/${estadoId}`);
    return response.data;
}; 