import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { CurrencyService } from '@/service';
import { CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode } from '@/types';
import { CurrencyValidator } from '@/validator';

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<Prisma.BatchPayload>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = CurrencyValidator.PCurrencyValidator.array().safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await CurrencyService.CreateMany(requestValidation.data);

    return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
  }
}
