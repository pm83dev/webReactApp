import { useState, useEffect, useRef } from "react";
import mqtt from "mqtt";

export const useMQTT = () => {
  const [mqttVariables, setmqttVariables] = useState([]);
  const [subdone, setSubdone] = useState(false);
  const brokerUrl = 'wss://1aaffbeccd5041228b92873ea14d8087.s1.eu.hivemq.cloud:8884/mqtt';
  const clientId = 'xxxxxxxxxxx';
  const username = 'xxxxxxxxxxx';
  const password = 'xxxxxxxxxxx';
  const clientRef = useRef(null); // Usiamo un ref per memorizzare il client MQTT

  const connectMQTT = () => {
    const client = mqtt.connect(brokerUrl, {
      clientId: clientId,
      username: username,
      password: password,
      tls: true,
      keepalive: 60,//60
      reconnectPeriod:0,//2000
      connectTimeout: 60 * 1000,//60 * 1000
      clean: true
    });

    clientRef.current = client; // Memorizziamo il client MQTT nel ref

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('plasmac/#', (err) => {
        if (!err) {
          console.log('Subscribed to topic plasmac/#');
          setSubdone(true);
        } else {
          console.error('Error subscribing to topic:', err);
        }
      });
    });

    client.on('message', (topic, message) => {
      const messageStr = message.toString();
      //console.log(messageStr);
      const startIndex = messageStr.indexOf('Value:');
      const nodeID = messageStr.substring(9, startIndex - 2); // Estrae il Node ID
      const valueStr = messageStr.substring(startIndex).trim(); // Estrae e trimma il valore
      const formattedMessage = `Node ID: ${nodeID}, ${valueStr}`; // Formatta il messaggio
      //console.log(`Received message on topic ${topic}: ${message.toString()}`)

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
      console.error('MQTT Client Error:', err);
    });

    client.on('reconnect', () => {
      console.log('MQTT Client Reconnecting');
    });

    client.on('close', (err) => {
      console.log(`MQTT Client Disconnected: ${err ? err.message : 'Clean disconnect'}`);
      setSubdone(false);
    });

    client.on('offline', () => {
      console.log('Client is offline');
    });
  };

  useEffect(() => {
    connectMQTT(); // Avvia la connessione MQTT all'avvio del componente

    // Avvia l'intervallo per riconnettere MQTT ogni X secondi
    const reconnectInterval = setInterval(() => {
      connectMQTT();
    }, 5000); // Riconnette ogni 5 secondi

    // Pulisce l'intervallo quando il componente viene smontato
    return () => clearInterval(reconnectInterval);
  }, []);

  return { mqttVariables, subdone, client: clientRef.current };
};
