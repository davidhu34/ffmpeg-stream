const fs = require('fs')
const express = require('express')

const clientWS = require('./relayClientWS')

const { DEVICE_PORT, SNAPSHOT_PATH } = require('./configs')

const app = express()

app.post('/stream', (req, res) => {
    const { remoteAddress, remotePort } = req.socket

    res.connection.setTimeout(0)
    console.log('Stream Connected:', remoteAddress+':'+remotePort)
    req.on('data', data => {
        clients.broadcast(data)
    })
    req.on('end', () => {
        console.log('Stream Closed')
    })
})

app.post('/snapshot', (req, res) => {
    req.pipe(fs.createWriteStream(__dirname+SNAPSHOT_PATH))
})

app.listen(DEVICE_PORT)
console.log('Listening for MPEG-TS Stream/Snapshots on http://127.0.0.1:'+DEVICE_PORT)

module.exports = app
