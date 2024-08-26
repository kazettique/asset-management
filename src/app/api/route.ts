import { NextResponse } from 'next/server';

import { CommonTransformer } from '@/utils';

export async function GET(_request: Request) {
  // return NextResponse.error();
  return NextResponse.json(CommonTransformer.ResponseTransformer({ greeting: 'hello world!', name: 'Hikari' }));
}
