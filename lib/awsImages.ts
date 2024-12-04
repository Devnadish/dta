"use server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { AWSs3Client } from "./s3Client";

// Create an S3 client

const awsUrl = "https://dreamtoapp-worksample.s3.eu-north-1.amazonaws.com/";

export async function getImages(prefix: string) {
  const params = {
    Bucket: process.env.GALLARY_BUCKET_NAME as string,
    Prefix: prefix,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const { Contents = [] } = await AWSs3Client.send(command);

    // Filter out invalid image keys and return full URLs
    const validUrls = Contents.filter(
      ({ Key }) => Key && !Key.endsWith("/")
    ).map(({ Key }) => `${awsUrl}${Key}`);

    return validUrls;
  } catch (error: any) {
    console.error("Error fetching images:", error.message);
    throw new Error("Unable to fetch images. Please try again later.");
  }
}
