import { NextRequest, NextResponse } from 'next/server';

import { AssetService } from '@/service';
import { AssetTransformer } from '@/transformer';
import { HttpStatusCode } from '@/types';
import { AssetValidator } from '@/validator';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const filters = searchParams.get('filters');
  const sort = searchParams.get('sort');

  const parseParams = AssetTransformer.PAssetFindTransformer({ filters, page, pageSize, sort });

  const payloadValidation = AssetValidator.PAssetFindValidator.safeParse(parseParams);

  if (!payloadValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const rawData = await AssetService.FindMany(payloadValidation.data);
    return NextResponse.json(rawData);
  }
}
