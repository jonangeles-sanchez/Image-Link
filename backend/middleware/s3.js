require("dotenv").config();
const fs = require("fs");
// const S3 = require("aws-sdk/clients/s3");
const {
  S3,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Upload } = require("@aws-sdk/lib-storage");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

/*
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
*/
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// uploads a file to s3
function uploadFile(file, userId) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: userId + "_" + file.filename,
  };

  // return s3.upload(uploadParams).promise();
  const upload = new Upload({
    client: s3,
    params: uploadParams,
  });

  return upload.done();
}

exports.uploadFile = uploadFile;

// downloads a file from s3
async function getFileStream(fileKey) {
  const downloadParams = new GetObjectCommand({
    Key: fileKey,
    Bucket: bucketName,
  });

  const url = await getSignedUrl(s3, downloadParams);
  return url;
}

exports.getFileStream = getFileStream;

// deletes a file from s3
function deleteFile(fileKey) {
  const deleteParams = new DeleteObjectCommand({
    Key: fileKey,
    Bucket: bucketName,
  });

  try {
    return s3.send(deleteParams);
  } catch (err) {
    console.log(err);
  }
}

exports.deleteFile = deleteFile;
