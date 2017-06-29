const ws = require('ws')

const { CLIENT_PORT } = require('./configs')

let clientSockets = {}
const clients = new ws.Server({
    port: CLIENT_PORT,
    perMessageDeflate: false
})
console.log('Serving Stream on ws://127.0.0.1:'+CLIENT_PORT)


clients.on('connection', (client, upgradeReq) => {
	const { socket, headers } = (upgradeReq || socket.upgradeReq)
	const addr = socket.remoteAddress
	clientSockets[addr] = {}
	console.log(
		'New Client Socket Connected:',addr,
		headers['user-agent'],
		'total: '+clients.clients.size
	)

	client.on('close', (code, message) => {
		delete clients[addr]
		console.log(
			'Client Socket Disconnect:',addr,
			'total: '+clients.clients.length
		)
	})
})

clients.broadcast = data => {
	clients.clients.forEach( c => {
		if (c.readyState === ws.OPEN)
			c.send(data)
	})
}

module.exports = clients
