// src/app/api/intake/route.ts
import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { IntakeData, FormData as IntakeFormData } from "@/app/types/intake";

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

async function uploadToS3(data: IntakeFormData): Promise<string> {
  const bucketName = process.env.AWS_BUCKET_NAME!;
  const guid = generateGuid();
  const key = `gnm/cases/${guid}`;

  const intakeData: IntakeData = {
    ...data,
    id: guid,
    timestamp: new Date().toISOString(),
  };

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(intakeData),
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
    const data: IntakeFormData = await request.json();

    try {
      const guid = await uploadToS3(data);
      return NextResponse.json({ success: true, id: guid });
    } catch (s3Error) {
      console.error('S3 upload failed, falling back to JSON file:', s3Error);

      const filePath = path.join(process.cwd(), 'intake-data.json');
      let existingData: IntakeData[] = [];

      try {
        const fileContent = await readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch {
        // File doesn't exist yet, start with empty array
      }

      const guid = generateGuid();
      const newEntry: IntakeData = {
        ...data,
        id: guid,
        timestamp: new Date().toISOString(),
      };

      existingData.push(newEntry);
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