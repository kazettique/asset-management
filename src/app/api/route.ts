import { NextResponse } from 'next/server';

import { ResponseTransformer } from '@/utils';

export async function GET(request: Request) {
  return NextResponse.json(ResponseTransformer({ greeting: 'hello world!', name: 'Hikari' }));
}
