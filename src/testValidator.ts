import { z } from 'zod';

import { Age, DPerson, FPerson, MPerson, PersonCommon, RPerson, VPerson } from './testModel';
import { CommonValidator } from './validator';

export const AgeValidator: z.ZodSchema<Age> = z.number().int().nonnegative();
export const PersonCommonValidator: z.ZodSchema<PersonCommon> = z.object({
  age: AgeValidator,
  companyId: CommonValidator.IdValidator.nullable(),
  name: z.string(),
});

export const DPersonValidator: z.ZodSchema<DPerson> = z
  .object({
    id: CommonValidator.IdValidator,
  })
  .and(PersonCommonValidator);

export const MPersonValidator: z.ZodSchema<MPerson> = DPersonValidator;

export const VPersonValidator: z.ZodSchema<VPerson> = MPersonValidator;

export const FPersonValidator: z.ZodSchema<FPerson> = z.object({
  age: AgeValidator,
  companyId: z.string(),
  name: z.string(),
});

export const RPersonValidator: z.ZodSchema<RPerson> = PersonCommonValidator;
