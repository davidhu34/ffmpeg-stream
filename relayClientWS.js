const ws = require('ws')

module.exports = port => {
	let clientSockets = {}
	const clients = new ws.Server({
	    port: port,
	    perMessageDeflate: false
	})

	clients.on('connection', (socket, upgradeReq) => {
		const { socket, headers } = (updateReq || socket.upgradeReq)
		const addr = socket.remoteAddress
		clientSockets[addr] = {}
		console.log(
			'New Client Socket Connected:',addr,
			headers['user-agent'],
			'total: '+client.clients.length
		)

		socket.on('close', (code, message) => {
			delete clients[addr]
			console.log(
				'Client Socket Disconnect:',addr,
				'total: '+client.clients.length
			)
		})
	})
	
	clients.broadcast = data => {
		clients.clients.map( c => {
			if (c.readyState === ws.OPEN)
				c.send(data)
		})
	}
	return clients
}