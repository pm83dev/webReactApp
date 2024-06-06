// VariableList.js
import React, { useEffect, useState } from 'react';

const VariableList = ({ variables }) => {
    const [loading, setLoading] = useState(true); // Stato per gestire il caricamento

    useEffect(() => {
        // Scorri in cima alla pagina quando il componente viene montato
        window.scrollTo(0, 0);

        // Simulazione di caricamento per dimostrazione
        setTimeout(() => {
            setLoading(false);
        }, 100); // Cambia questo valore in base alle tue esigenze
    }, []);

    if (loading) {
        return (
            <div style={{ backgroundColor: '#282b30', color: '#88c1ea', minHeight: '100vh', fontFamily: 'Korataki', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div>Caricamento...</div>
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    console.log(variables);
    return (
        <div className="container-fluid mt-5">
            <h1>Elenco delle variabili</h1>
            <div className="row">
                {variables.map((variable, index) => {
                    const [nodeId, value] = variable.split(', ').map(part => part.split(': ')[1]);
                    return (
                        <div className="col-md-3" key={index}>
                            <div className="card mb-3" style={{ backgroundColor: '#88c1ea' }}>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{nodeId}</h5>
                                    <p className="card-text">Valore: {value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VariableList;