const { CLIENT_IO_PORT } = require('./configs')
const io = require('socket.io')(CLIENT_IO_PORT)

io.on('connection', socket => {
	console.log('Socket Connected:', socket.id)
	socket.on('disconnect', () => {
		console.log('Socket Disconnected:', socket.id)
	})
})

server.listen(CLIENT_IO_PORT)

module.exports = io
