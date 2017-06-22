const fs = require('fs')
const request = require('request')

const ffmpegCmd = require('./ffmpegCommand')
const {
	STREAM_OUTPUT_PATH,
	SNAPSHOT_PATH,
	SNAPSHOT_OUTPUT_PATH
} = require('./configs')

const sendSnapshot = () => {
	try {
		fs.createReadStream(__dirname+SNAPSHOT_PATH)
		.pipe(request.post(SNAPSHOT_OUTPUT_PATH))
	} catch (e) {
		console.log('Error Sending Snapshot:', e)
		process.abort()
	}
}

let	stream = null
let snapshot = null

const execute = {
	init: () => {
		if (stream || snapshot) {
			console.log('Failed to Init (already streaming)')
			process.abort()
		} else {
			stream = ffmpegCmd(STREAM_OUTPUT_PATH, SNAPSHOT_PATH)
			stream.run()
			snapshot = setInterval( sendSnapshot, 1000)
			console.log('Streaming Start')
		}
	},
	kill: () => {
		if (stream) {
			stream.kill()
			stream = null
		}
		if (snapshot) {
			clearInterval(snapshot)
			snapshot = null
		}
		console.log('Streaming End')
	}
}

process.on('message', cmd => execute[cmd]())
//setTimeout(() => stream.kill(), 3000)
