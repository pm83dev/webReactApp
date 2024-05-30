import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { handleWrite } from '../function/apiFunctions';

const UniversalModal = ({ variables, onHide, getCardData, idxData }) => {
    const [parameters, setParameters] = useState([]);

    useEffect(() => {
        const cardParams = getCardData(variables,idxData);
        const initialParams = cardParams.map(param => ({
            nodeId: param.nodeId,
            label: param.label,
            value: param.value,
            originalValue: param.value
        }));
        setParameters(initialParams);// eslint-disable-next-line
    }, [idxData, getCardData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const param of parameters) {
                await handleWrite(param.nodeId, param.value);
            }
            onHide();
        } catch (error) {
            alert('Error: No values changed', error.message);
            console.error("Error writing values", error);
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
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setParameters(prevParams =>
                                        prevParams.map((p, i) => i === index ? { ...p, value: newValue } : p)
                                    );
                                }}
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