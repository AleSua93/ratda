import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function getUrlForFiles() {
  let key = "audio_files.zip";
  if (process.env.NODE_ENV === "development") {
    key = "test_audio_files_2.zip";
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME ?? "",
    Key: key,
  };
  const preSignedUrl = await s3.getSignedUrl("getObject", params);

  return preSignedUrl;
}
