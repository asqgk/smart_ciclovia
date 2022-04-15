const dgram = require('dgram');
const server = dgram.createSocket('udp4');


server.bind({
    address: 'localhost',
    port: 8080,
    exclusive: false
});

server.on('error', (err) => {
    console.log(`Server UDP error:\n${err.stack}`);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server UDP listening ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`Server UDP receive ${msg} from ${rinfo.address}:${rinfo.port}`);
});