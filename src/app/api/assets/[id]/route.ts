import { CurrencyCode } from 'currency-codes-ts/dist/types';
import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { AssetService } from '@/service';
import { AssetTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, NType, VAsset } from '@/types';
import { AssetValidator, CommonValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VAsset>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await AssetService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = AssetTransformer.MVAssetTransformer(raw);
      const dataValidation = AssetValidator.VAssetValidator.safeParse(transformedData);

      if (dataValidation.success) {
        return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
      } else {
        return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
      }
    }
  }
}

export async function DELETE(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VAsset>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await AssetService.Delete(idValidation.data);
    const data = AssetTransformer.MVAssetTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VAsset>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = AssetValidator.PAssetValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify({ error: requestValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
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
      newBrand,
      newCategory,
      newEndPlatform,
      newStartPlatform,
      ownerId,
      placeId,
      startCurrency,
      startDate,
      startMethodId,
      startPlatformId,
      startPrice,
      tags,
    } = requestValidation.data;

    const raw = await AssetService.Update(
      idValidation.data,
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
      newBrand,
      newCategory,
      newEndPlatform,
      newStartPlatform,
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
