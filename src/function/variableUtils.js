// variableUtils.js

export const extractNodeIdAndValue = (variable) => {
    let nodeId, value;
    try {
        if (typeof variable === 'string') {
            const parts = variable.split(', ').map(part => part.trim());
            nodeId = parts.find(part => part.startsWith('Node ID:'));
            value = parts.find(part => part.startsWith('Value:'));
    
            nodeId = nodeId ? nodeId.replace('Node ID: ', '') : '';
            value = value ? value.replace('Value: ', '') : '';
        } else if (typeof variable === 'object' ) {
            nodeId = variable.nodeId || '';
            value = variable.value || '';
        }
    
        return {
            nodeId: nodeId,
            value: value,
        };
    } catch (error) {
        alert('errore extractNodeIdAndValue:',error)
    }
    
};

export const findVariableByNodeId = (variables, targetNodeId) => {
    for (const variable of variables) {
        const { nodeId } = extractNodeIdAndValue(variable);
        if (nodeId === targetNodeId) {
            return variable;
        }
    }
    return null; // Ritorna null se la variabile non è stata trovata
};
