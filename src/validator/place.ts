import { z } from 'zod';

import { FPlace, MPlace, PPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';

import { CommonValidator } from './common';

export abstract class PlaceValidator {
  public static readonly DPlaceValidator: z.ZodSchema<DPlace> = z.object({
    comment: z.string().nullable(),
    id: CommonValidator.IdValidator,
    name: z.record(z.string(), z.string()),
  });

  public static readonly MPlaceValidator: z.ZodSchema<MPlace> = z
    .object({ id: CommonValidator.IdValidator })
    .and(CommonValidator.SettingBaseValidator);

  public static readonly VPlaceValidator: z.ZodSchema<VPlace> = this.MPlaceValidator;

  public static readonly RPlaceValidator: z.ZodSchema<PPlace> = CommonValidator.SettingBaseValidator.superRefine(
    (values, context) => {
      const nameEnLength: number = values.name.nameEn?.length || 0;
      const nameTwLength: number = values.name.nameTw?.length || 0;
      const nameJpLength: number = values.name.nameJp?.length || 0;

      if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
      }
    },
  );

  public static readonly FPlaceValidator: z.ZodSchema<FPlace> = this.RPlaceValidator;
}
