import { S3Client } from "@aws-sdk/client-s3";

export const AWSs3Client = new S3Client({
  region: process.env.GALLARY_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.S3AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.S3AWS_SECRET_KEY as string,
  },
});
