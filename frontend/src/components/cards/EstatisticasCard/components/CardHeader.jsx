import React from 'react';

const CardHeader = ({ title, showButton, onVoltar }) => {
    return (
        <div className="card-header">
            <h2>{title}</h2>
            {showButton && (
                <button 
                    onClick={onVoltar} 
                    className="estatisticas-gerais-btn"
                >
                    Estatísticas Gerais
                </button>
            )}
        </div>
    );
};

export default CardHeader;