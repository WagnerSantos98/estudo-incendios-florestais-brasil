import { useState, useEffect } from 'react';
import ApiService from '../../../services/ApiService';
import { estadosPorRegiao } from '../../../utils/estadosPorRegiao';

export const useMapaBrasilData = () => {
    const [currentData, setCurrentData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analiseDados, setAnaliseDados] = useState(null);
    const [estatisticasGeral, setEstatisticasGeral] = useState(null);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [estadosFiltrados, setEstadosFiltrados] = useState([]);

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

    const handleRegiaoChange = (regiao) => {
        setRegiaoSelecionada(regiao);
        if(regiao){
            setEstadosFiltrados(estadosPorRegiao[regiao]);
        }else{
            setEstadosFiltrados([]);
        }
        setEstadoSelecionado(null);
        setCurrentData(estatisticasGeral);
    }

    const handleEstadoChange = async (estadoId) => {
        if(estadoId){
            try{
                const response = ApiService.getEstatisticasPorEstado();
                setCurrentData(response.data);
                setEstadoSelecionado(estadoId);
            }catch(error){
                console.error("Erro ao carregar dados do estado:", error);
            }
        }else{
            setCurrentData(estatisticasGeral);
            setEstadoSelecionado(null);
        }
    }

    return{
        currentData,
        chartData,
        loading,
        analiseDados,
        estatisticasGeral,
        estadoSelecionado,
        estadosFiltrados,
        regiaoSelecionada,
        setCurrentData,
        setEstadoSelecionado,
        handleRegiaoChange,
        handleEstadoChange
    };
};
