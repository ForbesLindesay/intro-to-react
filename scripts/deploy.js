if (process.env.TRAVIS_BRANCH !== 'master') {
  process.exit(0);
}

const path = require('path');
const s3 = require('s3');
const AwsS3 = require('aws-sdk/clients/s3');
const s3 = require('s3');

const awsS3Client = new AwsS3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION,
  signatureVersion: 'v4'
});
const client = s3.createClient({
  s3Client: awsS3Client
});
var uploader = client.uploadDir({
  localDir: path.resolve(__dirname + '/../build'),
  deleteRemoved: false,
  s3Params: {
    Bucket: process.env.S3_BUCKET,
    Prefix: ''
  }
});
uploader.on('error', function(err) {
  console.error('unable to sync:', err.stack);
  process.exit(1);
});
uploader.on('end', function() {
  console.log('done uploading website');
});
