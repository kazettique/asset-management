import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommonConstant } from '@/constant';
import { DAsset, FAsset, FSettingOptions, MAsset, NString, PAsset, VAsset, VAssetTable } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export abstract class AssetTransformer {
  // db model -> model
  public static DMAssetTransformer(src: DAsset): MAsset {
    const assetValidation = AssetValidator.MAssetValidator.safeParse(src);

    if (!assetValidation.success) {
      return {
        ...src,
        meta:
          typeof src.meta === 'object' && src.meta !== null && Array.isArray(src.meta)
            ? JSON.parse(JSON.stringify(src.meta))
            : [],
      };
    } else {
      return assetValidation.data;
    }
  }

  // model -> view model
  public static MVAssetTransformer(src: MAsset): VAsset {
    return src;
  }

  // view model -> form model
  public static VFAssetTransformer(src: VAsset): FAsset {
    return {
      brandId: src.brandId ?? '',
      categoryId: src.categoryId,
      comment: src.comment ?? '',
      endCurrencyId: src.endCurrencyId ?? '',
      endDate: src.endDate,
      endMethodId: src.endMethodId ?? '',
      endPlatformId: src.endPlatformId ?? '',
      endPrice: src.endPrice ?? 0,
      isCensored: src.isCensored,
      meta: src.meta,
      name: src.name,
      newTags: [],
      ownerId: src.ownerId ?? '',
      placeId: src.placeId ?? '',
      startCurrencyId: src.startCurrencyId,
      startDate: src.startDate,
      startMethodId: src.startMethodId,
      startPlatformId: src.startPlatformId,
      startPrice: src.startPrice,
      tags: src.tags.map((item) => item.id),
    };
  }

  // form model -> request model
  public static FPAssetTransformer(src: FAsset): PAsset {
    const convertEmptyStringToNull = (str: string): NString => (str.length === 0 ? null : str);

    return {
      ...src,
      brandId: convertEmptyStringToNull(src.brandId),
      endCurrencyId: convertEmptyStringToNull(src.endCurrencyId),
      endMethodId: convertEmptyStringToNull(src.endMethodId),
      endPlatformId: convertEmptyStringToNull(src.endPlatformId),
      endPrice: src.endPrice,
      ownerId: convertEmptyStringToNull(src.ownerId),
      placeId: convertEmptyStringToNull(src.placeId),
      startDate: new Date(src.startDate),
      tags: {
        connect: src.tags.map((item) => ({ id: item })),
        create: src.newTags.map((item) => ({ name: item })),
      },
    };
  }

  // view model -> table model
  public static VTAssetTransformer(src: VAsset, settingOptions: FSettingOptions): VAssetTable {
    const findBrand = settingOptions.brands.find((_item) => _item.value === src.brandId);
    const findStartMethod = settingOptions.startMethods.find((_item) => _item.value === src.startMethodId);
    const findStartPlatform = settingOptions.platforms.find((_item) => _item.value === src.startPlatformId);
    const findEndMethod = settingOptions.endMethods.find((_item) => _item.value === src.endMethodId);
    const findEndPlatform = settingOptions.platforms.find((_item) => _item.value === src.endPlatformId);
    const findPlace = settingOptions.places.find((_item) => _item.value === src.placeId);
    const findOwner = settingOptions.owners.find((_item) => _item.value === src.ownerId);
    const findCategory = settingOptions.categories.find((_item) => _item.value === src.ownerId);

    // startDate
    const _startDate: Dayjs = dayjs(src.startDate);
    // startPrice
    const startCurrency = settingOptions.currencies.find((_item) => _item.value === src.startCurrencyId);
    // endDate
    const _endDate: Dayjs = src.endDate !== null ? dayjs(src.endDate) : dayjs();

    // endPrice
    const endCurrency = settingOptions.currencies.find((_item) => _item.value === src.endCurrencyId);

    const _priceDifference: number =
      src.startCurrencyId === src.endCurrencyId && src.endPrice ? src.startPrice - src.endPrice : src.startPrice;

    let monthlyCost: string = '';

    if (startCurrency) {
      const endDate: Dayjs = src.endDate !== null ? dayjs(src.endDate) : dayjs();
      const startDate: Dayjs = dayjs(src.startDate);
      const monthCount: number = endDate.diff(startDate, 'month');

      if (monthCount > 0) {
        monthlyCost = startCurrency.label + Utils.NumberWithCommas(Math.round(_priceDifference / monthCount));
      } else {
        monthlyCost = startCurrency.label + Utils.NumberWithCommas(_priceDifference);
      }
    }

    return {
      brand: findBrand ? findBrand.label : CommonConstant.DEFAULT_EMPTY_STRING,
      category: findCategory ? findCategory.label : CommonConstant.DEFAULT_EMPTY_STRING,
      endInfo: {
        endDate: src.endDate ? Utils.GetDateTimeString(src.endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        endMethod: findEndMethod ? findEndMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPlatform: findEndPlatform ? findEndPlatform.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPrice:
          endCurrency && src.endPrice
            ? `${endCurrency.label} ${Utils.NumberWithCommas(src.endPrice)}`
            : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      meta: src.meta,
      monthlyCost,
      name: src.name,
      owner: findOwner ? findOwner.label : CommonConstant.DEFAULT_EMPTY_STRING,
      place: findPlace ? findPlace.label : CommonConstant.DEFAULT_EMPTY_STRING,
      priceDifference: startCurrency
        ? startCurrency.label + Utils.NumberWithCommas(_priceDifference)
        : CommonConstant.DEFAULT_EMPTY_STRING,
      raw: src,
      startInfo: {
        startDate: Utils.GetDateTimeString(_startDate),
        startMethod: findStartMethod ? findStartMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPlatform: findStartPlatform ? findStartPlatform.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPrice: startCurrency
          ? `${startCurrency.label} ${Utils.NumberWithCommas(src.startPrice)}`
          : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      tags: src.tags.map((item) => item.name),
      usageTime: Utils.DetailedRelativeTime(_startDate, _endDate),
    };
  }
}
