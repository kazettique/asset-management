import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { SettingService } from '@/service';
import { CommonTransformer, SettingTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VSetting } from '@/types';
import { CommonValidator, SettingValidator } from '@/validator';

type Segments = { params: { id: string } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VSetting>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await SettingService.FindById(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const dataValidation = SettingValidator.VSettingValidator.safeParse(raw);

      if (dataValidation.success) {
        return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
      } else {
        return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
      }
    }
  }
}

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VSetting>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = SettingValidator.PSettingValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const { value } = requestValidation.data;
    const raw = await SettingService.Update(idValidation.data, value);
    const data = SettingTransformer.MVSettingTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
