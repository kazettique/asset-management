import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { BrandService } from '@/service';
import { BrandTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VBrand } from '@/types';
import { BrandValidator, CommonValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VBrand>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await BrandService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const dataValidation = BrandValidator.VBrandValidator.safeParse(raw);

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
): Promise<Response | NextResponse<GeneralResponse<VBrand>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await BrandService.Delete(idValidation.data);
    const data = BrandTransformer.MVBrandTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function POST(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VBrand>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = BrandValidator.PBrandValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const raw = await BrandService.Update(requestValidation.data, idValidation.data);
    const data = BrandTransformer.MVBrandTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
