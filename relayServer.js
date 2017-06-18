const { CLIENT_PORT, DEVICE_PORT, STREAM_SECRET } = require('./configs')

const fs = require('fs')
const http = require('http')
const ioServer = http.createServer().listen(CLIENT_PORT)
const io = require('socket.io')(ioServer)

io.on('connection', socket => {
    console.log('socket connected:', socket.id)
    socket.on('disconnect', reason => {
        console.log('socket disconnected:', socket.id, '('+reason+')')
    })
})


const source = http.createServer( (req, res) => {
    const params = req.url.substr(1).split('/')
    const { remoteAddress, remotePort } = req.socket

    if(params[0] !== STREAM_SECRET) {
        console.log('Stream Failure:',remoteAddress+':'+remotePort)
        res.end()
    }

    res.connection.setTimeout(0)
    console.log('Stream Connected:', remoteAddress+':'+remotePort)
    req.on('data', data => {
        io.sockets.emit('message', data)
    })
    req.on('end', () => {
        console.log('Stream Closed')
    })
}).listen(DEVICE_PORT)

console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:'+DEVICE_PORT+'/<secret>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+CLIENT_PORT+'/');
