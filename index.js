const AWS = require('aws-sdk')
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

exports.handler = async (event) => {
    //Function logic will be developed here
}

const body = JSON.parse(event.body);
const imageData = body.imageData;

const buffer = Buffer.from(imageData, 'base64')

const bucketName = "jc-image-upload-bucket";
const imageKey = `uploads/${Date.now()}.jpg`

test