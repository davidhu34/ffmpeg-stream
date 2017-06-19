const http =  require('http')

module.exports = (port, clients) => {
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
            clients.broadcast(data)
        })
        req.on('end', () => {
            console.log('Stream Closed')
        })
    }).listen(port)

    return source
}