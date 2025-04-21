import { estadosPorRegiao } from "../../../utils/estadosPorRegiao";
import '../styles/sul.css';

const Sul = ({ onMouseEnter, onMouseLeave }) => (
  <>
    {estadosPorRegiao.sul.map((estado) => (
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

export default Sul;