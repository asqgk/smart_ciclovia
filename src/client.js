// const net = require('net');
// const client = new net.Socket()
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// const port = 8000
let numberOfServerMessages = 0

// client.connect(port, '127.0.0.1', () => {
//     console.log('Connected')

//     awaitTimeAndSendMessageToServer()
// })

client.on("listening", () => {
    sendMessage()
})

client.bind({
    address: 'localhost',
    port: 8000,
    exclusive: false
})

client.on('data', (data) => {
    console.log('Received: ' + data.toString())

    numberOfServerMessages--

    if (numberOfServerMessages == 0)
        client.end()
})

client.on('end', () => {
    console.log('disconnected from server')
})

const sendMessage = async () => {
    const bufferMsg = Buffer.from('Passou um ciclista na ciclovia.')
    const server = 8080

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 7000))

        client.send(bufferMsg, 0, bufferMsg.length, server, 'localhost')

        console.log(`Send: ${bufferMsg}`)

        // client.write(bufferMsg)

        numberOfServerMessages++
    }
}

// const awaitTimeAndSendMessageToServer = async () => {
//     const bufferMsg = Buffer.from('Passou um ciclista na ciclovia.')
//     const seconds = 8000

//     while (true) {
//         await new Promise(resolve => setTimeout(resolve, seconds))

//         console.log(`Send: ${bufferMsg}`)

//         client.write(bufferMsg)

//         numberOfServerMessages++
//     }
// }










