//homePage.js
import React, { useEffect, useState } from 'react';
import CardListMotor from '../components/cardListMotor.js';
import CardListData from '../components/cardListData';  
import CardListThermo from '../components/cardListThermo.js';
import ChartConsBar from '../components/ChartBar.js';
const HomePage = ({ variables, zoneNr, imagePath, imagePathExt, imagePathDicer, imagePathRollfeed, imagePathAuger, imagePathShredder,enableRollfeed, enableAuger, enableShredder, imagePathPress, imagePathConsumption, die_On }) => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);


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
        />
    </div>
    );
};

export default HomePage;
