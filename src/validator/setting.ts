import { z } from 'zod';

import { DSetting, DSettingOptions, MSetting, MSettingOptions, SettingKey, VSetting, VSettingOptions } from '@/types';
import { PSetting } from '@/types/payloadModels/setting';

import { BrandValidator } from './brand';
import { CategoryValidator } from './category';
import { CommonValidator } from './common';
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

  public static readonly DSettingValidator: z.ZodSchema<DSetting> = z.object({
    id: CommonValidator.IdValidator,
    key: z.string(),
    value: z.record(z.string(), z.any()),
  });

  public static readonly MSettingValidator: z.ZodSchema<MSetting> = z.object({
    id: CommonValidator.IdValidator,
    key: z.nativeEnum(SettingKey),
    value: z.any(),
  });

  public static readonly VSettingValidator: z.ZodSchema<VSetting> = z.object({
    [SettingKey.DISPLAY_FOREX]: z.string(),
    [SettingKey.CURRENCY_OPTION_LIST]: z.string().array(),
    [SettingKey.SHOW_CENSOR_ASSET]: z.boolean(),
  });

  public static readonly PSettingValidator: z.ZodSchema<PSetting> = this.MSettingValidator;
}
