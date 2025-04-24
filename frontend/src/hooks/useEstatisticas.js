import { useState, useEffect } from 'react';
import { getEstatisticasGeral, getEstatisticasGrafico, getAnaliseDescricao, getEstatisticasEstado } from '../services/api';

export const useEstatisticas = () => {
    const [currentData, setCurrentData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analiseDados, setAnaliseDados] = useState(null);
    const [estatisticasGeral, setEstatisticasGeral] = useState(null);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [geralRes, graficoRes, analiseRes] = await Promise.all([
                    getEstatisticasGeral(),
                    getEstatisticasGrafico(),
                    getAnaliseDescricao()
                ]);

                setEstatisticasGeral(geralRes);
                setCurrentData(geralRes);
                setChartData(graficoRes);
                setAnaliseDados(analiseRes);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEstadoSelecionado = async (estadoId) => {
        if (estadoId) {
            try {
                const response = await getEstatisticasEstado(estadoId);
                setCurrentData(response);
                setEstadoSelecionado(estadoId);
            } catch (error) {
                console.error('Erro ao carregar dados do estado:', error);
            }
        } else {
            setCurrentData(estatisticasGeral);
            setEstadoSelecionado(null);
        }
    };

    return {
        currentData,
        chartData,
        loading,
        analiseDados,
        estadoSelecionado,
        handleEstadoSelecionado,
        setEstadoSelecionado,
        estatisticasGeral
    };
}; 