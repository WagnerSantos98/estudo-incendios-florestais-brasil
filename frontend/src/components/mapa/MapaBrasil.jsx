import Norte from './regiao/Norte';
import Nordeste from './regiao/Nordeste';
import CentroOeste from './regiao/CentroOeste';
import Sudeste from './regiao/Sudeste';
import Sul from './regiao/Sul';

const MapaBrasil = () => {
    return(
        <ul id="map">
            <Norte/>
            <Nordeste/>
            <CentroOeste/>
            <Sudeste/>
            <Sul/>
        </ul>
    );
};

export default MapaBrasil;