import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { SettingService } from '@/service';
import { CommonTransformer, SettingTransformer } from '@/transformer';
import { HttpStatusCode, VSetting } from '@/types';
import { SettingValidator } from '@/validator';

export async function GET(_request: Request): Promise<Response | NextResponse<VSetting[]>> {
  const settings = await SettingService.FindAll();

  const transformedData = settings.map((setting) => SettingTransformer.MVSettingTransformer(setting));

  const dataValidation = SettingValidator.VSettingValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify({ error: dataValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}
