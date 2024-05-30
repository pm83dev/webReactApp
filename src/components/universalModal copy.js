import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getMotorDataModal } from '../function/motorUtils';
import { handleWrite} from '../function/apiFunctions';




const UniversalModal = ({ motorType, variables, onHide,handleWriteClick }) => {
    const [parameters, setParameters] = useState([]);

    useEffect(() => {
        const motorParams = getMotorDataModal(variables, motorType);
        const initialParams = motorParams.map(param => ({
            nodeId: param.nodeId,
            label: param.label,
            value: param.value,
            originalValue: param.value
        }));
        setParameters(initialParams);// eslint-disable-next-line
    }, [motorType]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const param of parameters) {
                console.log(param.nodeId, param.value);
                // Non chiamare handleWrite qui
            }
            // Chiamata a handleWrite solo dopo che l'utente ha inviato il modulo
            for (const param of parameters) {
                await handleWrite(param.nodeId, param.value);
            }
            onHide();
            //alert('Values updated');
        } catch (error) {
            alert('Error:No values changed', error.message);
            console.error("Error writing values", error);
            // Gestione degli errori
            // Mostra un messaggio di errore all'utente
        }
    };

    return (
        <Modal show={true} onHide={onHide} dialogClassName="modal-dialog-centered modal-dialog-scrollable">
            <Modal.Header style={{ background: '#88c1ea' }} closeButton>
                <Modal.Title style={{fontSize:'28px', fontFamily: 'Korataki'}}>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#88c1ea', color: '#333' }}>
                <form onSubmit={handleFormSubmit}>
                    {parameters.map((param, index) => (
                        <div key={index} className="form-group">
                            <label>{param.label}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={param.originalValue}
                                //value={param.value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^\d*$/.test(newValue) || newValue === '') {
                                        const updatedParams = parameters.map((p, i) => i === index ? { ...p, value: newValue } : p);
                                        setParameters(updatedParams);
                                        console.log(newValue);
                                    } else {
                                        console.log("Invalid input: not a number");
                                        alert('Only numbers accepted');
                                    }
                                }}
                                pattern="[0-9]*"
                            />
                        </div>
                    ))}
                    <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer style={{ background: '#88c1ea' }}>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UniversalModal;
