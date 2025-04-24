import React from 'react';
import Selectors from '../Selectors';
import './EstadosMenu.css';

const EstadosMenu = ({ 
    regiaoSelecionada, 
    estadoSelecionado, 
    estadosFiltrados, 
    onRegiaoChange, 
    onEstadoChange 
}) => {
    return (
        <div className="estados-menu">
            <h3>Selecione um Estado</h3>
            <Selectors
                regiaoSelecionada={regiaoSelecionada}
                estadoSelecionado={estadoSelecionado}
                estadosFiltrados={estadosFiltrados}
                onRegiaoChange={onRegiaoChange}
                onEstadoChange={onEstadoChange}
            />
        </div>
    );
};

export default EstadosMenu; 