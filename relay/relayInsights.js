const io = require('./relayClientIO')
const { faceDetect } = require('./api')

const { SNAPSHOT_PATH, FACE_SNAPSHOT_PATH, INSIGHT_INTERVAL } = require('./configs')

module.exports = setInterval( () => {
		
	//snapshot
	fs.readFile( __dirname + SNAPSHOT_PATH, (err, data) => {
        if (err) console.log('Read Snapshot Fail:',err)

		faceDetect(data)
		.catch( err => console.log(err) )
		.then( face => {
			console.log('Face API:', face)
			io.emit('face', face)
			if (face) {
				fs.writeFile( __dirname + FACE_SNAPSHOT_PATH, data)
			}
		})
	})

}, INSIGHT_INTERVAL)
