const net = require('net')
const server = new net.Server()
const port = 8081

server.listen(port, () => {
    console.log(`Server listening for connection requests on socket localhost:${port}`)
})

server.on('connection', (socket) => {
    console.log('Ambulance station connected')

    socket.on('data', (chunk) => {
        console.log(`Received: ${chunk.toString()}`)

        const bufferMsg = Buffer.from('Estou a caminho.')

        socket.write(bufferMsg);
    })

    socket.on('end', () => {
        console.log('Closing connection with the Ambulance Station')
    })

    socket.on('error', (err) => {
        console.log(`Error: ${err}`)
    })
})
