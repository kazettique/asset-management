import { z } from 'zod';

import { DSetting, MSetting, VSetting } from '@/types';

import { BrandValidator } from './brand';
import { CategoryValidator } from './category';
import { MethodValidator } from './method';
import { OwnerValidator } from './owner';
import { PlaceValidator } from './place';
import { PlatformValidator } from './platform';
import { TagValidator } from './tag';

export abstract class SettingValidator {
  public static readonly DSettingValidator: z.ZodSchema<DSetting> = z.object({
    brands: BrandValidator.DBrandValidator.array(),
    categories: CategoryValidator.DCategoryValidator.array(),
    methods: MethodValidator.DMethodValidator.array(),
    owners: OwnerValidator.DOwnerValidator.array(),
    places: PlaceValidator.DPlaceValidator.array(),
    tags: TagValidator.DTagValidator.array(),
  });

  public static readonly MSettingValidator: z.ZodSchema<MSetting> = z.object({
    brands: BrandValidator.MBrandValidator.array(),
    categories: CategoryValidator.MCategoryValidator.array(),
    methods: MethodValidator.MMethodValidator.array(),
    owners: OwnerValidator.MOwnerValidator.array(),
    places: PlaceValidator.MPlaceValidator.array(),
    platforms: PlatformValidator.MPlatformValidator.array(),
    tags: TagValidator.MTagValidator.array(),
  });

  public static readonly VSettingValidator: z.ZodSchema<VSetting> = z.object({
    brands: BrandValidator.MBrandValidator.array(),
    categories: CategoryValidator.MCategoryValidator.array(),
    endMethods: MethodValidator.MMethodValidator.array(),
    owners: OwnerValidator.MOwnerValidator.array(),
    places: PlaceValidator.MPlaceValidator.array(),
    platforms: PlatformValidator.MPlatformValidator.array(),
    startMethods: MethodValidator.MMethodValidator.array(),
    tags: TagValidator.MTagValidator.array(),
  });
}
