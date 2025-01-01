// src/app/api/cases/route.ts
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';
import path from 'path';
import {IntakeData} from "@/app/types/intake";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

async function getAllCasesFromS3(ids?: string[]): Promise<IntakeData[]> {
  const bucketName = process.env.AWS_BUCKET_NAME!;
  const prefix = 'gnm/cases/';

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const listedObjects = await s3Client.send(listCommand);
    if (!listedObjects.Contents) return [];

    let keysToFetch = listedObjects.Contents.map(obj => obj.Key!);
    if (ids) {
      keysToFetch = keysToFetch.filter(key =>
        ids.some(id => key.endsWith(id))
      );
    }

    const cases = await Promise.all(
      keysToFetch.map(async (key) => {
        const getCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
        const response = await s3Client.send(getCommand);
        const data = await response.Body?.transformToString();
        return data ? (JSON.parse(data) as IntakeData) : null;
      })
    );

    return cases.filter((item): item is IntakeData => item !== null);
  } catch (error) {
    console.error('S3 get error:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids')?.split(',');

  try {
    try {
      const cases = await getAllCasesFromS3(ids);
      return NextResponse.json({ cases });
    } catch (s3Error) {
      console.error('S3 get failed, falling back to JSON file:', s3Error);

      const filePath = path.join(process.cwd(), 'intake-data.json');
      const fileContent = await readFile(filePath, 'utf-8');
      let allData = JSON.parse(fileContent) as IntakeData[];

      if (ids) {
        allData = allData.filter((item) => ids.includes(item.id));
      }

      return NextResponse.json({ cases: allData });
    }
  } catch (error) {
    console.error('Failed to get cases:', error);
    return NextResponse.json(
      { error: 'Failed to get cases' },
      { status: 500 }
    );
  }
}