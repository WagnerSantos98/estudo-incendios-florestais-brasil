import GraficoIncendios from '../GraficoIncendios/GraficoIncendios';
import './EstatisticasCard.css';

const EstatisticasCard = ({ currentData, chartData, analiseDados, estatisticasGeral, setCurrentData }) => {
    return(
        <div className="estatisticas-card">
            <div className="card-header">
                <h2>Estatísticas de Incêndios</h2>
            </div>
            <div className="card-content">
                {/*Seções de informações*/}
                <div className="info-section">  
                    <h3>Informações Gerais</h3>
                    <div className="info-grid">

                    </div>
                </div>

                {/*Seção de gráfico*/}
                {chartData && (
                    <div className="info-section grafico-section">
                        <h3>Gráfico de Distribuição</h3>
                        <GraficoIncendios chartData={chartData}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EstatisticasCard;