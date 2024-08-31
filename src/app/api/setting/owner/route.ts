import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { OwnerRepository } from '@/repository';
import { OwnerService } from '@/service';
import { CommonTransformer, OwnerTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VOwner } from '@/types';
import { OwnerValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VOwner[]>> | Response> {
  const raw = await OwnerService.FindAll();

  const transformedData = raw.map((item) => OwnerTransformer.DMOwnerTransformer(item));
  const dataValidation = OwnerValidator.VOwnerValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VOwner>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = OwnerValidator.ROwnerValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await OwnerService.Create(requestValidation.data);
    const data = OwnerTransformer.MVOwnerTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
