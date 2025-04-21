import { estadosPorRegiao } from "../../../utils/estadosPorRegiao";
import '../styles/norte.css';

const Norte = ({ onMouseEnter, onMouseLeave }) => (
  <>
    {estadosPorRegiao.norte.map((estado) => (
      <li key={estado.idLi} id={estado.idLi}>
        <a 
           href={estado.idA} 
          id={estado.idA} 
          title={estado.nome}
          onMouseEnter={(e) => onMouseEnter(estado, e)}
          onMouseLeave={onMouseLeave}
        >
          <img src="../../../assets/img/null.gif" alt={estado.idA.toUpperCase()} />
        </a>
      </li>
    ))}
  </>  
);

export default Norte;