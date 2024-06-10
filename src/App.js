//App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { fetchData, handleWrite, fetchVariables } from './function/apiFunctions';
import { useMQTT} from './function/mqttFunctions';     
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

//Prove grafici
import BarChart from './components/ExampleBarChart';
import LineChart from './components/ExampleLineChart';
import TestChart from './components/TestChart';


function App() {
    
    const [loading, setLoading] = useState(true);
    const [variables, setVariables] = useState([]);
    const error = ''; 
    const [activeTab, setActiveTab] = useState('home');
    const zoneNr = 8; // Numero delle zone
    const rollfeed_on = true;
    const auger_on = true;
    const shredder_on = true;
    const dieEnable = false;
    
    const { mqttVariables, subdone } = useMQTT();

    // Aggiunto un altro useEffect per controllare subdone
    useEffect(() => {
        if (subdone) {
            setVariables(mqttVariables);
            setLoading(false); // Imposta loading a false quando subdone è true
        }
    }, [subdone,mqttVariables]);

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
                                    variables={variables}
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
                        {activeTab === 'chart' && <TestChart variables={variables}/>}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
