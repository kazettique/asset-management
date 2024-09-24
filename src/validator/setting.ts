import { z } from 'zod';

import { DSettingOptions, MSettingOptions, VSettingOptions } from '@/types';

import { BrandValidator } from './brand';
import { CategoryValidator } from './category';
import { MethodValidator } from './method';
import { OwnerValidator } from './owner';
import { PlaceValidator } from './place';
import { PlatformValidator } from './platform';
import { TagValidator } from './tag';

export abstract class SettingValidator {
  public static readonly DSettingOptionsValidator: z.ZodSchema<DSettingOptions> = z.object({
    brands: BrandValidator.DBrandValidator.array(),
    categories: CategoryValidator.DCategoryValidator.array(),
    methods: MethodValidator.DMethodValidator.array(),
    owners: OwnerValidator.DOwnerValidator.array(),
    places: PlaceValidator.DPlaceValidator.array(),
    tags: TagValidator.DTagValidator.array(),
  });

  public static readonly MSettingOptionsValidator: z.ZodSchema<MSettingOptions> = z.object({
    brands: BrandValidator.MBrandValidator.array(),
    categories: CategoryValidator.MCategoryValidator.array(),
    methods: MethodValidator.MMethodValidator.array(),
    owners: OwnerValidator.MOwnerValidator.array(),
    places: PlaceValidator.MPlaceValidator.array(),
    platforms: PlatformValidator.MPlatformValidator.array(),
    tags: TagValidator.MTagValidator.array(),
  });

  public static readonly VSettingOptionsValidator: z.ZodSchema<VSettingOptions> = z.object({
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
