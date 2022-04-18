const dgram = require('dgram')
const server = dgram.createSocket('udp4')

let numberOfCyclists = 0

server.bind({
    address: 'localhost',
    port: 8800,
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

server.on('message', async (msg, rinfo) => {
    console.log(`Server receive: ${msg} from ${rinfo.address}:${rinfo.port}`)

    numberOfCyclists++

    if (numberOfCyclists >= 5) {
        console.log(`Ciclovia com grande movimento de ciclistas.`)
        await sendMessageToServer(8801)
        await sendMessageToServer(8802)
        await sendMessageToServer(8803)

        numberOfCyclists = 0
    }
})

const sendMessageToServer = async (port) => {
    const bufferMsg = Buffer.from('Ciclovia está com bastante movimento')

    server.send(bufferMsg, 0, bufferMsg.length, port, 'localhost');
}