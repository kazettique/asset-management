import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { AssetConstant, CommonConstant } from '@/constant';
import {
  AssetLifeStatus,
  DAsset,
  FAsset,
  FAssetFindPrimaryFilter,
  FAssetFindSecondaryFilter,
  FAssetImport,
  FormOption,
  FSettingOptions,
  MAsset,
  NString,
  NType,
  PAsset,
  PAssetFind,
  PAssetFindFilter,
  VAsset,
  VAssetImportItem,
  VAssetTable,
} from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

import { CommonTransformer } from './common';

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
  public static VFAssetTransformer(
    src: VAsset,
    settingOptions: FSettingOptions,
    currencyCodeOptions: FormOption[],
  ): FAsset {
    const convert = (_src: { id: string; name: string }): FormOption => ({ label: _src.name, value: _src.id });

    const findBrand = settingOptions.brands.find((_item) => _item.value === src.brand?.id);
    const findStartMethod = settingOptions.startMethods.find((_item) => _item.value === src.startMethod?.id);
    const findStartPlatform = settingOptions.platforms.find((_item) => _item.value === src.startPlatform?.id);
    const findEndMethod = settingOptions.endMethods.find((_item) => _item.value === src.endMethod?.id);
    const findEndPlatform = settingOptions.platforms.find((_item) => _item.value === src.endPlatform?.id);
    const findPlace = settingOptions.places.find((_item) => _item.value === src.place?.id);
    const findOwner = settingOptions.owners.find((_item) => _item.value === src.owner?.id);
    const findCategory = settingOptions.categories.find((_item) => _item.value === src.category?.id);
    const findStartCurrency = currencyCodeOptions.find(
      (_item) => _item.value === src.startExchangeRate?.targetCurrency,
    );
    const findEndCurrency = currencyCodeOptions.find((_item) => _item.value === src.endExchangeRate?.targetCurrency);

    return {
      brandId: findBrand || null,
      categoryId: findCategory || null,
      comment: src.comment ?? '',
      endCurrency: findStartCurrency ?? null,
      endDate: src.endDate,
      endMethodId: findEndMethod || null,
      endPlatformId: findEndPlatform || null,
      endPrice: src.endPrice !== null ? String(src.endPrice) : '',
      isCensored: src.isCensored,
      meta: src.meta,
      name: src.name,
      ownerId: findOwner || null,
      placeId: findPlace || null,
      startCurrency: findEndCurrency ?? null,
      startDate: src.startDate,
      startMethodId: findStartMethod || null,
      startPlatformId: findStartPlatform || null,
      startPrice: src.startPrice !== null ? String(src.startPrice) : '',
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
      categoryId: convertEmptyStringToNull(src.categoryId),
      endCurrency: src.endCurrency !== null ? src.endCurrency.value : null,
      endMethodId: convertEmptyStringToNull(src.endMethodId),
      endPlatformId: convertEmptyStringToNull(src.endPlatformId),
      endPrice: src.endPrice.length > 0 ? Number(src.endPrice) : null,
      meta: src.meta ?? [],
      ownerId: convertEmptyStringToNull(src.ownerId),
      placeId: convertEmptyStringToNull(src.placeId),
      startCurrency: src.startCurrency !== null ? src.startCurrency.value : null,
      startMethodId: convertEmptyStringToNull(src.startMethodId),
      startPlatformId: convertEmptyStringToNull(src.startPlatformId),
      startPrice: src.startPrice.length > 0 ? Number(src.startPrice) : null,
      tags: {
        connect: src.tags.filter((item) => !item.__isNew__).map((item) => ({ id: String(item.value) })),
        create: src.tags.filter((item) => item.__isNew__ === true).map((item) => ({ name: item.label })),
      },
    };
  }

  // view model -> table model
  public static VTAssetTransformer(src: VAsset): VAssetTable {
    // startDate
    const _startDate: NType<Dayjs> = src.startDate !== null ? dayjs(src.startDate) : null;
    // endDate
    const _endDate: NType<Dayjs> = src.endDate !== null ? dayjs(src.endDate) : null;

    const _priceDifference: number = src.endPrice && src.startPrice ? src.startPrice - src.endPrice : 0;

    let monthlyCost: string = '';

    if (src.startExchangeRate) {
      const endDate: Dayjs = src.endDate !== null ? dayjs(src.endDate) : dayjs();
      const startDate: Dayjs = dayjs(src.startDate);
      const monthCount: number = endDate.diff(startDate, 'month');

      if (monthCount > 0) {
        const calculateMonthlyCost = Utils.NumberWithCommas(Math.round(_priceDifference / monthCount));
        monthlyCost = `(${src.startExchangeRate.targetCurrency}) ${calculateMonthlyCost}`;
      } else {
        const calculateMonthlyCost = Utils.NumberWithCommas(_priceDifference);
        monthlyCost = `(${src.startExchangeRate.targetCurrency}) ${calculateMonthlyCost}`;
      }
    }

    let displayEndPrice: string = CommonConstant.DEFAULT_EMPTY_STRING;

    if (src.endPrice) {
      if (src.endExchangeRate) {
        const calculatedEndPrice: number = src.endExchangeRate.rate * src.endPrice;
        displayEndPrice = `(${src.endExchangeRate.targetCurrency}) ${Utils.NumberWithCommas(calculatedEndPrice)}`;
      } else {
        // TODO: abstract to constant?
        displayEndPrice = `(USD) ${Utils.NumberWithCommas(src.endPrice)}`;
      }
    }

    let displayStartPrice: string = CommonConstant.DEFAULT_EMPTY_STRING;

    if (src.startPrice) {
      if (src.startExchangeRate) {
        const calculatedStartPrice: number = src.startExchangeRate.rate * src.startPrice;
        displayStartPrice = `(${src.startExchangeRate.targetCurrency}) ${Utils.NumberWithCommas(calculatedStartPrice)}`;
      } else {
        // TODO: abstract to constant?
        displayStartPrice = `(USD) ${Utils.NumberWithCommas(src.startPrice)}`;
      }
    }

    return {
      brand: src.brand ? src.brand.name : CommonConstant.DEFAULT_EMPTY_STRING,
      category: src.category ? src.category.name : CommonConstant.DEFAULT_EMPTY_STRING,
      comment: src.comment ?? '',
      endInfo: {
        endDate: src.endDate ? Utils.GetDateTimeString(src.endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        endMethod: src.endMethod ? src.endMethod.name : CommonConstant.DEFAULT_EMPTY_STRING,
        endPlatform: src.endPlatform ? src.endPlatform.name : CommonConstant.DEFAULT_EMPTY_STRING,
        endPrice: displayEndPrice,
      },
      meta: src.meta ?? [],
      monthlyCost,
      name: src.name,
      owner: src.owner ? src.owner.name : CommonConstant.DEFAULT_EMPTY_STRING,
      place: src.place ? src.place.name : CommonConstant.DEFAULT_EMPTY_STRING,
      priceDifference: Utils.NumberWithCommas(_priceDifference),
      raw: src,
      startInfo: {
        startDate: _startDate ? Utils.GetDateTimeString(_startDate) : CommonConstant.DEFAULT_EMPTY_STRING,
        startMethod: src.startMethod ? src.startMethod.name : CommonConstant.DEFAULT_EMPTY_STRING,
        startPlatform: src.startPlatform ? src.startPlatform.name : CommonConstant.DEFAULT_EMPTY_STRING,
        startPrice: displayStartPrice,
      },
      tags: src.tags.map((item) => item.name),
      usageTime:
        _startDate && _endDate ? Utils.DetailedRelativeTime(_startDate, _endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
    };
  }

  public static VAssetImportTransformer(importItem: VAssetImportItem, importFormValues: FAssetImport): PAsset {
    const asset: FAsset = {
      ...importItem,
      ...importFormValues,
      endDate: importItem.endDate ? dayjs(importItem.endDate).toDate() : null,
      endPrice: importItem.endPrice,
      startDate: importItem.startDate ? dayjs(importItem.startDate).toDate() : null,
      startPrice: importItem.startPrice,
    };

    return this.FPAssetTransformer(asset);
  }

  public static PAssetFindTransformer(src: {
    filters: NString;
    page: NString;
    pageSize: NString;
    sort: NString;
  }): PAssetFind {
    const parsedFilters: PAssetFind['filters'] =
      src.filters !== null
        ? src.filters
            .split(',')
            .filter((item) => item.length > 0)
            .map((item) => item.split(':'))
            .filter((item) => item.length === 2)
            .reduce<PAssetFind['filters']>(
              (acc, curr, _index, _arr) => {
                if (curr[0] === 'lifeStatus') {
                  return { ...acc, [curr[0]]: curr[1] as AssetLifeStatus };
                } else if (curr[0] === 'startDateRange' || curr[0] === 'endDateRange') {
                  const _value = curr[1].split('|').map((item) => {
                    try {
                      return JSON.parse(item);
                    } catch (error) {
                      return dayjs(item).toDate();
                    }
                  });
                  return { ...acc, [curr[0]]: [_value[0], _value[1]] };
                } else if (curr[0] === 'startPriceRange' || curr[0] === 'endPriceRange') {
                  const _value = curr[1].split('|').map((item) => {
                    try {
                      return JSON.parse(item);
                    } catch (error) {
                      return Number(item);
                    }
                  });
                  return { ...acc, [curr[0]]: [_value[0], _value[1]] };
                } else {
                  return { ...acc, [curr[0]]: curr[1].split('|').filter((_item) => _item.length > 0) };
                }
              },

              {},
            )
        : {};

    let parsedSort: PAssetFind['sort'] | undefined = undefined;
    if (src.sort !== null) {
      const _parse = src.sort.split('|');
      parsedSort = { key: _parse[0], order: _parse[1] } as unknown as PAssetFind['sort'];
    }

    return {
      filters: parsedFilters,
      page: src.page === null ? AssetConstant.P_ASSET_FIND_DEFAULT.page : Number(src.page),
      pageSize: src.pageSize === null ? AssetConstant.P_ASSET_FIND_DEFAULT.pageSize : Number(src.pageSize),
      sort: parsedSort,
    };
  }

  public static PAssetFindQueryStringTransformer(src: PAssetFind): Record<string, string> {
    // TODO: need refactor this
    const parsedFilters = Object.entries(src.filters).reduce<string>((acc, curr, _index, _arr) => {
      const [key, value] = curr;
      let _value: string;

      if (Array.isArray(value)) {
        _value = value.map((item) => (item instanceof Date ? Utils.GetDateTimeString(item) : String(item))).join('|');
      } else {
        _value = value;
      }

      if (acc.length === 0) return [key, _value].join(':');
      if (Array.isArray(value) && value.length === 0) return acc;

      const newValue = [key, _value].join(':');
      return [acc, newValue].join(',');
    }, '');

    return {
      filters: parsedFilters,
      page: String(src.page),
      pageSize: String(src.pageSize),
    };
  }

  public static FPAssetFindPrimaryFilterTransformer(
    src: FAssetFindPrimaryFilter,
  ): Pick<PAssetFindFilter, 'categories' | 'lifeStatus' | 'owners'> {
    return {
      categories: src.categories,
      lifeStatus: src.lifeStatus,
      owners: src.owners,
    };
  }

  public static FPAssetFindSecondaryFilterTransformer(
    src: FAssetFindSecondaryFilter,
  ): Omit<PAssetFindFilter, 'categories' | 'lifeStatus' | 'owners'> {
    return {
      brands: src.brands.map(CommonTransformer.ConvertFormOptionToId),
      endDateRange: [
        src.endDateRange[0].length > 0 ? dayjs(src.endDateRange[0]).toDate() : null,
        src.endDateRange[1].length > 0 ? dayjs(src.endDateRange[1]).toDate() : null,
      ],
      endMethods: src.endMethods.map(CommonTransformer.ConvertFormOptionToId),
      endPlatforms: src.endPlatforms.map(CommonTransformer.ConvertFormOptionToId),
      endPriceRange: [
        src.endPriceRange[0].length > 0 ? Number(src.endPriceRange[0]) : null,
        src.endPriceRange[1].length > 0 ? Number(src.endPriceRange[1]) : null,
      ],
      places: src.places.map(CommonTransformer.ConvertFormOptionToId),
      startDateRange: [
        src.startDateRange[0].length > 0 ? dayjs(src.startDateRange[0]).toDate() : null,
        src.startDateRange[1].length > 0 ? dayjs(src.startDateRange[1]).toDate() : null,
      ],
      startMethods: src.startMethods.map(CommonTransformer.ConvertFormOptionToId),
      startPlatforms: src.startPlatforms.map(CommonTransformer.ConvertFormOptionToId),
      startPriceRange: [
        src.startPriceRange[0].length > 0 ? Number(src.startPriceRange[0]) : null,
        src.startPriceRange[1].length > 0 ? Number(src.startPriceRange[1]) : null,
      ],
    };
  }
}
