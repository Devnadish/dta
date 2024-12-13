import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3AWS_ACCESS_KEY!,
    secretAccessKey: process.env.S3AWS_SECRET_KEY!,
  },
});

export async function uploadToS3(
  file: File | Blob,
  folder: string
): Promise<string> {
  const key = `faq/${folder}/${Date.now()}-${
    file instanceof File ? file.name : "recording.wav"
  }`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );
    console.log("Upload successful:", response);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.S3AWS_REGION}.amazonaws.com/${key}`;
  console.log("Generated URL:", url);
  return url;
}