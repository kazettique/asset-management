import { z } from 'zod';

import {
  DSetting,
  DSettingOptions,
  FSetting,
  MSetting,
  MSettingOptions,
  SettingKey,
  VSetting,
  VSettingOptions,
} from '@/types';
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

  public static readonly MSettingValidator: z.ZodSchema<MSetting> = z
    .object({
      id: CommonValidator.IdValidator,
      key: z.literal(SettingKey.DISPLAY_FOREX),
      value: z.string(),
    })
    .or(
      z.object({
        id: CommonValidator.IdValidator,
        key: z.literal(SettingKey.CURRENCY_OPTION_LIST),
        value: z.string().array(),
      }),
    )
    .or(
      z.object({
        id: CommonValidator.IdValidator,
        key: z.literal(SettingKey.SHOW_CENSOR_ASSET),
        value: z.boolean(),
      }),
    );

  public static readonly VSettingValidator: z.ZodSchema<VSetting> = this.MSettingValidator;

  public static readonly PSettingValidator: z.ZodSchema<PSetting> = z
    .object({
      value: z.string(),
    })
    .or(
      z.object({
        value: z.string().array(),
      }),
    )
    .or(
      z.object({
        value: z.boolean(),
      }),
    );

  public static readonly FSettingValidator: z.ZodSchema<FSetting> = z
    .object({
      key: z.literal(SettingKey.DISPLAY_FOREX),
      value: z.string(),
    })
    .or(
      z.object({
        key: z.literal(SettingKey.CURRENCY_OPTION_LIST),
        value: z.string().array(),
      }),
    )
    .or(
      z.object({
        key: z.literal(SettingKey.SHOW_CENSOR_ASSET),
        value: z.boolean(),
      }),
    );
}
