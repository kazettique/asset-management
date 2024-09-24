import { z } from 'zod';

import { FTag, MTag, PTag, PTagFind, VTag } from '@/types';
import { DTag } from '@/types/dbModels';

import { CommonValidator } from './common';

export abstract class TagValidator {
  public static readonly DTagValidator: z.ZodSchema<DTag> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MTagValidator: z.ZodSchema<MTag> = this.DTagValidator;

  public static readonly VTagValidator: z.ZodSchema<VTag> = this.MTagValidator;

  public static readonly PTagValidator: z.ZodSchema<PTag> = CommonValidator.SettingBaseValidator;

  public static readonly FTagValidator: z.ZodSchema<FTag> = this.PTagValidator;

  public static readonly PTagFindValidator: z.ZodSchema<PTagFind> = CommonValidator.PFindPaginationValidator;
}
