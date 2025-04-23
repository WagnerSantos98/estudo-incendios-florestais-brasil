import './MapaBrasil.css';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const dadosEstados = {
    'ac': { nome: 'Acre', incêndios: 156, area: 234.5, municipios: 12 },
    'al': { nome: 'Alagoas', incêndios: 89, area: 145.2, municipios: 8 },
    'ap': { nome: 'Amapá', incêndios: 45, area: 78.9, municipios: 4 },
    'am': { nome: 'Amazonas', incêndios: 345, area: 567.8, municipios: 25 },
    'ba': { nome: 'Bahia', incêndios: 278, area: 456.7, municipios: 18 },
    'ce': { nome: 'Ceará', incêndios: 167, area: 234.5, municipios: 15 },
    'df': { nome: 'Distrito Federal', incêndios: 34, area: 45.6, municipios: 2 },
    'es': { nome: 'Espírito Santo', incêndios: 78, area: 123.4, municipios: 7 },
    'go': { nome: 'Goiás', incêndios: 189, area: 345.6, municipios: 16 },
    'ma': { nome: 'Maranhão', incêndios: 234, area: 456.7, municipios: 19 },
    'mt': { nome: 'Mato Grosso', incêndios: 456, area: 789.0, municipios: 32 },
    'ms': { nome: 'Mato Grosso do Sul', incêndios: 267, area: 456.7, municipios: 21 },
    'mg': { nome: 'Minas Gerais', incêndios: 345, area: 567.8, municipios: 28 },
    'pa': { nome: 'Pará', incêndios: 378, area: 678.9, municipios: 27 },
    'pb': { nome: 'Paraíba', incêndios: 98, area: 123.4, municipios: 9 },
    'pr': { nome: 'Paraná', incêndios: 156, area: 234.5, municipios: 14 },
    'pe': { nome: 'Pernambuco', incêndios: 123, area: 234.5, municipios: 11 },
    'pi': { nome: 'Piauí', incêndios: 145, area: 234.5, municipios: 12 },
    'rj': { nome: 'Rio de Janeiro', incêndios: 89, area: 123.4, municipios: 8 },
    'rn': { nome: 'Rio Grande do Norte', incêndios: 67, area: 98.7, municipios: 6 },
    'rs': { nome: 'Rio Grande do Sul', incêndios: 178, area: 345.6, municipios: 15 },
    'ro': { nome: 'Rondônia', incêndios: 189, area: 345.6, municipios: 16 },
    'rr': { nome: 'Roraima', incêndios: 45, area: 78.9, municipios: 4 },
    'sc': { nome: 'Santa Catarina', incêndios: 123, area: 234.5, municipios: 11 },
    'sp': { nome: 'São Paulo', incêndios: 234, area: 456.7, municipios: 19 },
    'se': { nome: 'Sergipe', incêndios: 56, area: 78.9, municipios: 5 },
    'to': { nome: 'Tocantins', incêndios: 145, area: 234.5, municipios: 12 }
};

const MapaBrasil = () => {
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);

    const handleMouseEnter = (estado) => {
        console.log('Estado selecionado:', estado.idA);
        setEstadoSelecionado(estado.idA);
    };

    const handleMouseLeave = () => {
        setEstadoSelecionado(null);
    };

    const dadosAtuais = estadoSelecionado ? dadosEstados[estadoSelecionado] : null;

    const dadosGrafico = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Incêndios por Mês',
                data: [120, 190, 300, 500, 200, 300, 400, 600, 500, 300, 200, 100],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            }
        ]
    };

    const opcoesGrafico = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Evolução Mensal de Incêndios'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return(
        <div className="mapa-container">
            <div className="mapa-wrapper">
                <ul id="map">
                    <Norte onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <Nordeste onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <CentroOeste onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <Sudeste onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <Sul onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                </ul>
            </div>
            <div className="estatisticas-wrapper">
                <div className="estatisticas-card">
                    <div className="card-header">
                        <h2>{dadosAtuais ? `Informações - ${dadosAtuais.nome}` : 'Informações Gerais'}</h2>
                    </div>
                    <div className="card-content">
                        <div className="info-section">
                            <h3>{dadosAtuais ? 'Estatísticas do Estado' : 'Estatísticas Nacionais'}</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <h4>Total de Incêndios</h4>
                                    <p>{dadosAtuais ? dadosAtuais.incêndios : '1.234'}</p>
                                </div>
                                <div className="info-item">
                                    <h4>Área Queimada</h4>
                                    <p>{dadosAtuais ? `${dadosAtuais.area} km²` : '5.678 km²'}</p>
                                </div>
                                <div className="info-item">
                                    <h4>Municípios Afetados</h4>
                                    <p>{dadosAtuais ? dadosAtuais.municipios : '15'}</p>
                                </div>
                                <div className="info-item">
                                    <h4>Média Mensal</h4>
                                    <p>{dadosAtuais ? Math.round(dadosAtuais.incêndios / 12) : '123'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grafico-container">
                            <Line data={dadosGrafico} options={opcoesGrafico} />
                        </div>
                        <div className="fonte-dados">
                            <p>Fonte: INPE - Instituto Nacional de Pesquisas Espaciais</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapaBrasil;