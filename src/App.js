//App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchData, handleWrite, fetchVariables } from './function/apiFunctions';
import VariableList from './function/VariableList';
import WriteVariableForm from './components/WriteVariableForm';
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

    useEffect(() => {
        const fetchDataInterval = async () => {
            try {
                const data = await fetchData();
                setVariables(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const intervalId = setInterval(fetchDataInterval, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleWriteClick = async () => {
        try {
            await handleWrite(nodeId, value);
            const updatedVariables = await fetchVariables();
            setVariables(updatedVariables);
            alert('Valore scritto con successo');
        } catch (error) {
            alert(error.message);
        }
    };

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
                        {activeTab === 'read' && <VariableList variables={variables} />}
                        {activeTab === 'write' && (
                            <WriteVariableForm
                                nodeId={nodeId}
                                value={value}
                                setNodeId={setNodeId}
                                setValue={setValue}
                                handleWriteClick={handleWriteClick}
                            />
                        )}
                        {activeTab === 'config' && <h1 className="dashboard-title">TAB 4</h1>}
                        {activeTab === 'web' && <h1 className="dashboard-title">TAB 5</h1>}
                        {activeTab === 'cloud' && <h1 className="dashboard-title">TAB 6</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
