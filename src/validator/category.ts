import { z } from 'zod';

import { FCategory, MCategory, RCategory, VCategory } from '@/types';
import { DCategory } from '@/types/dbModels';

import { CommonValidator } from './common';

export abstract class CategoryValidator {
  public static readonly DCategoryValidator: z.ZodSchema<DCategory> = z.object({
    comment: z.string().nullable(),
    id: CommonValidator.IdValidator,
    name: z.record(z.string(), z.string()),
  });

  public static readonly MCategoryValidator: z.ZodSchema<MCategory> = z
    .object({ id: CommonValidator.IdValidator })
    .and(CommonValidator.SettingBaseValidator);

  public static readonly VCategoryValidator: z.ZodSchema<VCategory> = this.MCategoryValidator;

  public static readonly RCategoryValidator: z.ZodSchema<RCategory> = CommonValidator.SettingBaseValidator;

  public static readonly FCategoryValidator: z.ZodSchema<FCategory> = this.RCategoryValidator;
}
