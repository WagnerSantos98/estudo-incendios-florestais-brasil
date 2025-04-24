import { useState,  useEffect } from 'react';
import { regioes } from '../utils/regioes';
import { estadosPorRegiao } from '../utils/estadosPorRegiao';
import{
    getEstatisticasGeral,
    getEstatisticasGrafico,
    getAnaliseDescricao,
    getRankingEstados,
    getEstatisticasEstado
} from '../services/api';

export const useMapaBrasil = () => {
    const [currentData, setCurrentData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analiseDados, setAnaliseDados] = useState(null);
    const [estatisticasGeral, setEstatisticasGeral] = useState(null);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [estadosFiltrados, setEstadosFiltrados] = useState([]);
    const [rankingEstados, setRankingEstados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const [geralRes, graficoRes, analiseRes, rankingRes] = await Promise.all([
                    getEstatisticasGeral(),
                    getEstatisticasGrafico(),
                    getAnaliseDescricao(),
                    getRankingEstados()
                ]);

                setEstatisticasGeral(geralRes.data);
                setCurrentData(geralRes.data);
                setChartData(graficoRes.data);
                setAnaliseDados(analiseRes.data);

                //Converter o ranking para array e ordenar
                const rankingArray = Object.entries(rankingRes.data)
                    .map(([estado, total]) => ({ estado, total }))
                    .sort((a, b) => b.total - a.total);
                setRankingEstados(rankingArray);

                setLoading(false);
            }catch(error){
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //Função chamada quando o usuário seleciona uma nova região no dropdown
    const handleRegiaoChange = (e) => {
        const regiao = e.target.value;
        setRegiaoSelecionada(regiao);
        setEstadosFiltrados(regiao ? estadosPorRegiao[regiao] : []);
        setEstadoSelecionado(null);
        setChartData(estatisticasGeral);
    };
    
    //Função chamada quando o usuário seleciona um estado específico
    const handleEstadoChange = async (e) => {
        const estadoId = e.target.value;
        if(!estadoId){
            setCurrentData(estatisticasGeral);
            setEstadoSelecionado(null);
            return;
        }try{
            const response = await getEstatisticasEstado(estadoId);
            setCurrentData(response.data);
            setEstadoSelecionado(estadoId);
        }catch(error){
            console.error("Erro ao carregar dados do estado", error);
        }
    };

    //Função para retornar o título da seção com base no estado selecionado
    const getNomeEstado = () => {
        if(!estadoSelecionado) return 'Estatísticas de Incêndios';
        const estado = estadosFiltrados.find(e => e.idA === estadoSelecionado);
        return `Estatísticas de Incêndios - ${estado?.nome || ''}`;
    };

    return{
        regioes,
        currentData,
        chartData,
        loading,
        analiseDados,
        estadoSelecionado,
        regiaoSelecionada,
        estadosFiltrados,
        rankingEstados,
        handleRegiaoChange,
        handleEstadoChange,
        getNomeEstado
    }
};