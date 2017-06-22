const ffmpeg = require('fluent-ffmpeg')

module.exports = (stream_out, snapshot_file) => {
    const cmd = ffmpeg('/dev/video0')
    .inputFormat('v4l2')
    .inputFPS(25)
    .output(stream_out)
    .format('mpegts')
    .videoCodec('mpeg1video')
    .size('640x480')
    .videoBitrate('1000k')
    .outputOptions('-bf 0')
    .output(__dirname+snapshot_file)
    //.outputOptions(['-f image2','-vf fps=1/5'])
    .outputOptions(['-update 1','-r 1'])

    cmd.on('err', (err, stderr, stdout) => {
        console.log('ffmpeg err:', err, stderr, stdout)
    })

    cmd.on('end', (stdout, stderr) => {
        console.log('ffmpeg end:', stderr, stdout)
    })

    return cmd
}
