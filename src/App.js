//App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { fetchData, handleWrite, fetchVariables } from './function/apiFunctions';
import { useMQTT} from './function/mqttFunctions';   
import VariableList from './function/VariableList';
import Navbar from './components/Navbar';
import HomePage from './page/homePage';
import Thermo from './images/temp60x.png';
import Extruder from './images/extruder_icon.png';
import Dicer from './images/dicer_icon.png';
import Rollfeed from './images/rollfeed_icon.png';
import Auger from './images/auger_icon.png';
import Shredder from './images/shredder_icon.png';
import PressIcon from './images/Press_icon_green.png';
import ConsIcon from './images/consump_icon.png';


function App() {
    const [variables, setVariables] = useState([]);
    const [nodeId, setNodeId] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const zoneNr = 8; // Numero delle zone
    const rollfeed_on = true;
    const auger_on = true;
    const shredder_on = true;
    const dieEnable = false;

    const { mqttVariables, subdone } = useMQTT();
    // Popola lo stato `variables` con i dati MQTT all'avvio del componente
    useEffect(() => {
        const fetchDataInterval = async () => {
        try {
            if (mqttVariables && Object.keys(mqttVariables).length > 0) {
            setVariables(mqttVariables); // Imposta le variabili MQTT nello stato
            //console.log('mqttvariables', mqttVariables);
            console.log('variables', mqttVariables);
            } else {
            console.log('mqttVariables is undefined or empty');
            }
        } catch (error) {
            setError(error.message);
        }
        };
    
        const intervalId = setInterval(fetchDataInterval, 1000); // Richiama la funzione ogni 5 secondi
    
        return () => clearInterval(intervalId); // Pulisce l'intervallo quando il componente viene smontato
    }, [mqttVariables,variables]); // Assicurati di includere mqttVariables come dipendenza per il useEffect
  
    // Aggiunto un altro useEffect per controllare subdone
    useEffect(() => {
        if (subdone) {
            setLoading(false); // Imposta loading a false quando subdone è true
        }
    }, [subdone]);

    //console.log(mqttVariables);
    //console.log(variables);

    if (loading) {
        return (
            <>
                <div style={{ backgroundColor: '#282b30', color: '#88c1ea', minHeight: '100vh', fontFamily: 'Korataki',fontSize: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div>Loading...</div>
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
        <>
        <div style={{ backgroundColor: '#282b30', color: 'red', minHeight: '100vh', fontFamily: 'Korataki', fontSize: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div>WARNING: {error}</div>
                <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Error...</span>
                </div>  
        </div>
        </>
        );

    
    }

    

    return (
        <div style={{ backgroundColor: '#282b30', color: '#fff', minHeight: '100vh' }}>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="container-fluid mt-5 pt-3">
                <div className="row">
                    <div className="col-md-12">
                        {activeTab === 'home' && (
                            <div>
                                <h1 className="dashboard-title">PLASMAC Dashboard</h1>
                                <HomePage
                                    variables={mqttVariables}
                                    zoneNr={zoneNr}
                                    imagePath={Thermo} // Percorso dell'immagine
                                    imagePathExt={Extruder}
                                    imagePathDicer ={Dicer}
                                    imagePathRollfeed ={Rollfeed}
                                    imagePathAuger ={Auger}
                                    imagePathShredder = {Shredder}
                                    enableRollfeed = {rollfeed_on}
                                    enableAuger = {auger_on}
                                    enableShredder = {shredder_on}
                                    imagePathPress = {PressIcon}
                                    imagePathConsumption = {ConsIcon}
                                    die_On = {dieEnable}
                                    
                                />
                            </div>
                        )}
                        {activeTab === 'read' && <VariableList variables={mqttVariables} />}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
