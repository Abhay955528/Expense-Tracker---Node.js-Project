const AWS = require("aws-sdk");

const uploadTOS3= ((data, fileName) =>{
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY_AWS;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET_AWS;
  
    const s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
  
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL:'public-read'
    };
  
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log("someting went wrong", err);
          reject(err);
        } else {
          resolve(s3response.Location);
        }
      });
    });
  })

  module.exports = {
    uploadTOS3
  }