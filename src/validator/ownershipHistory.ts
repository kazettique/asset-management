import { z } from 'zod';

import { DOwnershipHistory, MOwnershipHistory, VOwnershipHistory } from '@/types';

import { CommonValidator } from './common';

export abstract class OwnershipHistoryValidator {
  public static readonly DOwnershipHistoryValidator: z.ZodSchema<DOwnershipHistory> = z
    .object({
      asset: z.object({
        id: CommonValidator.IdValidator,
        name: CommonValidator.NameValidator,
      }),
      owner: z.object({
        id: CommonValidator.IdValidator,
        name: CommonValidator.NameValidator,
      }),
      startDate: z.date(),
    })
    .and(CommonValidator.DbBaseValidator);

  public static readonly MOwnershipHistoryValidator: z.ZodSchema<MOwnershipHistory> = this.DOwnershipHistoryValidator;

  public static readonly VOwnershipHistoryValidator: z.ZodSchema<VOwnershipHistory> = this.MOwnershipHistoryValidator;
}
