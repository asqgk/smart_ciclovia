const net = require('net')
const server = new net.Server()
const port = 8080

server.listen(port, () => {
    console.log(`Server TCP server listening for connection requests on socket localhost:${port}`)
})

server.on('connection', (socket) => {
    console.log('Client connected')

    socket.on('data', (data) => {
        console.log(`Data received: ${data.toString()}`)

        returnMessageToClient(socket)
    })

    socket.on('end', () => {
        console.log('Closing connection with the client')
    })

    socket.on('error', (err) => {
        console.log(`Error: ${err}`)
    })
})

const returnMessageToClient = (socket) => {
    const bufferMsg = Buffer.from('Entendido! Ambulância já está a caminho.')

    socket.write(bufferMsg)
}