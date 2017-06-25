const fs = require("fs")
const request = require('request')
const { SNAPSHOT_PATH } = require('./configs')

const faceDetectAPI = imagePath => {
    fs.readFile( __dirname + imagePath, (err, data) => {
        if (err) {
            console.log('Read Snapshot Fail:',err)
        } else {
            request.post({
                url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes={string}',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Content-Length': data.length
                },
                body: data
            }, (err, req, res) => {
                if (err) {
                    console.log('Cognitive API POST err:', err)
                } else {
                    console.log(res.body)
                }
            })
        }
    })
}
