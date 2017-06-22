const cp = require('child_process')

const streamProc = () => {
	const stream = cp.fork('streamControl')
	console.log('Stream Process Start')
	stream.send('init')

	stream.on('close', () => {
		console.log('Stream Process End')
		//streamProc()
	})
	setTimeout(() => stream.send('kill'), 5000)
}
setInterval( streamProc, 6000)
