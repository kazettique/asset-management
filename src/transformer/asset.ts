import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommonConstant } from '@/constant';
import {
  DAsset,
  FAsset,
  FormOption,
  FSettingOptions,
  MAsset,
  NString,
  NType,
  PAsset,
  PAssetFind,
  VAsset,
  VAssetImportItem,
  VAssetTable,
} from '@/types';
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
  public static VFAssetTransformer(src: VAsset, settingOptions: FSettingOptions): FAsset {
    const convert = (_src: { id: string; name: string }): FormOption => ({ label: _src.name, value: _src.id });

    const findBrand = settingOptions.brands.find((_item) => _item.value === src.brandId);
    const findStartMethod = settingOptions.startMethods.find((_item) => _item.value === src.startMethodId);
    const findStartPlatform = settingOptions.platforms.find((_item) => _item.value === src.startPlatformId);
    const findStartCurrencyId = settingOptions.currencies.find((_item) => _item.value === src.startCurrencyId);
    const findEndMethod = settingOptions.endMethods.find((_item) => _item.value === src.endMethodId);
    const findEndPlatform = settingOptions.platforms.find((_item) => _item.value === src.endPlatformId);
    const findEndCurrencyId = settingOptions.currencies.find((_item) => _item.value === src.endCurrencyId);
    const findPlace = settingOptions.places.find((_item) => _item.value === src.placeId);
    const findOwner = settingOptions.owners.find((_item) => _item.value === src.ownerId);
    const findCategory = settingOptions.categories.find((_item) => _item.value === src.ownerId);

    return {
      brandId: findBrand || CommonConstant.DEFAULT_SELECT_OPTION,
      categoryId: findCategory || CommonConstant.DEFAULT_SELECT_OPTION,
      comment: src.comment ?? '',
      endCurrencyId: findEndCurrencyId || CommonConstant.DEFAULT_SELECT_OPTION,
      endDate: src.endDate,
      endMethodId: findEndMethod || CommonConstant.DEFAULT_SELECT_OPTION,
      endPlatformId: findEndPlatform || CommonConstant.DEFAULT_SELECT_OPTION,
      endPrice: src.endPrice ?? 0,
      isCensored: src.isCensored,
      meta: src.meta,
      name: src.name,
      ownerId: findOwner || CommonConstant.DEFAULT_SELECT_OPTION,
      placeId: findPlace || CommonConstant.DEFAULT_SELECT_OPTION,
      startCurrencyId: findStartCurrencyId || CommonConstant.DEFAULT_SELECT_OPTION,
      startDate: src.startDate,
      startMethodId: findStartMethod || CommonConstant.DEFAULT_SELECT_OPTION,
      startPlatformId: findStartPlatform || CommonConstant.DEFAULT_SELECT_OPTION,
      startPrice: src.startPrice ?? 0,
      tags: src.tags.map((item) => convert(item)),
    };
  }

  // form model -> request model
  public static FPAssetTransformer(src: FAsset): PAsset {
    const convertEmptyStringToNull = (option: NType<FormOption>): NString =>
      option === null ? null : String(option.value);

    return {
      ...src,
      brandId: convertEmptyStringToNull(src.brandId),
      categoryId: String(src.categoryId.value),
      endCurrencyId: convertEmptyStringToNull(src.endCurrencyId),
      endMethodId: convertEmptyStringToNull(src.endMethodId),
      endPlatformId: convertEmptyStringToNull(src.endPlatformId),
      endPrice: src.endPrice,
      meta: src.meta ?? [],
      ownerId: convertEmptyStringToNull(src.ownerId),
      placeId: convertEmptyStringToNull(src.placeId),
      startCurrencyId: convertEmptyStringToNull(src.startCurrencyId),
      startMethodId: convertEmptyStringToNull(src.startMethodId),
      startPlatformId: convertEmptyStringToNull(src.startPlatformId),
      tags: {
        connect: src.tags.filter((item) => !item.__isNew__).map((item) => ({ id: String(item.value) })),
        create: src.tags.filter((item) => item.__isNew__ === true).map((item) => ({ name: item.label })),
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
    const findCategory = settingOptions.categories.find((_item) => _item.value === src.categoryId);

    // startDate
    const _startDate: NType<Dayjs> = src.startDate !== null ? dayjs(src.startDate) : null;
    // startPrice
    const startCurrency = settingOptions.currencies.find((_item) => _item.value === src.startCurrencyId);
    // endDate
    const _endDate: NType<Dayjs> = src.endDate !== null ? dayjs(src.endDate) : null;

    // endPrice
    const endCurrency = settingOptions.currencies.find((_item) => _item.value === src.endCurrencyId);

    const _priceDifference: number =
      src.startCurrencyId === src.endCurrencyId && src.endPrice && src.startPrice ? src.startPrice - src.endPrice : 0;

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
      comment: src.comment ?? '',
      endInfo: {
        endDate: src.endDate ? Utils.GetDateTimeString(src.endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        endMethod: findEndMethod ? findEndMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPlatform: findEndPlatform ? findEndPlatform.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPrice:
          endCurrency && src.endPrice
            ? `${endCurrency.label} ${Utils.NumberWithCommas(src.endPrice)}`
            : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      meta: src.meta ?? [],
      monthlyCost,
      name: src.name,
      owner: findOwner ? findOwner.label : CommonConstant.DEFAULT_EMPTY_STRING,
      place: findPlace ? findPlace.label : CommonConstant.DEFAULT_EMPTY_STRING,
      priceDifference: startCurrency
        ? startCurrency.label + Utils.NumberWithCommas(_priceDifference)
        : CommonConstant.DEFAULT_EMPTY_STRING,
      raw: src,
      startInfo: {
        startDate: _startDate ? Utils.GetDateTimeString(_startDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        startMethod: findStartMethod ? findStartMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPlatform: findStartPlatform ? findStartPlatform.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPrice:
          startCurrency && src.startPrice
            ? `${startCurrency.label} ${Utils.NumberWithCommas(src.startPrice)}`
            : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      tags: src.tags.map((item) => item.name),
      usageTime:
        _startDate && _endDate ? Utils.DetailedRelativeTime(_startDate, _endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
    };
  }

  // TODO: delete after import feature is finished
  public static VAssetImportTransformer(src: VAssetImportItem): any {
    return {
      ...src,
      brandId: '46241c99-a7f3-49d3-b2f1-6d2916b32e09',
      categoryId: '28c40ba8-55c5-4171-a317-824c6aba09b3',
      endCurrencyId: '8c468df4-bc10-4f2f-91f3-6bba0ed94d4e',
      endDate: src.endDate ? dayjs(src.endDate).toDate() : null,
      endMethodId: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
      endPlatformId: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
      endPrice: src.endPrice ? Number(src.endPrice) : 0,
      isCensored: false,
      meta: [],
      ownerId: '59efb179-59f0-4e89-99e1-027ae46d187a',
      placeId: '21a1d59e-c69d-4ec9-b7d4-304c7e216aa0',
      startCurrencyId: '8c468df4-bc10-4f2f-91f3-6bba0ed94d4e',
      startDate: src.startDate ? dayjs(src.startDate).toDate() : null,
      startMethodId: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
      startPlatformId: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
      startPrice: src.startPrice ? Number(src.startPrice) : 0,
    };
  }

  public static PAssetFindTransformer(src: Record<string, any>): PAssetFind {
    return {
      page: src.page ? Number(src.page) : 1,
      pageSize: src.pageSize ? Number(src.pageSize) : 10,
    };
  }
}
