import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getMotorDataCard} from '../function/motorUtils'
import UniversalModal from './universalModal';

const CardListMotor = ({ variables, imagePathExt, imagePathDicer, imagePathRollfeed, imagePathAuger, imagePathShredder, enableRollfeed, enableAuger, enableShredder }) => {
    
    
    const [showModal, setShowModal] = useState(false);
    //const [selectedMotorType, setSelectedMotorType] = useState(null);
    const imagePaths = {
        ext: imagePathExt,
        dicer: imagePathDicer,
        rollfeed: imagePathRollfeed,
        auger: imagePathAuger,
        shredder: imagePathShredder
    };

    const motorCardsData = getMotorDataCard(variables, imagePaths, enableRollfeed, enableAuger, enableShredder);

    /*
    const handleCardClick = (motorType) => {
        setSelectedMotorType(motorType);
        setShowModal(true);
    };
    */
    
    const createMotorCard = (motor, key) => (
        <div
            key={key}
            className="card mb-3 custom-card"
            style={{ backgroundColor: '#212121', padding: '10px', display: 'flex', maxHeight: '160px', minWidth: '280px', maxWidth: '290px', margin: '0 auto', marginTop: '20px', alignItems: 'center', cursor: 'pointer' }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'left', width: '100px' }}>
                    <img src={motor.imagePath} style={{ width: '80px', height: '51px', display: 'block' }} alt="Motor" />
                    <div className="progressSmall" style={{ '--percentage': `${motor.pv}`, '--color': '#88c1ea', marginTop: '5px' }}>
                        <div className="number" style={{ color: '#88c1ea', fontSize: '18px', fontWeight: 'bold' }}>{motor.pv}%</div>
                    </div>
                </div>
                <div style={{ flex: 1, color: '#88c1ea', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', width: '150px' }}> 
                    <p className="card-text" style={{color:'#ffff'}}>SP: {motor.sp} %</p>
                    <p className="card-text">PV: {motor.pv} %</p>
                    <p className="card-text">Current: {motor.current} A</p>
                </div>
            </div>
        </div>
    );

const motorCards = motorCardsData.map((motor, index) => createMotorCard(motor, index));

return (
    <div className="container-fluid mt-5 d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#333' }}>
        {motorCards}
        {showModal && (
                <UniversalModal
                //idxData={selectedMotorType}
                variables={variables}
                onHide={() => setShowModal(false)}
                
                />
            )}
    </div>
);
};

export default CardListMotor;
