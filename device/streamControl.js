const ffmpegCmd = require('./ffmpegCommand')

let	stream = null
let snapshot = null

const execute = {
	init: () => {
		if (stream || snapshot) {
			console.log('Failed to Init (already streaming)')
		} else {
			stream = ffmpegCmd()
			stream.run()
			snapshot = setInterval( () => {
				console.log('stream~')
			}, 1000)
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
