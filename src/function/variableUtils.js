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
        } else if (typeof variable === 'object' && variable !== null) {
            nodeId = variable.nodeId || '';
            value = variable.value || '';
        } else {
            throw new TypeError("Invalid variable type");
        }

        if (!nodeId) {
            console.warn("Node ID is undefined for variable:", variable);
        }
        if (!value) {
            console.warn("Value is undefined for variable:", variable);
        }

        return {
            nodeId: nodeId,
            value: value,
        };
    } catch (error) {
        console.error('Error in extractNodeIdAndValue:', error);
        console.log("Variable causing the error:", variable);
        return {
            nodeId: 'Nan',
            value: 'Nan',
        };
    }
};

export const findVariableByNodeId = (variables, targetNodeId) => {
    try {
        if (!Array.isArray(variables)) {
            throw new TypeError("Expected an array of variables");
        }

        for (const variable of variables) {
            const { nodeId } = extractNodeIdAndValue(variable);
            //console.log(variable);

            if (nodeId === targetNodeId) {
                return variable;
            }
        }
    } catch (error) {
        console.error("Error in findVariableByNodeId:", error);
        console.log("Error in findVariableByNodeId", targetNodeId);
    }
    return null; // Ritorna null se la variabile non è stata trovata
};

