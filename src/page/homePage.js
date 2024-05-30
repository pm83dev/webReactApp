//homePage.js
import React, { useEffect, useState } from 'react';
import CardListThermo, { handleIncrement, handleDecrement } from '../components/cardListThermo.js';
import CardListMotor from '../components/cardListMotor.js';
import CardListData from '../components/cardListData';  

const HomePage = ({ variables, zoneNr, imagePath, imagePathExt, imagePathDicer, imagePathRollfeed, imagePathAuger, imagePathShredder,enableRollfeed, enableAuger, enableShredder, imagePathPress, imagePathConsumption, die_On }) => {
    const [loading, setLoading] = useState(true);
    const [buttonStates, setButtonStates] = useState(Array(zoneNr).fill(true)); // Array di booleani per rappresentare lo stato dei pulsanti

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const handleIncrementWrapper = async (zoneIndex) => {
        await handleIncrement(variables, zoneIndex);
        // Aggiorna lo stato del pulsante corrispondente
        setButtonStates(prevStates => {
            const newStates = [...prevStates];
            newStates[zoneIndex - 1] = true; // Indice - 1 perché gli indici partono da 0
            return newStates;
        });
    };

    const handleDecrementWrapper = async (zoneIndex) => {
        await handleDecrement(variables, zoneIndex);
        // Aggiorna lo stato del pulsante corrispondente
        setButtonStates(prevStates => {
            const newStates = [...prevStates];
            newStates[zoneIndex - 1] = true; // Indice - 1 perché gli indici partono da 0
            return newStates;
        });
    };

    if (loading) {
        return (
            <div style={{ backgroundColor: '#282b30', color: '#88c1ea', minHeight: '100vh', fontFamily: 'Korataki', fontSize: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div>Loading...</div>
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
            style={{
                display: 'flex',
                gap: '20px',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            }}
        >
            <div
                style={{
                    flex: window.innerWidth <= 768 ? '1 0 100%' : '1 0 66%',
                }}
            >
                <CardListMotor
                    variables={variables}
                    imagePathExt={imagePathExt}
                    imagePathDicer={imagePathDicer}
                    imagePathRollfeed={imagePathRollfeed}
                    imagePathAuger={imagePathAuger}
                    imagePathShredder={imagePathShredder}
                    enableRollfeed={enableRollfeed}
                    enableAuger={enableAuger}
                    enableShredder={enableShredder}
                />
            </div>
            <div
                style={{
                    flex: window.innerWidth <= 768 ? '1 0 100%' : '0.4 0 33%',
                }}
            >
                <CardListData
                    variables={variables}
                    imagePathPress={imagePathPress}
                    imagePathConsumption={imagePathConsumption}
                    die_On={die_On}
                />
            </div>
        </div>
        <CardListThermo
            variables={variables}
            zoneNr={zoneNr}
            imagePath={imagePath}
            handleIncrement={handleIncrementWrapper}
            handleDecrement={handleDecrementWrapper}
            buttonStates={buttonStates}
        />
    </div>
    );
};

export default HomePage;
