import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommonConstant } from '@/constant';
import { DAsset, FAsset, FSettingOptions, MAsset, RAsset, TAsset, VAsset } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

dayjs.extend(relativeTime);
dayjs.extend(duration);
export abstract class AssetTransformer {
  // db model -> model
  public static DAssetTransformer(src: DAsset): MAsset {
    const assetValidation = AssetValidator.MAssetValidator.safeParse(src);

    if (!assetValidation.success) {
      return {
        ...src,
        meta: typeof src.meta === 'object' && src.meta !== null && !Array.isArray(src.meta) ? src.meta : {},
        name:
          typeof src.name === 'object' && src.name !== null && !Array.isArray(src.name)
            ? { ...src.name, ...CommonConstant.DEFAULT_NAME }
            : CommonConstant.DEFAULT_NAME,
      };
    } else {
      return assetValidation.data;
    }
  }

  // model -> view model
  public static MAssetTransformer(src: MAsset): VAsset {
    return src;
  }

  // view model -> form model
  public static VAssetTransformer(src: VAsset): FAsset {
    return {
      brandId: src.brandId,
      categoryId: src.categoryId,
      comment: src.comment ?? '',
      endCurrencyId: src.endCurrencyId ?? '',
      endDate: src.endDate,
      endMethodId: src.endMethodId ?? '',
      endPlaceId: src.endPlaceId ?? '',
      endPrice: src.endPrice ?? 0,
      isCensored: src.isCensored,
      meta: src.meta,
      name: src.name,
      startCurrencyId: src.startCurrencyId,
      startDate: src.startDate,
      startMethodId: src.startMethodId,
      startPlaceId: src.startPlaceId,
      startPrice: src.startPrice,
    };
  }

  // form model -> request model
  public static FAssetTransformer(src: FAsset): RAsset {
    return {
      ...src,
      endCurrencyId: src.endCurrencyId.length === 0 ? null : src.endCurrencyId,
      endMethodId: src.endMethodId.length === 0 ? null : src.endMethodId,
      endPlaceId: src.endPlaceId.length === 0 ? null : src.endPlaceId,
      endPrice: src.endPrice,
      startDate: new Date(src.startDate),
    };
  }

  // view model -> table model
  public static VTAssetTransformer(src: VAsset, settingOptions: FSettingOptions): TAsset {
    const findBrand = settingOptions.brands.find((_item) => _item.value === src.brandId);
    const findStartMethod = settingOptions.startMethods.find((_item) => _item.value === src.startMethodId);
    const findStartPlace = settingOptions.places.find((_item) => _item.value === src.startPlaceId);
    const findEndMethod = settingOptions.endMethods.find((_item) => _item.value === src.endMethodId);
    const findEndPlace = settingOptions.places.find((_item) => _item.value === src.endPlaceId);

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
      endInfo: {
        endDate: src.endDate ? Utils.GetDateTimeString(src.endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        endMethod: findEndMethod ? findEndMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPlace: findEndPlace ? findEndPlace.label : CommonConstant.DEFAULT_EMPTY_STRING,
        endPrice:
          endCurrency && src.endPrice
            ? `${endCurrency.label} ${Utils.NumberWithCommas(src.endPrice)}`
            : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      meta: src.meta,
      monthlyCost,
      name: src.name,
      priceDifference: startCurrency
        ? startCurrency.label + Utils.NumberWithCommas(_priceDifference)
        : CommonConstant.DEFAULT_EMPTY_STRING,
      raw: src,
      startInfo: {
        startDate: Utils.GetDateTimeString(_startDate),
        startMethod: findStartMethod ? findStartMethod.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPlace: findStartPlace ? findStartPlace.label : CommonConstant.DEFAULT_EMPTY_STRING,
        startPrice: startCurrency
          ? `${startCurrency.label} ${Utils.NumberWithCommas(src.startPrice)}`
          : CommonConstant.DEFAULT_EMPTY_STRING,
      },
      usageTime: Utils.DetailedRelativeTime(_startDate, _endDate),
    };
  }
}
