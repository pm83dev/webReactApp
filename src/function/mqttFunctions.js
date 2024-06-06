import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export const useMQTT = () => {
  const [mqttVariables, setmqttVariables] = useState([]);
  const [subdone, setSubdone] = useState(false);
  const brokerUrl = 'wss://1aaffbeccd5041228b92873ea14d8087.s1.eu.hivemq.cloud:8884/mqtt';
  const clientId = 'PlasmacMqtt';
  const username = 'PlasmacMqtt';
  const password = 'Plasmac2017';

  useEffect(() => {
    const client = mqtt.connect(brokerUrl, {
      clientId: clientId,
      username: username,
      password: password,
      tls: true
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('plasmac/#', (err) => {
        if (!err) {
          //console.log('Subscribed to topic plasmac/#');
          setSubdone(true);
        } else {
          console.error('Error subscribing to topic:', err);
        }
      });
    });

    client.on('message', (topic, message) => {
      const messageStr = message.toString();
      const startIndex = messageStr.indexOf('Value:');
      const nodeID = messageStr.substring(9, startIndex - 2); // Estrae il Node ID
      const valueStr = messageStr.substring(startIndex).trim(); // Estrae e trimma il valore
      const formattedMessage = `Node ID: ${nodeID}, ${valueStr}`; // Formatta il messaggio
    
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
   
    client.on('error', (err) => {
      //console.error('MQTT Client Error:', err);
    });

    client.on('reconnect', () => {
      //console.log('MQTT Client Reconnecting');
    });

    client.on('close', () => {
      //console.log('MQTT Client Disconnected');
      setSubdone(false);
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, [brokerUrl, clientId, username, password]);

  //console.log('useMQTT result:', { mqttVariables, subdone });

  return {mqttVariables,subdone};
};
