const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.bind({
    address: '192.168.5.16',
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
        await new Promise(resolve => setTimeout(resolve, 6000))

        console.log(`Send: ${bufferMsg}`)

        client.send(bufferMsg, 0, bufferMsg.length, 8800, '192.168.5.17')

        let simulate_acident = Math.floor(Math.random() * 6)

        if(simulate_acident == 3){
            const net = require('net');
            const client = new net.Socket();

            client.connect(8080, '127.0.0.1', () => {
                console.log('Connected from Ambulance Station Server');

                const message = Buffer.from('Ocorreu um acidente!')
                console.log(`Send: ${message}`);

                client.write(message);
            });

            client.on('data', (data) => {
                console.log('Received: ' + data.toString());
                client.end();
            })

            client.on('end', () => {
                console.log('Disconnected from Ambulance Station Server');
            })
        }
    }
}

