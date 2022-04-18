const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.bind({
    address: 'localhost',
    port: 8802,
    exclusive: false
})

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`)
    server.close()
})

server.on('listening', () => {
    const address = server.address()
    console.log(`Server listening ${address.address}:${address.port}`)
})

server.on('message', (msg, rinfo) => {
    console.log(`Server receive ${msg} from ${rinfo.address}:${rinfo.port}`)

    // const bufferMsg = Buffer.from('Second Car: OK!')

    // server.send(bufferMsg, 0, bufferMsg.length, 8800, 'localhost');
})