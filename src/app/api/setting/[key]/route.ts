import { NextResponse } from 'next/server';

import { SettingService } from '@/service';
import { CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VSetting } from '@/types';
import { CommonValidator, SettingValidator } from '@/validator';

type Segments = { params: { key: string } };

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VSetting>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.key);
  const requestBody = await request.json();

  const requestValidation = SettingValidator.PSettingValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const { value, key } = requestValidation.data;
    const raw = await SettingService.Update(key, value);
    // const data = SettingTransformer.MVSettingTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
  }
}
