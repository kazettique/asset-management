import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { PlaceService } from '@/service';
import { CommonTransformer, PlaceTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VPlace } from '@/types';
import { PlaceValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VPlace[]>> | Response> {
  const raw = await PlaceService.FindAll();

  const transformedData = raw.map((item) => PlaceTransformer.DMPlaceTransformer(item));
  const dataValidation = PlaceValidator.VPlaceValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VPlace>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = PlaceValidator.PPlaceValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await PlaceService.Create(requestValidation.data);
    const data = PlaceTransformer.MVPlaceTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
