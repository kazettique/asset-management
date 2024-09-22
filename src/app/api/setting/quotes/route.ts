import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { QuoteService } from '@/service';
import { CommonTransformer, QuoteTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VQuote } from '@/types';
import { QuoteValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VQuote[]>> | Response> {
  const raw = await QuoteService.FindAll();

  const transformedData = raw.map((item) => QuoteTransformer.MVQuoteTransformer(item));
  const dataValidation = QuoteValidator.VQuoteValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VQuote>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = QuoteValidator.PQuoteValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { author, quote } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await QuoteService.Create(quote, author);
    const data = QuoteTransformer.MVQuoteTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
