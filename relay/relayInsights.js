const { faceDetect } = require('./api')

const { SNAPSHOT_PATH, IN } = require('./configs')

module.exports = io => {
	setInterval( () => {
		
		faceDetect(SNAPSHOT_PATH)
		.then( data => {
			io.emit('face', data)
		})

	}, INSIGHT_INTERVAL)

}