const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const main = async (event) => {
  console.log("Event -->", event);

  const obj = event.Records[0].s3;
  const bucket = obj.bucket.name;
  const file = obj.object.key;

  return await new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      key: file,
    };

    s3.getObject(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Result", result);

        const contents = result.Body.toString();

        console.log("Contents", contents);

        resolve({});
      }
    });
  });
};

exports.handler = main;
