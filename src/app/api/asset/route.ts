import { NextResponse } from 'next/server';

import { AssetRepository } from '@/repository';
import { AssetService } from '@/service';
import { AssetTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VAsset } from '@/types';
import { AssetValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VAsset[]>> | Response> {
  const raw = await AssetService.getAll();

  const transformedData = raw.map((item) => AssetTransformer.MAssetTransformer(item));
  const dataValidation = AssetValidator.VAssetValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify(dataValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VAsset>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = AssetValidator.RAssetValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await AssetService.create(requestValidation.data);
    const data = AssetTransformer.MAssetTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
