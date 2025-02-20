const AWS = require('aws-sdk')
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const imageData = body.imageData;

        const buffer = Buffer.from(imageData, 'base64')

        const bucketName = "jc-image-upload-bucket";
        const imageKey = `uploads/${Date.now()}.jpg`

        await s3.putObject({
            Bucket:  bucketName,
            Key: imageKey,
            Body: buffer,
            ContentType: 'image/jpeg'
        }).promise();

        const rekognitionParams = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: imageKey
                }
            },
            MaxLabels: 10,
            MinConfidence: 70
        };

        const rekognitionResult = await rekognition.detectLabels(rekognitionParams).promise();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rekognitionResult)
        };
    } catch (error) {
        console.error("Error processing image:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to process image."
            })
        };
    }
};
