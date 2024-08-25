import { z } from 'zod';

import { FCreateCategory, FUpdateCategory, RCreateCategory, RUpdateCategory, VCategory } from '@/types';

import { NameValidator } from './common';

export const VCategoryValidator: z.ZodSchema<VCategory> = z
  .object({
    comment: z.string().nullable(),
    id: z.string(),
  })
  .and(NameValidator);

export const RCreateCategoryValidator: z.ZodSchema<RCreateCategory> = z
  .object({
    comment: z.string(),
    nameEn: z.string(),
    nameJp: z.string(),
    nameTw: z.string(),
  })
  .superRefine((values, context) => {
    const nameEnLength: number = values.nameEn.length;
    const nameTwLength: number = values.nameTw.length;
    const nameJpLength: number = values.nameJp.length;

    if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['nameEn'] });
    }
  });

export const FCreateCategoryValidator: z.ZodSchema<FCreateCategory> = RCreateCategoryValidator;

export const RUpdateCategoryValidator: z.ZodSchema<RUpdateCategory> = z
  .object({
    comment: z.string().nullable(),
    id: z.string().uuid(),
    nameEn: z.string(),
    nameJp: z.string(),
    nameTw: z.string(),
  })
  .superRefine((values, context) => {
    const nameEnLength: number = values.nameEn.length;
    const nameTwLength: number = values.nameTw.length;
    const nameJpLength: number = values.nameJp.length;

    if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
    }
  });

export const FUpdateCategoryValidator: z.ZodSchema<FUpdateCategory> = RUpdateCategoryValidator;
