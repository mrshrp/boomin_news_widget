require('dotenv').config();
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  endpoint: process.env.ENDPOINT,
  region: process.env.REGION,
  forcePathStyle: true,
});
(async () => {
  try {
    const bucketName = 'local';
    const fileObjectKey = 'news-widget.min.js';

    const fileObjectData = fs.readFileSync('./build/d.min.js');
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileObjectKey,
        Body: fileObjectData,
        ContentType: 'text/javascript',
      })
    );

    console.log(`Successfully uploaded ${bucketName}/${fileObjectKey}`);
  } catch (err) {
    console.log('Error', err);
  }
})();
