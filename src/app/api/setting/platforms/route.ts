import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { PlatformService } from '@/service';
import { CommonTransformer, PlatformTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VPlatform } from '@/types';
import { PlatformValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VPlatform[]>> | Response> {
  const raw = await PlatformService.FindAll();

  const transformedData = raw.map((item) => PlatformTransformer.DMPlatformTransformer(item));
  const dataValidation = PlatformValidator.VPlatformValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VPlatform>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = PlatformValidator.PPlatformValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { name, comment } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await PlatformService.Create(name, comment);
    const data = PlatformTransformer.MVPlatformTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
