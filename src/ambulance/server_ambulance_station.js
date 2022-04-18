const net = require('net')
const server = new net.Server()
const port = 8080

server.listen(port, () => {
    console.log(`Server listening for connection requests on socket localhost:${port}`)
})

server.on('connection', (socket) => {
    console.log('Client connected')

    communicateToAmbulanceServer(socket)

    socket.on('data', (data) => {
        console.log(`Data received: ${data.toString()}`)
    })

    socket.on('end', () => {
        console.log('Closing connection with the client')
    })

    socket.on('error', (err) => {
        console.log(`Error: ${err}`)
    })
})

function communicateToAmbulanceServer(socket) {
    const ambulance_socket = new net.Socket();
    const ambulance_port = 8081

    socket.on('data', (chunk) => {
        ambulance_socket.connect(ambulance_port, 'localhost', () => {
            console.log(`Send data to Ambulance on localhost:${ambulance_port}`);

            const bufferMsg = Buffer.from(chunk.toString())
            ambulance_socket.write(bufferMsg);

            ambulance_socket.on('data', (content) => {
                console.log(`Data received from Ambulance: ${content.toString()}`);

                socket.write(content.toString());
                ambulance_socket.end();
            })

            ambulance_socket.on('end', function () {
                console.log('Closing connection with the Ambulance');
            })

            ambulance_socket.on('error', function (err) {
                console.log(`Error: ${err}`);
            })
        });
    })
}