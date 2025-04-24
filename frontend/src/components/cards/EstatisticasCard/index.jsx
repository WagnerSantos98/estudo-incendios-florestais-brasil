import React from 'react';
import CardHeader from './components/CardHeader';
import InfoSection from './components/InfoSection';
import DistribuicaoGrafico from '../../grafico/DistribuicaoGrafico';
import './EstatisticasCard.css';

const EstatisticasCard = ({ 
    currentData, 
    chartData, 
    analiseDados, 
    estadoSelecionado, 
    onVoltarEstatisticasGerais,
    getNomeEstado 
}) => {
    return (
        <div className="estatisticas-card">
            <CardHeader 
                title={getNomeEstado()}
                showButton={!!estadoSelecionado}
                onVoltar={onVoltarEstatisticasGerais}
            />
            <div className="card-content">
                <InfoSection 
                    title="Informações Gerais"
                    items={[
                        { label: 'Média', value: currentData?.média?.toFixed(2) || 'N/A' },
                        { label: 'Mediana', value: currentData?.mediana?.toFixed(2) || 'N/A' },
                        { label: 'Moda', value: currentData?.moda?.toFixed(2) || 'N/A' }
                    ]}
                />

                <InfoSection 
                    title="Análise dos Dados"
                    items={[
                        { 
                            label: 'Tamanho do Dataset', 
                            value: `${analiseDados?.tamanho?.linhas || 'N/A'} registros` 
                        },
                        { 
                            label: 'Valores Ausentes', 
                            value: analiseDados?.valores_ausentes?.number || 'N/A' 
                        },
                        { 
                            label: 'Registros Duplicados', 
                            value: analiseDados?.duplicados || 'N/A' 
                        }
                    ]}
                />

                {chartData && (
                    <div className="info-section grafico-section">
                        <h3>Gráfico de Distribuição</h3>
                        <div className="chart-container">
                            <DistribuicaoGrafico data={chartData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EstatisticasCard; 