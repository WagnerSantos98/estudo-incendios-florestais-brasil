import './MapaBrasil.css';
import './EstatisticasCard.css';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { renderApiUrl } from '../../services/api';
import { estadosPorRegiao } from '../../utils/estadosPorRegiao';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const API_URL = renderApiUrl;

const regioes = [
    { id: 'norte', nome: 'Norte' },
    { id: 'nordeste', nome: 'Nordeste' },
    { id: 'centroOeste', nome: 'Centro-Oeste' },
    { id: 'sudeste', nome: 'Sudeste' },
    { id: 'sul', nome: 'Sul' }
];

const MapaBrasil = () => {
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
            try {
                const [geralRes, graficoRes, analiseRes, rankingRes] = await Promise.all([
                    renderApiUrl.get(`${API_URL}/estatisticas/geral`),
                    renderApiUrl.get(`${API_URL}/estatisticas/grafico`),
                    renderApiUrl.get(`${API_URL}/analise/descricao`),
                    renderApiUrl.get(`${API_URL}/ranking/estados`)
                ]);

                setEstatisticasGeral(geralRes.data);
                setCurrentData(geralRes.data);
                setChartData(graficoRes.data);
                setAnaliseDados(analiseRes.data);

                // Converter o ranking para array e ordenar
                const rankingArray = Object.entries(rankingRes.data)
                    .map(([estado, total]) => ({ estado, total }))
                    .sort((a, b) => b.total - a.total);
                setRankingEstados(rankingArray);

                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRegiaoChange = (e) => {
        const regiao = e.target.value;
        setRegiaoSelecionada(regiao);
        if (regiao) {
            setEstadosFiltrados(estadosPorRegiao[regiao]);
        } else {
            setEstadosFiltrados([]);
        }
        setEstadoSelecionado(null);
        setCurrentData(estatisticasGeral);
    };

    const handleEstadoChange = async (e) => {
        const estadoId = e.target.value;
        if (estadoId) {
            try {
                const response = await renderApiUrl.get(`${API_URL}/estatisticas/estado/${estadoId}`);
                setCurrentData(response.data);
                setEstadoSelecionado(estadoId);
            } catch (error) {
                console.error('Erro ao carregar dados do estado:', error);
            }
        } else {
            setCurrentData(estatisticasGeral);
            setEstadoSelecionado(null);
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribuição Anual de Incêndios',
            },
        },
    };

    const data = chartData ? {
        labels: Object.keys(chartData),
        datasets: [
            {
                label: 'Número de Incêndios',
                data: Object.values(chartData),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    } : null;

    const getNomeEstado = () => {
        if (!estadoSelecionado) return 'Estatísticas de Incêndios';
        const estado = estadosFiltrados.find(e => e.idA === estadoSelecionado);
        return `Estatísticas de Incêndios - ${estado?.nome || ''}`;
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

   

    return (
        <div className="mapa-wrapper">
            <div className="estatisticas-card">
                <div className="card-header">
                    <h2>{getNomeEstado()}</h2>
                    {estadoSelecionado && (
                        <button onClick={() => {
                            setEstadoSelecionado(null);
                            setCurrentData(estatisticasGeral);
                        }} className="estatisticas-gerais-btn">
                            Voltar para Estatísticas Gerais
                        </button>
                    )}
                </div>
                <div className="card-content">
                    <div className="info-section">
                        <h3>Informações Gerais</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Média:</span>
                                <span className="info-value"> {currentData?.média?.toFixed(2) || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mediana:</span>
                                <span className="info-value"> {currentData?.mediana?.toFixed(2) || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Moda:</span>
                                <span className="info-value"> {currentData?.moda?.toFixed(1) || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Análise dos Dados</h3>
                        <div className="info-grid">
                        <div className="info-item">
  <span className="info-label">Visualização Inicial:</span>
  <table className="tabela-visualizacao-inicial">
    <thead>
      <tr>
        <th>#</th>
        <th>Ano<br />  <span>(year)</span></th>
        <th>Estado<br/> <span>(state)</span></th>
        <th>Mês<br/> <span>(month)</span></th>
        <th>Número<br/> <span>(number)</span></th>
        <th>Data<br/> <span>(date)</span></th>
      </tr>
    </thead>
    <tbody>
      {analiseDados?.visualizacao_inicial?.map((linha, index) => (
        <tr key={index}>
          <td>{linha.id}</td>
          <td>{linha.year}</td>
          <td>{linha.state}</td>
          <td>{linha.month}</td>
          <td>{linha.number}</td>
          <td>{linha.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


                            <div className="info-item">
                                <span className="info-label">Valores ausentes por coluna:</span>
                                <div className="info-value">
    {analiseDados?.valores_ausentes ? (
      <table className="tabela-valores-ausentes">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {Object.entries(analiseDados.valores_ausentes).map(([chave, valor]) => (
            <tr key={chave}>
              <td>{chave}</td>
              <td>{valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      'N/A'
    )}
  </div>

                            </div>
                            <div className="info-item">
                                <span className="info-label">Tamanho do Dataset: (linhas, colunas)</span><br></br>
                                <span className="info-value"> {analiseDados?.tamanho?.linhas || 'N/A'}, {analiseDados?.tamanho?.colunas || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Registros Duplicados:</span>
                                <span className="info-value"> {analiseDados?.duplicados !== undefined ? analiseDados.duplicados : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {data && (
                        <div className="info-section grafico-section">
                            <h3>Gráfico de Distribuição</h3>
                            <div className="chart-container">
                                <Bar options={options} data={data} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mapa-container">
                <div className="estados-menu">
                    <h3>Selecione um Estado</h3>
                    
                    <div className="select-container">
                        <select 
                            value={regiaoSelecionada} 
                            onChange={handleRegiaoChange}
                            className="select-regiao"
                        >
                            <option value="">Selecione uma região</option>
                            {regioes.map(regiao => (
                                <option key={regiao.id} value={regiao.id}>
                                    {regiao.nome}
                                </option>
                            ))}
                        </select>

                        <select 
                            value={estadoSelecionado || ''} 
                            onChange={handleEstadoChange}
                            className="select-estado"
                            disabled={!regiaoSelecionada}
                        >
                            <option value="">Selecione um estado</option>
                            {estadosFiltrados.map(estado => (
                                <option key={estado.idA} value={estado.idA}>
                                   {estado.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                
            </div>

            {/* Card Fonte de Dados (Direito Inferior) */}
            <div className="ranking-card">
                <h3>Ranking de Estados</h3>
                <div className="ranking-list">
                    {rankingEstados.slice(0, 5).map((item, index) => (
                        <div key={item.estado} className="ranking-item">
                            <span className="ranking-position">{index + 1}º</span>
                            <span className="ranking-estado">{item.estado}</span>
                            <span className="ranking-total">{item.total.toLocaleString()} incêndios</span>
                        </div>
                    ))}
                </div>
            </div>

      {/* Card Fonte de Dados (Direito Inferior) */}
      <div className="fonte-dados-card">
        <h3>Fonte de Dados</h3>
        <div className="fonte-dados-content">
          <ul>
            <li>Fonte principal: <span>Kaggle</span></li>
            <li>Dados referentes ao período de 10 anos: <span>1998 a 2017</span></li>
            <li>Dados coletados através do: <span>Sistema Brasileiro de Informações Florestais</span></li>
          </ul>
        </div>
      </div>
        </div>
    );
};

export default MapaBrasil;