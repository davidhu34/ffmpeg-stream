const fs = require("fs")
const qs = require('query-string')
const request = require('request')

const { FACE_ENDPOINT, FACE_KEY, FACE_ATTRIBUTES } = require('./configs').API

const faceDetectAPI = image => {
    console.log('Calling Face API...')
    return new Promise( (resolve, reject) => {
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
            body: image
        }, (err, req, res) => {
            if (err) reject('Face API POST err: '+err)
            else resolve(req.body)
        })
    })
}

module.exports = {
    faceDetect: faceDetectAPI
}
