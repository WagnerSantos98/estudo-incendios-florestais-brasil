import { useState, useEffect } from 'react';
import ApiService from '../../../services/ApiService';

export const useMapaBrasilData = () => {
    const [currentData, setCurrentData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analiseDados, setAnaliseDados] = useState(null);
    const [estatisticasGeral, setEstatisticasGeral] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const [geralRes, graficoRes, analiseRes] = await Promise.all([
                    ApiService.getEstatisticasGeral(),
                    ApiService.getEstatisticasGrafico(),
                    ApiService.getAnaliseDescricao()
                ]);

                setEstatisticasGeral(geralRes);
                setCurrentData(geralRes);
                setChartData(graficoRes);
                setAnaliseDados(analiseRes);

                setLoading(false);
            }catch(error){
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return{
        currentData,
        chartData,
        loading,
        analiseDados,
        estatisticasGeral,
        setCurrentData
    };
};
