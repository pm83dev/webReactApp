//cardListThermo.js

import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap'; // Importa il componente Modal da Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleWrite } from '../function/apiFunctions';
import { extractNodeIdAndValue } from '../function/variableUtils'; // Importa le funzioni
//import { layouts } from 'chart.js';

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
    const [editingIndex, setEditingIndex] = useState(null);
    const [newSpValue, setNewSpValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentZoneName, setCurrentZoneName] = useState('');
    const [currentSp, setCurrentSp] = useState('');
    const [refreshKey, setRefreshKey] = useState(0); // Stato per forzare l'aggiornamento del componente
    const handleSpClick = (zoneIndex, zoneName, zoneSp) => {
        setEditingIndex(zoneIndex);
        setNewSpValue('');
        setShowModal(true);
        setCurrentZoneName(zoneName);
        setCurrentSp(zoneSp);

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (newSpValue !== '' && !isNaN(parseFloat(newSpValue))) {
            await handleWrite(`machine_current.zone_sp[${editingIndex}]`, newSpValue);
            setEditingIndex(null);
            setShowModal(false);
        } else {
            console.log('Invalid value:', newSpValue);
        }
    };

    const createTemperatureCard = (zoneName, zoneSp, zoneReal, zoneIndex) => (
        <div key={zoneIndex} className="card mb-3 custom-card" style={{ backgroundColor: '#212121', minWidth:'115px', maxWidth:'150px' , width: '150px', margin: '10px' }}>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={imagePath} style={{ width: '30px', height: '30px', display: 'block', margin: 'auto' }} alt="Motor" />
            </div>
            <div className="card-body text-dark d-flex flex-column align-items-center">
                <h5 className="card-title" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold' }}>{zoneName}</h5>
                <p className="card-text" style={{ color: '#88c1ea', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', cursor: 'pointer' }}>
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

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-dialog-centered modal-dialog-scrollable"
                style={{ backgroundColor:'transparent' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                    <label className="form-label" style={{fontSize: '24px'}}>New Value - {currentZoneName}</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <input type="text" 
                    className="form-control"  
                    placeholder={currentSp}
                    value={newSpValue}
                    onChange={(e) => setNewSpValue(e.target.value)}
                    style={{ fontSize: '24px', padding: '5px', margin:'auto' }}
                    />                
                </div>
                </form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#88c1ea' }}>
                <Button variant="primary" onClick={handleFormSubmit} style={{ fontSize: '18px', padding: '5px',}}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    const cards = [];
    for (let i = 1; i <= zoneNr; i++) {
        const zoneSpVar = variables.find(variable => variable.includes(`machine_current.zone_sp[${i}]`));
        const zoneRealVar = variables.find(variable => variable.includes(`ZoneMngControl[${i}].ZoneReal`));

        const zoneSpParsed = extractNodeIdAndValue(zoneSpVar || '');
        const zoneRealParsed = extractNodeIdAndValue(zoneRealVar || '');

        const zoneName = `Zone ${i}`;
        const zoneSp = typeof zoneSpParsed.value === 'string' ? parseFloat(zoneSpParsed.value).toFixed(0) : 'N/A';
        const zoneReal = typeof zoneRealParsed.value === 'string' ? parseFloat(zoneRealParsed.value).toFixed(0) : 'N/A';

        cards.push(createTemperatureCard(zoneName, zoneSp, zoneReal, i));
    }

    return (
        <div key={refreshKey} className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
            {cards}
        </div>
    );
};

export default CardListThermo;
