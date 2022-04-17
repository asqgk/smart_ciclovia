const dgram = require('dgram')
const server = dgram.createSocket('udp4')

let numberOfCyclists = 0

server.bind({
    address: 'localhost',
    port: 8800,
    exclusive: false
})

server.on('error', (err) => {
    console.log(`Server UDP error:\n${err.stack}`)
    server.close()
})

server.on('listening', () => {
    const address = server.address()
    console.log(`Server UDP listening ${address.address}:${address.port}`)
})

server.on('message', (msg, rinfo) => {
    console.log(`Server UDP receive ${msg} from ${rinfo.address}:${rinfo.port}`)

    if (numberOfCyclists >= 5) {
        // const bufferMsg = Buffer.from('Ciclovia está com bastante movimento')

        console.log('Ciclovia está com bastante movimento');

        // server.send(bufferMsg, 0, message.length, 8000, 'localhost');

        numberOfCyclists = 0
    }

    numberOfCyclists++
})