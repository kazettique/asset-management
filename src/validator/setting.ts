import { z } from 'zod';

import { DSetting, MSetting, VSetting } from '@/types';

import { BrandValidator } from './brand';
import { CategoryValidator } from './category';
import { CurrencyValidator } from './currency';
import { MethodValidator } from './method';
import { OwnerValidator } from './owner';
import { PlaceValidator } from './place';

export abstract class SettingValidator {
  public static readonly DSettingValidator: z.ZodSchema<DSetting> = z.object({
    brands: BrandValidator.DBrandValidator.array(),
    categories: CategoryValidator.DCategoryValidator.array(),
    currencies: CurrencyValidator.DCurrencyValidator.array(),
    methods: MethodValidator.DMethodValidator.array(),
    owners: OwnerValidator.DOwnerValidator.array(),
    places: PlaceValidator.DPlaceValidator.array(),
  });

  public static readonly MSettingValidator: z.ZodSchema<MSetting> = z.object({
    brands: BrandValidator.MBrandValidator.array(),
    categories: CategoryValidator.MCategoryValidator.array(),
    currencies: CurrencyValidator.MCurrencyValidator.array(),
    methods: MethodValidator.MMethodValidator.array(),
    owners: OwnerValidator.MOwnerValidator.array(),
    places: PlaceValidator.MPlaceValidator.array(),
  });

  public static readonly VSettingValidator: z.ZodSchema<VSetting> = this.MSettingValidator;
}
