//apiFunctions.js

import axios from 'axios';

// Definisci l'URL del tuo server
const serverUrl = 'http://192.168.11.150:3000';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${serverUrl}/api/read`);
        return response.data;
    } catch (error) {
        //alert ("Error fetching data:", error)
        console.error("Error fetching data:", error);
        throw new Error('Error retrieving data from HTTP server');
    }
};

export const handleWrite = async (nodeId, value) => {
    if (!nodeId || !value) {
        throw new Error('ID and Value field are mandatory');
    }

    try {
        await axios.post(`${serverUrl}/api/write`, { nodeId, value });
        return true;
    } catch (error) {
        //alert ("Error writing value:", error);
        console.error("Error writing value:", error);
        throw new Error('Error writing values');
    }
};

export const fetchVariables = async () => {
    try {
        const response = await axios.get(`${serverUrl}/api/read`);
        return response.data;
    } catch (error) {
        //alert ("Error fetching variables:", error);
        console.error("Error fetching variables:", error);
        throw new Error('Error retrieving variables');
    }
};

