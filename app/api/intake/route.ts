// src/app/api/intake/route.ts
import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

function generateGuid(): string {
  return crypto.randomUUID();
}

async function uploadToS3(data: any) {
  const bucketName = process.env.AWS_BUCKET_NAME!;
  const guid = generateGuid();
  const key = `gnm/cases/${guid}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify({
      id: guid,
      ...data,
      timestamp: new Date().toISOString(),
    }),
    ContentType: 'application/json',
  });

  try {
    await s3Client.send(command);
    return guid;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    try {
      const guid = await uploadToS3(data);
      return NextResponse.json({ success: true, id: guid });
    } catch (s3Error) {
      console.error('S3 upload failed, falling back to JSON file:', s3Error);

      const filePath = path.join(process.cwd(), 'intake-data.json');
      let existingData = [];

      try {
        const fileContent = await readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (readError) {
        // File doesn't exist yet, start with empty array
      }

      const guid = generateGuid();
      existingData.push({
        id: guid,
        ...data,
        timestamp: new Date().toISOString(),
      });

      await writeFile(filePath, JSON.stringify(existingData, null, 2));
      return NextResponse.json({ success: true, id: guid });
    }
  } catch (error) {
    console.error('Failed to save intake data:', error);
    return NextResponse.json(
      { error: 'Failed to save intake data' },
      { status: 500 }
    );
  }
}