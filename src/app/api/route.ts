import { NextResponse } from 'next/server';

import { CommonTransformer } from '@/transformer';

export async function GET(_request: Request) {
  // return NextResponse.error();
  return NextResponse.json(CommonTransformer.ResponseTransformer({ greeting: 'hello world!', name: 'Hikari' }));
}
