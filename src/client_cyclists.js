const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.bind({
    address: 'localhost',
    port: 8000,
    exclusive: false
})

client.on("listening", () => {
    sendMessage()
})

client.on('data', (data) => {
    console.log('Received: ' + data.toString())
})

client.on('end', () => {
    console.log('disconnected from server')
})

const sendMessage = async () => {
    const bufferMsg = Buffer.from('Passou um ciclista na ciclovia.')

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000))

        console.log(`Send: ${bufferMsg}`)

        client.send(bufferMsg, 0, bufferMsg.length, 8800, 'localhost')
    }
}