import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import {
  BrandRepository,
  CategoryRepository,
  CurrencyRepository,
  MethodRepository,
  OwnerRepository,
  PlaceRepository,
} from '@/repository';
import { CommonTransformer, SettingTransformer } from '@/transformer';
import { HttpStatusCode, VSetting } from '@/types';
import { SettingValidator } from '@/validator';

export async function GET(_request: Request): Promise<Response | NextResponse<VSetting>> {
  const brands = await BrandRepository.FindAll();
  const categories = await CategoryRepository.FindAll();
  const currencies = await CurrencyRepository.FindAll();
  const methods = await MethodRepository.FindAll();
  const places = await PlaceRepository.FindAll();
  const owners = await OwnerRepository.FindAll();

  const transformedData = SettingTransformer.MSettingTransformer({
    brands,
    categories,
    currencies,
    methods,
    owners,
    places,
  });

  const dataValidation = SettingValidator.VSettingValidator.safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify({ error: dataValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}
