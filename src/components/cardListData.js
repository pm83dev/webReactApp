//cardListData.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { extractNodeIdAndValue, findVariableByNodeId } from '../function/variableUtils'; // Importa le funzioni

const CardListData = ({ variables, imagePathPress, imagePathConsumption,die_On }) => {
    
    
    //#region Data Variables
    
    const barDie = findVariableByNodeId(variables, 'bar_die');
    const barScreen = findVariableByNodeId(variables, 'bar_screen');
    const kwTotal = findVariableByNodeId(variables, 'Total_kWh');
    const kwHeating = findVariableByNodeId(variables, 'Total_kW_Heating');
    const kwInverter = findVariableByNodeId(variables, 'Total_Kw_ist_inverter');
    

    const barScreenParsed = extractNodeIdAndValue(barScreen || '');
    const barDieParsed = extractNodeIdAndValue(barDie || '');
    const kwTotalParsed = extractNodeIdAndValue(kwTotal || '');
    const kwHeatingParsed = extractNodeIdAndValue(kwHeating || '');
    const kwInverterParsed = extractNodeIdAndValue(kwInverter || '');

    const barScreenValue = typeof barScreenParsed.value === 'string' ? parseFloat(barScreenParsed.value).toFixed(0) : 'N/A';
    const barDieValue = typeof barDieParsed.value === 'string' ? parseFloat(barDieParsed.value).toFixed(0) : 'N/A';
    const kwTotalValue = typeof kwTotalParsed.value === 'string' ? parseFloat(kwTotalParsed.value).toFixed(0) : 'N/A';
    const kwheatingValue = typeof kwHeatingParsed.value === 'string' ? parseFloat(kwHeatingParsed.value).toFixed(0) : 'N/A';
    const kwInverterValue = typeof kwInverterParsed.value === 'string' ? parseFloat(kwInverterParsed.value).toFixed(0) : 'N/A';
    
    //#endregion

    // Array di oggetti che rappresentano i dati dei motori
    const varData = [
        {
            pv: barScreenValue,
            imagePath: imagePathPress,
        },
        {
            pv: kwTotalValue,
            imagePath: imagePathConsumption,
        },
        {
            pv: kwheatingValue,
            imagePath: imagePathConsumption,
        },
        {
            pv: kwInverterValue,
            imagePath: imagePathConsumption,
        }

    ];

    if (die_On) {
        varData.push({
            pv: barDieValue,
            imagePath: imagePathPress,
        });
    }


    // Funzione per creare una singola carta motore
    const createDataCard = (pvValue, imagePath, key) => (
        <div key={key} className="card mb-3 custom-card" 
        style={{ backgroundColor: '#212121', padding: '10px', display: 'flex',maxHeight:'160px', minWidth: '100px', maxWidth: '100px', margin: '0 auto',marginTop: '20px', alignItems: 'center' }}>
                    <img src={imagePath} style={{ width: '35px', height: '35px', display: 'block', marginBottom: '10px' }} alt="Motor" />
                    <div className="progressSmall" style={{ '--percentage': `${pvValue}`, '--color': '#6ace3f', marginTop: '5px', textAlign:'center'}}>
                        <div className="number" style={{ color: '#6ace3f', fontSize: '15px', fontWeight: 'bold' }}>{pvValue}</div>{/* */}
                    </div>
        </div>
    );

    // Crea le carte per tutti i motori nell'array varData
    const dataCards = varData.map((device, index) => createDataCard(device.pv,device.imagePath, index));

    // Restituisci tutte le carte dei motori
    return (
        <div className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
            {dataCards}
        </div>
    );
};

export default CardListData;
