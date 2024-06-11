// cardListThermo.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { getThermoDataCard, } from '../function/thermoUtils';



const CardListThermo = ({ variables, zoneNr, imagePath }) => {
    

    const thermoCardsData = getThermoDataCard(variables, imagePath, zoneNr);
    //console.log('Thermo Cards Data:', thermoCardsData); // Aggiungi questo log per debug


    const createTemperatureCard = (zoneName, zoneSp, zoneReal, zoneIndex) => (
        <div key={zoneIndex} className="card mb-3 custom-card" style={{ backgroundColor: '#212121', minWidth: '115px', maxWidth: '150px', width: '150px', margin: '10px' }}>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={imagePath} style={{ width: '30px', height: '30px', display: 'block', margin: 'auto' }} alt="Motor" />
            </div>
            <div className="card-body text-dark d-flex flex-column align-items-center">
                <h5 className="card-title" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold' }}>{zoneName}</h5>
                <p className="card-text" style={{ color: '#ffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px'}}>
                    SP: {zoneSp} °C
                </p>
                <p className="card-text" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>PV: {zoneReal} °C</p>
                <div className="btn-group" role="group" aria-label="Modifica temperatura">
                </div>
            </div>
        </div>
    );

    return (
        <div  className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
            {thermoCardsData.map(({ zoneName, zoneSp, zoneReal, zoneIndex }) => 
                createTemperatureCard(zoneName, zoneSp, zoneReal, zoneIndex)
            )}
        </div>
    );
};

export default CardListThermo;