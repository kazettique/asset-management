import { CurrencyCode } from 'currency-codes-ts/dist/types';
import { NextRequest, NextResponse } from 'next/server';

import { AssetService } from '@/service';
import { AssetTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, MAsset, NType, PaginationBase, VAsset } from '@/types';
import { AssetValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<NextResponse<PaginationBase<MAsset>> | Response> {
  // parse search params
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const filters = searchParams.get('filters');
  const sort = searchParams.get('sort');

  // params validation
  const parseParams = AssetTransformer.PAssetFindTransformer({ filters, page, pageSize, sort });
  const paramsValidation = AssetValidator.PAssetFindValidator.safeParse(parseParams);

  // params error
  if (!paramsValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  }

  // query data
  const rawData = await AssetService.FindMany(paramsValidation.data);
  const transformedData = rawData.data.map((item) => AssetTransformer.MVAssetTransformer(item));
  const dataValidation = AssetValidator.VAssetValidator.array().safeParse(transformedData);

  // dirty data error
  if (!dataValidation.success) {
    return new Response(JSON.stringify(dataValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  }

  // data is fine
  return NextResponse.json(rawData);
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VAsset>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = AssetValidator.PAssetValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const {
      brandId,
      categoryId,
      comment,
      endCurrency,
      endDate,
      endMethodId,
      endPlatformId,
      endPrice,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startCurrency,
      startDate,
      startMethodId,
      startPlatformId,
      startPrice,
      tags,
    } = requestValidation.data;

    // 3.2 if passed, fetch repository
    const raw = await AssetService.Create(
      brandId,
      categoryId,
      comment,
      endCurrency as NType<CurrencyCode>,
      endDate,
      endMethodId,
      endPlatformId,
      endPrice,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startCurrency as NType<CurrencyCode>,
      startDate,
      startMethodId,
      startPlatformId,
      startPrice,
      tags,
    );
    const data = AssetTransformer.MVAssetTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
