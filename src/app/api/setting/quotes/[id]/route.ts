import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { QuoteService } from '@/service';
import { CommonTransformer, QuoteTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VQuote } from '@/types';
import { CommonValidator, QuoteValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VQuote>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await QuoteService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = QuoteTransformer.DMQuoteTransformer(raw);
      const dataValidation = QuoteValidator.VQuoteValidator.safeParse(transformedData);

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
): Promise<Response | NextResponse<GeneralResponse<VQuote>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await QuoteService.Delete(idValidation.data);
    const data = QuoteTransformer.MVQuoteTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VQuote>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = QuoteValidator.PQuoteValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const { author, quote } = requestValidation.data;
    const raw = await QuoteService.Update(idValidation.data, quote, author);
    const data = QuoteTransformer.MVQuoteTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
