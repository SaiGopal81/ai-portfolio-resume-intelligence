import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    easySolved: 120,
    mediumSolved: 85,
    hardSolved: 20,
    totalSolved: 225
  });
}
