// WriteVariableForm.js
import React from 'react';

const WriteVariableForm = ({ nodeId, value, setNodeId, setValue, handleWriteClick }) => {
    return (
        <div className="container mt-5">
            <h2 className="my-4">Scrivi Variabile</h2>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Node ID"
                    value={nodeId}
                    onChange={(e) => setNodeId(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleWriteClick}>Scrivi</button>
        </div>
    );
};

export default WriteVariableForm;