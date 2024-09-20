import { NextRequest, NextResponse } from 'next/server';

import { ExternalForexService } from '@/service';
import { CommonTransformer } from '@/transformer';

export async function GET(request: NextRequest) {
  const test = await ExternalForexService.Find('JPY', 'TWD');

  return NextResponse.json(CommonTransformer.ResponseTransformer({ test }));
}
