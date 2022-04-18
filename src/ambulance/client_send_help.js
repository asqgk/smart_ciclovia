const net = require('net');
const client = new net.Socket();

client.connect(8080, '127.0.0.1', () => {
    console.log('Connected');

    sendMessage()
});

client.on('data', (data) => {
    console.log('Received: ' + data.toString());
    client.end();
})

client.on('end', () => {
    console.log('disconnected from server');
})

function sendMessage() {
    const message = Buffer.from('Ocorreu um acidente!')
    console.log(`Send: ${message}`);

    client.write(message);
}