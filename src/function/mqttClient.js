import mqtt from 'mqtt';

const brokerUrl = 'wss://1aaffbeccd5041228b92873ea14d8087.s1.eu.hivemq.cloud:8884/mqtt';
const clientId = 'PlasmacMqtt';
const username = 'PlasmacMqtt';
const password = 'Plasmac2017';

export const client = mqtt.connect(brokerUrl, {
  clientId: clientId,
  username: username,
  password: password,
  tls: true,
  keepalive: 60,
  reconnectPeriod: 2000,
  connectTimeout: 60 * 1000,
  clean: false
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('plasmac/#', (err) => {
    if (!err) {
      console.log('Subscribed to topic plasmac/#');
    } else {
      console.error('Error subscribing to topic:', err);
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
});

client.on('offline', () => {
  console.log('Client is offline');
});

client.on('disconnect', (packet) => {
  console.log(`MQTT Client Disconnect: ${packet ? packet.reasonCode + ' - ' + packet.properties.reasonString : 'Unknown reason'}`);
});
