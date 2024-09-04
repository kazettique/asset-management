import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { CurrencyService } from '@/service';
import { CommonTransformer, CurrencyTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VCurrency } from '@/types';
import { CommonValidator, CurrencyValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VCurrency>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CurrencyService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = CurrencyTransformer.DMCurrencyTransformer(raw);
      const dataValidation = CurrencyValidator.VCurrencyValidator.safeParse(transformedData);

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
): Promise<Response | NextResponse<GeneralResponse<VCurrency>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CurrencyService.Delete(idValidation.data);
    const data = CurrencyTransformer.MVCurrencyTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function POST(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VCurrency>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = CurrencyValidator.PCurrencyValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const raw = await CurrencyService.Update(requestValidation.data, idValidation.data);
    const data = CurrencyTransformer.MVCurrencyTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
