import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { QuoteService } from '@/service';
import { CommonTransformer, QuoteTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VQuote } from '@/types';
import { QuoteValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VQuote[]>> | Response> {
  const raw = await QuoteService.FindRandom();

  if (raw === null) {
    return new Response(raw, { status: HttpStatusCode.NO_CONTENT });
  } else {
    const transformedData = QuoteTransformer.MVQuoteTransformer(raw);
    const dataValidation = QuoteValidator.VQuoteValidator.safeParse(transformedData);

    if (!dataValidation.success) {
      return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
    } else {
      return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
    }
  }
}
