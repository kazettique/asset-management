import { z } from 'zod';

import { DBrand, FBrand, MBrand, PBrand, PBrandFind, VBrand } from '@/types';

import { CommonValidator } from './common';

export abstract class BrandValidator {
  public static readonly DBrandValidator: z.ZodSchema<DBrand> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MBrandValidator: z.ZodSchema<MBrand> = this.DBrandValidator;

  public static readonly VBrandValidator: z.ZodSchema<VBrand> = this.MBrandValidator;

  public static readonly PBrandValidator: z.ZodSchema<PBrand> = CommonValidator.SettingBaseValidator;

  public static readonly FBrandValidator: z.ZodSchema<FBrand> = this.PBrandValidator;
}
