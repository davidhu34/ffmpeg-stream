const http =  require('http')
const fs = require('fs')
const express = require('express')

module.exports = (port, secret, clients) => {
    const app = express()
    app.post('/stream', (req, res) => {
        //console.log(req)
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
        req.pipe(fs.createWriteStream('test.jpg'))
    })
    app.listen(port)
    return app
}

/*
module.exports = (port, secret, clients) => {
    const source = http.createServer( (req, res) => {
        const params = req.url.substr(1).split('/')
        const { remoteAddress, remotePort } = req.socket

        if(params[0] !== secret) {
            console.log('Stream Failure:',remoteAddress+':'+remotePort)
            res.end()
        }

        res.connection.setTimeout(0)
        console.log('Stream Connected:', remoteAddress+':'+remotePort)
        req.on('data', data => {
            clients.broadcast(data)
        })
        req.on('end', () => {
            console.log('Stream Closed')
        })
    }).listen(port)

    return source
}
*/
