//cardListData.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { extractNodeIdAndValue, findVariableByNodeId } from '../function/variableUtils'; // Importa le funzioni

const CardListData = ({ variables, imagePathPress, imagePathConsumption,die_On }) => {
    
    
    //#endregion

    // Array di oggetti che rappresentano i dati dei motori
    const varData = [
        {
            pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'bar_screen')).value,
            imagePath: imagePathPress,
            um: 'bar',
            desc:'Screen'
        },
        {
            pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_kWh')).value,
            imagePath: imagePathConsumption,
            um: 'kWh',
            desc:'Total'
        },
        {
            pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_kW_Heating')).value,
            imagePath: imagePathConsumption,
            um: 'kW',
            desc:'Heating'

        },
        {
            pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_Kw_ist_inverter')).value,
            imagePath: imagePathConsumption,
            um: 'kW',
            desc:'Inverter'
        }

    ];

    if (die_On) {
        varData.push({
            pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'bar_die')).value,
            imagePath: imagePathPress,
            um: 'bar',
            desc:'Die'
        });
    }


    // Funzione per creare una singola carta motore
    const createDataCard = (pvValue, imagePath, key, um, desc) => (
        <div key={key} className="card mb-3 custom-card" 
        style={{ backgroundColor: '#212121', padding: '10px', display: 'flex',maxHeight:'220px', minWidth: '100px', maxWidth: '100px',marginRight:'5px' ,marginLeft:'5px', margin: '0 auto',marginTop: '20px', alignItems: 'center' }}>
                    <img src={imagePath} style={{ width: '35px', height: '35px', display: 'block', marginBottom: 'auto' }} alt="Motor" />
                    <div className="progressSmall" style={{ '--percentage': `${pvValue}`, '--color': '#6ace3f', marginTop: '10px', textAlign:'center'}}>
                        <div className="number" style={{ color: '#6ace3f', fontSize: '15px', fontWeight: 'bold' }}>{pvValue}</div>{/* */}
                    </div>
                    <section><div className="number" style={{ color: '#6ace3f', fontSize: '16px', fontWeight:'bold', marginTop:'5px', textAlign:'center'}}>{um}</div>
                    <p style={{ color: '#6ace3f', fontSize: '14px', marginTop:'10px', marginBottom:'auto', textAlign:'center'}}>{desc}</p>
                    </section>
                    
        </div>
    );

    // Crea le carte per tutti i motori nell'array varData
    const dataCards = varData.map((device, index) => createDataCard(device.pv,device.imagePath, index, device.um, device.desc));

    // Restituisci tutte le carte dei motori
    return (
        <div className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
            {dataCards}
        </div>
    );
};

export default CardListData;
