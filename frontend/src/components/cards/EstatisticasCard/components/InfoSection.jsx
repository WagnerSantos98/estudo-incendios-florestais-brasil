import React from 'react';

const InfoSection = ({ title, items }) => {
    return (
        <div className="info-section">
            <h3>{title}</h3>
            <div className="info-grid">
                {items.map((item, index) => (
                    <div key={index} className="info-item">
                        <span className="info-label">{item.label}</span>
                        <span className="info-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoSection; 