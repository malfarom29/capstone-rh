import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  ...(process.env.AWS_ENDPOINT_URL && {
    endpoint: process.env.AWS_ENDPOINT_URL,
    forcePathStyle: true,
  }),
};

export const s3Client = new S3Client(s3Config);

export const createUploadSignedUrl = async (fileName: string) => {
  const objectParams = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: fileName,
  };

  const command = new PutObjectCommand(objectParams);
  console.log(command);

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5, // URL expiration time in seconds
  });

  return url;
};
