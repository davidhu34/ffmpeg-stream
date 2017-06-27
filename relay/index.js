const clients = require('./relayClientWS')()
const source = require('./relaySource')(clients)
const { faceDetect } = require('./api')

const { SNAPSHOT_PATH } = require('./configs')
setTimeout(() => faceDetect(SNAPSHOT_PATH), 4000)
