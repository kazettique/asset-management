import { z } from 'zod';

import { DOwner, FOwner, MOwner, POwner, VOwner } from '@/types';

import { CommonValidator } from './common';

export abstract class OwnerValidator {
  public static readonly DOwnerValidator: z.ZodSchema<DOwner> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MOwnerValidator: z.ZodSchema<MOwner> = this.DOwnerValidator;

  public static readonly VOwnerValidator: z.ZodSchema<VOwner> = this.MOwnerValidator;

  public static readonly POwnerValidator: z.ZodSchema<POwner> = CommonValidator.SettingBaseValidator;

  public static readonly FOwnerValidator: z.ZodSchema<FOwner> = this.POwnerValidator;
}
