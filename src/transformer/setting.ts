import { MethodType } from '@prisma/client';
import { FetchServerResponseResult } from 'next/dist/client/components/router-reducer/fetch-server-response';

import {
  DSetting,
  DSettingOptions,
  FSetting,
  FSettingOptions,
  MBrand,
  MCategory,
  MMethod,
  MOwner,
  MPlace,
  MPlatform,
  MSetting,
  MSettingOptions,
  MTag,
  SettingKey,
  VSetting,
  VSettingOptions,
  VSettingTable,
} from '@/types';

import { BrandTransformer } from './brand';
import { CategoryTransformer } from './category';
import { MethodTransformer } from './method';
import { OwnerTransformer } from './owner';
import { PlaceTransformer } from './place';
import { PlatformTransformer } from './platform';
import { TagTransformer } from './tag';

export abstract class SettingTransformer {
  public static DMSettingOptionsTransformer(src: DSettingOptions): MSettingOptions {
    return {
      brands: src.brands.map((item) => BrandTransformer.DMBrandTransformer(item)),
      categories: src.categories.map((item) => CategoryTransformer.DMCategoryTransformer(item)),
      methods: src.methods.map((item) => MethodTransformer.DMMethodTransformer(item)),
      owners: src.owners.map((item) => OwnerTransformer.DMOwnerTransformer(item)),
      places: src.places.map((item) => PlaceTransformer.DMPlaceTransformer(item)),
      platforms: src.places.map((item) => PlatformTransformer.DMPlatformTransformer(item)),
      tags: src.tags.map((item) => TagTransformer.DMTagTransformer(item)),
    };
  }

  public static MVSettingOptionsTransformer(src: MSettingOptions): VSettingOptions {
    return {
      brands: src.brands,
      categories: src.categories,
      endMethods: src.methods.filter((item) => item.type !== MethodType.START),
      owners: src.owners,
      places: src.places,
      platforms: src.platforms,
      startMethods: src.methods.filter((item) => item.type !== MethodType.END),
      tags: src.tags,
    };
  }

  public static FSettingOptionsTransformer(src: VSettingOptions): FSettingOptions {
    const parseOptions = (_item: MBrand | MCategory | MMethod | MOwner | MPlace | MPlatform | MTag) => ({
      label: _item.name,
      value: _item.id,
    });

    return {
      brands: src.brands.map((item) => parseOptions(item)),
      categories: src.categories.map((item) => parseOptions(item)),
      endMethods: src.endMethods.map((item) => parseOptions(item)),
      owners: src.owners.map((item) => parseOptions(item)),
      places: src.places.map((item) => parseOptions(item)),
      platforms: src.platforms.map((item) => parseOptions(item)),
      startMethods: src.startMethods.map((item) => parseOptions(item)),
      tags: src.tags.map((item) => parseOptions(item)),
    };
  }

  public static DMSettingTransformer(src: DSetting): MSetting {
    return {
      id: src.id,
      key: src.key as SettingKey,
      value: src.value as any,
    };
  }

  public static MVSettingTransformer(src: MSetting): VSetting {
    return src;
  }

  public static VTSettingTransformer(src: VSetting): VSettingTable {
    return {
      key: src.key,
      raw: src,
      value: src.value,
    };
  }

  public static VFSettingTransformer(src: VSetting): FSetting {
    return {
      key: src.key,
      value: src.value,
    } as FSetting;
  }
}
