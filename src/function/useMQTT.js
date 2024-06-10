import { useState, useEffect } from 'react';
import { client } from './mqttClient';

export const useMQTT = () => {
  const [mqttVariables, setmqttVariables] = useState([]);
  const [subdone, setSubdone] = useState(false);

  useEffect(() => {
    client.on('message', (topic, message) => {
      const messageStr = message.toString();
      const startIndex = messageStr.indexOf('Value:');
      const nodeID = messageStr.substring(9, startIndex - 2); // Estrae il Node ID
      const valueStr = messageStr.substring(startIndex).trim(); // Estrae e trimma il valore
      const formattedMessage = `Node ID: ${nodeID}, ${valueStr}`; // Formatta il messaggio
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      
      setmqttVariables(prevVariables => {
        // Verifica se l'elemento con lo stesso Node ID è già presente nell'array
        const existingIndex = prevVariables.findIndex(variable => variable.startsWith(`Node ID: ${nodeID}`));
        if (existingIndex !== -1) {
          // Se esiste già un elemento con lo stesso Node ID, aggiorna il suo valore
          const updatedVariables = [...prevVariables];
          updatedVariables[existingIndex] = formattedMessage;
          return updatedVariables;
        } else {
          // Altrimenti, aggiungi il nuovo messaggio all'array
          return [...prevVariables, formattedMessage];
        }
      });
    });

    client.on('connect', () => {
      setSubdone(true);
    });

    client.on('close', () => {
      setSubdone(false);
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  return { mqttVariables, subdone };
};
