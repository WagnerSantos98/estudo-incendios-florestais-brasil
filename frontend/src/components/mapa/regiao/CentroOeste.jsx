import { estadosPorRegiao } from "../../../utils/estadosPorRegiao";
import '../styles/centroOeste.css';

const CentroOeste = ({ onMouseEnter, onMouseLeave }) => (
  <>
    {estadosPorRegiao.centroOeste.map((estado) => (
      <li key={estado.idLi} id={estado.idLi}>
        <a 
          href="#" 
          id={estado.idA} 
          title={estado.nome}
          onMouseEnter={(e) => onMouseEnter(estado, e)}
          onMouseLeave={onMouseLeave}
        >
          <img src="../../assets/img/null.gif" alt={estado.idA.toUpperCase()} />
        </a>
      </li>
    ))}
  </>  
);

export default CentroOeste;