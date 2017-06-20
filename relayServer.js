const { CLIENT_PORT, DEVICE_PORT, STREAM_SECRET } = require('./configs')
const clients = require('./relayClientWS')(CLIENT_PORT)
const source = require('./relaySource')(DEVICE_PORT, STREAM_SECRET, clients)

console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:'+DEVICE_PORT+'/<secret>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+CLIENT_PORT+'/');
