const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view-stream.html')
})

app.listen(3000)
