import { NextRequest, NextResponse } from 'next/server';

import { AssetService } from '@/service';
import { AssetTransformer, CommonTransformer } from '@/transformer';
import { HttpStatusCode } from '@/types';
import { AssetValidator } from '@/validator';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const parseParams = AssetTransformer.PAssetFindTransformer({ page, pageSize });
  const payloadValidation = AssetValidator.PAssetFindValidator.safeParse(parseParams);

  if (!payloadValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const rawData = await AssetService.FindMany(payloadValidation.data);
    return NextResponse.json(CommonTransformer.ResponseTransformer(rawData));
  }
}
