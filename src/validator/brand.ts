import { z } from 'zod';

import { DBrand, FBrand, MBrand, RBrand, VBrand } from '@/types';

import { CommonValidator } from './common';

export abstract class BrandValidator {
  public static readonly DBrandValidator: z.ZodSchema<DBrand> = z.object({
    comment: z.string().nullable(),
    id: CommonValidator.IdValidator,
    name: z.record(z.string(), z.string()),
  });

  public static readonly MBrandValidator: z.ZodSchema<MBrand> = z
    .object({ id: CommonValidator.IdValidator })
    .and(CommonValidator.SettingBaseValidator);

  public static readonly VBrandValidator: z.ZodSchema<VBrand> = this.MBrandValidator;

  public static readonly RBrandValidator: z.ZodSchema<RBrand> = CommonValidator.SettingBaseValidator.superRefine(
    (values, context) => {
      const nameEnLength: number = values.name.nameEn?.length || 0;
      const nameTwLength: number = values.name.nameTw?.length || 0;
      const nameJpLength: number = values.name.nameJp?.length || 0;

      if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
      }
    },
  );

  public static readonly FBrandValidator: z.ZodSchema<FBrand> = this.RBrandValidator;
}
