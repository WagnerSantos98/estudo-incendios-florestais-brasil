import { useState } from 'react';

const CardEstado = ({ estado, posicao }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div
      className="card-estado"
      style={{
        display: mostrar ? 'block' : 'none',
        position: 'absolute',
        top: posicao.top,
        left: posicao.left,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 10000,
      }}
    >
      <h3>{estado.nome}</h3>
      <p>Sigla: {estado.idA.toUpperCase()}</p>
    </div>
  );
};

export default CardEstado; 