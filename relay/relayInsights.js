const fs = require('fs')
const express = require('express')

const io = require('./relayClientIO')
const { faceDetect } = require('./api')

const { SNAPSHOT_PATH, INSIGHT_PORT, FACE_SNAPSHOT_PATH, INSIGHT_INTERVAL } = require('./configs')

const app = express()
let stateWithFace = {
	face: {},
	image: {}
}

//app.get('/face', (req, res) => {
//	res.send(stateWithFace.face)
//})

app.get('/snapshot', (req, res) => {
	/*fs.readFile(__dirname + SNAPSHOT_PATH, (err, data) => {
		res.send(data)
	})*/
	res.sendFile(__dirname + SNAPSHOT_PATH)
})

app.listen(INSIGHT_PORT)
console.log('Serving Stream Insights on http://127.0.0.1:'+INSIGHT_PORT)

setInterval( () => {

	//snapshot
	fs.readFile( __dirname + SNAPSHOT_PATH, (err, image) => {
        if (err) console.log('Read Snapshot Fail:',err)

		faceDetect(image)
		.catch( err => console.log(err) )
		.then( face => {
			console.log('Face API:', face)
			io.emit('face', face)
			if (face.length > 0) {
				stateWithFace = {
					face: face,
					snapshot: image
				}
			}
		})
	})

}, INSIGHT_INTERVAL)

module.exports = app
