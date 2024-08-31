import { z } from 'zod';

import { DOwner, FOwner, MOwner, POwner, VOwner } from '@/types';

import { CommonValidator } from './common';

export abstract class OwnerValidator {
  public static readonly DOwnerValidator: z.ZodSchema<DOwner> = z.object({
    comment: z.string().nullable(),
    id: CommonValidator.IdValidator,
    name: z.record(z.string(), z.string()),
  });

  public static readonly MOwnerValidator: z.ZodSchema<MOwner> = z
    .object({ id: CommonValidator.IdValidator })
    .and(CommonValidator.SettingBaseValidator);

  public static readonly VOwnerValidator: z.ZodSchema<VOwner> = this.MOwnerValidator;

  public static readonly ROwnerValidator: z.ZodSchema<POwner> = CommonValidator.SettingBaseValidator.superRefine(
    (values, context) => {
      const nameEnLength: number = values.name.nameEn?.length || 0;
      const nameTwLength: number = values.name.nameTw?.length || 0;
      const nameJpLength: number = values.name.nameJp?.length || 0;

      if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
      }
    },
  );

  public static readonly FOwnerValidator: z.ZodSchema<FOwner> = this.ROwnerValidator;
}
