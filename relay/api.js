const fs = require("fs")
const qs = require('query-string')
const request = require('request')

const { FACE_ENDPOINT, FACE_KEY, FACE_ATTRIBUTES } = require('./configs').API

const faceDetectAPI = imagePath => {
    console.log('Calling Face API...')
    fs.readFile( __dirname + imagePath, (err, data) => {
        if (err) {
            console.log('Read Snapshot Fail:',err)
        } else {
            const endpoint = FACE_ENDPOINT
            const params = {
                returnFaceId: 'true',
                returnFaceLandmarks: 'false',
                returnFaceAttributes: [
                    'age', 'gender'
                ].join(',')
            }
            request.post({
                url: FACE_ENDPOINT+'?'+qs.stringify(params),
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key': FACE_KEY,
                    'Content-Length': data.length
                },
                body: data
            }, (err, req, res) => {
                if (err) {
                    console.log('Face API POST err:', err)
                } else {
                    console.log('Face API:', req.body)
                }
            })
        }
    })
}

module.exports = {
    faceDetect: faceDetectAPI
}
