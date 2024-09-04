import { z } from 'zod';

import { DCategory, FCategory, MCategory, PCategory, VCategory } from '@/types';

import { CommonValidator } from './common';

export abstract class CategoryValidator {
  public static readonly DCategoryValidator: z.ZodSchema<DCategory> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MCategoryValidator: z.ZodSchema<MCategory> = this.DCategoryValidator;

  public static readonly VCategoryValidator: z.ZodSchema<VCategory> = this.MCategoryValidator;

  public static readonly PCategoryValidator: z.ZodSchema<PCategory> = CommonValidator.SettingBaseValidator;

  public static readonly FCategoryValidator: z.ZodSchema<FCategory> = this.PCategoryValidator;
}
