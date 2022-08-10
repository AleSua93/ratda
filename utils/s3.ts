import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function getUrlForFiles() {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME ?? "",
    Key: "audio_files.zip",
  };
  const preSignedUrl = await s3.getSignedUrl("getObject", params);

  return preSignedUrl;
}
