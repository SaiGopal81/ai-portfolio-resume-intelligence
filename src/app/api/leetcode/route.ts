import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    easySolved: 103,
    mediumSolved: 142,
    hardSolved: 26,
    totalSolved: 271
  });
}
