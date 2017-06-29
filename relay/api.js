const fs = require("fs")
const qs = require('query-string')
const request = require('request')

const { FACE_ENDPOINT, FACE_KEY, FACE_ATTRIBUTES } = require('./configs').API

const faceDetectAPI = imagePath => {
    console.log('Calling Face API...')
    return new Promise( (resolve, reject) => {
        fs.readFile( __dirname + imagePath, (err, data) => {
            if (err) {
                const error = 'Read Snapshot Fail: '+err
                console.log(error)
                reject(error)
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
                        const error = 'Face API POST err: '+err
                        console.log(error)
                        reject(error)
                    } else {
                        console.log('Face API:', req.body)
                        resolve(req.body)
                    }
                })
            }
        })
    })
    
}

module.exports = {
    faceDetect: faceDetectAPI
}
