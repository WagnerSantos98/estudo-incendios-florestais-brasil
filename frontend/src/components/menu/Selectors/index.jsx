import React from 'react';
import { regioes } from '../../../utils/constants';
import './Selectors.css';

const Selectors = ({ 
    regiaoSelecionada, 
    estadoSelecionado, 
    estadosFiltrados, 
    onRegiaoChange, 
    onEstadoChange 
}) => {
    return (
        <div className="select-container">
            <select 
                value={regiaoSelecionada} 
                onChange={onRegiaoChange}
                className="select-regiao"
            >
                <option value="">Selecione uma região</option>
                {regioes.map(regiao => (
                    <option key={regiao.id} value={regiao.id}>
                        {regiao.nome}
                    </option>
                ))}
            </select>

            <select 
                value={estadoSelecionado || ''} 
                onChange={onEstadoChange}
                className="select-estado"
                disabled={!regiaoSelecionada}
            >
                <option value="">Selecione um estado</option>
                {estadosFiltrados.map(estado => (
                    <option key={estado.idA} value={estado.idA}>
                        {estado.idA} - {estado.nome}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selectors; 