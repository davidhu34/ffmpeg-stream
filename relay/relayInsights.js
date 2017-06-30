const fs = require('fs')
const express = require('express')

const io = require('./relayClientIO')
const { faceDetect } = require('./api')

const { SNAPSHOT_PATH, FACE_SNAPSHOT_PATH, INSIGHT_INTERVAL } = require('./configs')

const { INSIGHT_PORT, SNAPSHOT_PATH } = require('./configs')

const app = express()
let stateWithFace = {
	face: {}
	image: {}
}

app.get('/facesnapshot', (req, res) => {
})

app.get('/facesnapshot', (req, res) => {

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
