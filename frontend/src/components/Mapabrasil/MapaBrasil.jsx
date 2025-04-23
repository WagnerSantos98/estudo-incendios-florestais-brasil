import { useMapaBrasilData } from './hooks/useMapaBrasilData';
import EstatisticasCard from '../EstatisticasCard/EstatisticasCard';
import FiltroRegiao from '../FiltrosRegiao/FiltrosRegiao';
import FonteDados from '../FonteDados/FonteDados';
import './MapaBrasil.css';

const MapaBrasil = () => {
    const{
        currentData,
        chartData,
        loading,
        analiseDados,
        estatisticasGeral,
        setCurrentData
    } = useMapaBrasilData();

    if(loading){
        return <div>Carregando...</div>
    }

    return(
        <div className="mapa-wrapper">
            <EstatisticasCard
                currentData={currentData}
                chartData={chartData}
                analiseDados={analiseDados}
                estatisticasGeral={estatisticasGeral}
                setCurrentData={setCurrentData}
            />

            <div className="mapa-container">
                <FiltroRegiao
                    setCurrentData={setCurrentData}
                />
            </div>

            <FonteDados/>
        </div>
    );
};

export default MapaBrasil;