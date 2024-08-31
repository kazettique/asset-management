import { z } from 'zod';

import { FPlace, MPlace, PPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';

import { CommonValidator } from './common';

export abstract class PlaceValidator {
  public static readonly DPlaceValidator: z.ZodSchema<DPlace> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MPlaceValidator: z.ZodSchema<MPlace> = this.DPlaceValidator;

  public static readonly VPlaceValidator: z.ZodSchema<VPlace> = this.MPlaceValidator;

  public static readonly RPlaceValidator: z.ZodSchema<PPlace> = CommonValidator.SettingBaseValidator;

  public static readonly FPlaceValidator: z.ZodSchema<FPlace> = this.RPlaceValidator;
}
