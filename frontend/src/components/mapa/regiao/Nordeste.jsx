import { estadosPorRegiao } from "../../../utils/estadosPorRegiao";

const Nordeste = () => (
  <>
    {estadosPorRegiao.nordeste.map((estado) => {
      <li key={estado.idLi} id={estado.idLi}>
        <a href="#" id={estado.idA} title={estado.nome}>
          {estado.idA.toUpperCase}
        </a>
      </li>
    })}
  </>  
);

export default Nordeste;