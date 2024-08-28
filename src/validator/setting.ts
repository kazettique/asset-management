import { z } from 'zod';

import { DSetting, MSetting, VSetting } from '@/types';

import { DBrandValidator, MBrandValidator } from './brand';
import { DCategoryValidator, MCategoryValidator } from './category';
import { DCurrencyValidator, MCurrencyValidator } from './currency';
import { DMethodValidator, MMethodValidator } from './method';
import { DOwnerValidator, MOwnerValidator } from './owner';
import { DPlaceValidator, MPlaceValidator } from './place';

export const DSettingValidator: z.ZodSchema<DSetting> = z.object({
  brands: DBrandValidator.array(),
  categories: DCategoryValidator.array(),
  currencies: DCurrencyValidator.array(),
  methods: DMethodValidator.array(),
  owners: DOwnerValidator.array(),
  places: DPlaceValidator.array(),
});

export const MSettingValidator: z.ZodSchema<MSetting> = z.object({
  brands: MBrandValidator.array(),
  categories: MCategoryValidator.array(),
  currencies: MCurrencyValidator.array(),
  methods: MMethodValidator.array(),
  owners: MOwnerValidator.array(),
  places: MPlaceValidator.array(),
});

export const VSettingValidator: z.ZodSchema<VSetting> = MSettingValidator;
