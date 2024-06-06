// cardListThermo.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleWrite } from '../function/apiFunctions';
import { extractNodeIdAndValue } from '../function/variableUtils'; 
import { getThermoDataCard, } from '../function/thermoUtils';
import UniversalModal from './universalModal';

export const handleIncrement = async (variables, zoneIndex, setRefreshKey) => {
    const zoneSpVar = variables.find(variable => variable.includes(`machine_current.zone_sp[${zoneIndex}]`));
    const { value } = extractNodeIdAndValue(zoneSpVar);

    if (value !== undefined && !isNaN(parseFloat(value))) {
        const newValue = parseFloat(value) + 1;
        await handleWrite(`machine_current.zone_sp[${zoneIndex}]`, newValue.toString());
        setRefreshKey(prevKey => prevKey + 1);
    } else {
        console.log('Invalid value:', value);
    }
};

export const handleDecrement = async (variables, zoneIndex, setRefreshKey) => {
    const zoneSpVar = variables.find(variable => variable.includes(`machine_current.zone_sp[${zoneIndex}]`));
    const { value } = extractNodeIdAndValue(zoneSpVar);
    if (value !== undefined && !isNaN(parseFloat(value))) {
        const newValue = parseFloat(value) - 1;
        await handleWrite(`machine_current.zone_sp[${zoneIndex}]`, newValue.toString());
        setRefreshKey(prevKey => prevKey + 1);
    } else {
        console.log('Invalid value:', value);
    }
};

const CardListThermo = ({ variables, zoneNr, imagePath }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedZoneNr, setSelectedZoneNr] = useState(null);

    const thermoCardsData = getThermoDataCard(variables, imagePath, zoneNr);
    //console.log('Thermo Cards Data:', thermoCardsData); // Aggiungi questo log per debug

    const handleCardClick = (zoneIndex) => {
        setSelectedZoneNr(zoneIndex);
        setShowModal(true);
    };

    const [refreshKey, setRefreshKey] = useState(0);

    const createTemperatureCard = (zoneName, zoneSp, zoneReal, zoneIndex) => (
        <div key={zoneIndex} className="card mb-3 custom-card" style={{ backgroundColor: '#212121', minWidth: '115px', maxWidth: '150px', width: '150px', margin: '10px' }}>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={imagePath} style={{ width: '30px', height: '30px', display: 'block', margin: 'auto' }} alt="Motor" />
            </div>
            <div className="card-body text-dark d-flex flex-column align-items-center">
                <h5 className="card-title" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold' }}>{zoneName}</h5>
                <p className="card-text" style={{ color: '#ffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', cursor: 'pointer' }}onClick={() => handleCardClick(zoneIndex)}>
                    SP: {zoneSp} °C
                </p>
                <p className="card-text" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>PV: {zoneReal} °C</p>
                <div className="btn-group" role="group" aria-label="Modifica temperatura">
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg decrement-btn"
                        onClick={() => handleDecrement(variables, zoneIndex, setRefreshKey)}
                        style={{ fontSize: '16px', padding: '10px 20px' }}
                    >
                        -
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg increment-btn"
                        onClick={() => handleIncrement(variables, zoneIndex, setRefreshKey)}
                        style={{ fontSize: '16px', padding: '10px 20px' }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div key={refreshKey} className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
            {thermoCardsData.map(({ zoneName, zoneSp, zoneReal, zoneIndex }) => 
                createTemperatureCard(zoneName, zoneSp, zoneReal, zoneIndex)
            )}
            {showModal && (
                <UniversalModal
                    idxData={selectedZoneNr}
                    variables={variables}
                    onHide={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default CardListThermo;