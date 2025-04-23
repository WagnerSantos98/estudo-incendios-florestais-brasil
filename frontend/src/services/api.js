import axios from 'axios';

const API_URL = 'http://localhost:5000';

class ApiService{
    //Método para obter as estatísticas gerais
    static async getEstatisticasGeral(){
        try{
            const response = await axios.get(`${API_URL}/estatisticas/geral`);
            return response.data;
        }catch(error){
            console.error("Erro ao obter estatísticas gerais:", error);
            throw error;
        }
    }

    //Método para obter dados do gráfico
    static async getEstatisticasGrafico(){
        try{
            const response = await axios.get(`${API_URL}/estatisticas/grafico`);
            return response.data;
        }catch(error){
            console.error("Erro ao obter dados para gráfico:", error);
            throw error;
        }
    }

    //Método para obter a análise descritiva dos dados
    static async getAnaliseDescricao(){
        try{
            const response = await axios.get(`${API_URL}/analise/descricao`);
            return response.data;
        }catch(error){
            console.error("Erro ao obter análise descritiva:", error);
            throw error;
        }
    }

    //Método para obter as estatísticas de um estado específico
    static async getEstatisticasPorEstado(estadoId){
        try{
            const response = await axios.get(`${API_URL}/estatisticas/estado/${estadoId}`);
            return response.data;
        }catch(error){
            console.error(`Erro ao obter estatísticas para o estado ${estadoId}:`, error);
            throw error;
        }
    }
}

export default ApiService;