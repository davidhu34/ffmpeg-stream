const cp = require('child_process')

const streamProc = () => {
	const stream = cp.fork(__dirname+'/streamControl')
	console.log('Stream Process Start')
	stream.send('init')

	stream.on('close', () => {
		console.log('Stream Process End')
		//streamProc()
	})
	//setTimeout(() => stream.send('kill'), 4000)
}
streamProc()
//setInterval( streamProc, 6000)
