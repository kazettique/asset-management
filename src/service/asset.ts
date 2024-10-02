import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { BrandConstant, CategoryConstant, CommonConstant, PlatformConstant } from '@/constant';
import { AssetRepository } from '@/repository';
import { AssetTransformer } from '@/transformer';
import {
  AssetMeta,
  DTag,
  Id,
  MAsset,
  MAssetOwnership,
  Name,
  NString,
  NType,
  PaginationBase,
  PAssetFind,
  Price,
} from '@/types';
import { Utils } from '@/utils';

import { BrandService } from './brand';
import { CategoryService } from './category';
import { ForexService } from './forex';
import { OwnershipHistoryService } from './ownershipHistory';
import { PlatformService } from './platform';

export abstract class AssetService {
  public static async FindAll(): Promise<MAsset[]> {
    const raw = await AssetRepository.FindAll();

    return raw.map((asset) => AssetTransformer.DMAssetTransformer(asset));
  }

  public static async FindMany({
    page = CommonConstant.DEFAULT_PAGE,
    pageSize = CommonConstant.DEFAULT_PAGE_SIZE,
    filters,
    sort,
  }: PAssetFind): Promise<PaginationBase<MAsset>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await AssetRepository.FindMany(pageSize, filters, sort, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((asset) => AssetTransformer.DMAssetTransformer(asset));

    return { data: parsedData, page, totalCount, totalPage };
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    const raw = await AssetRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return AssetTransformer.DMAssetTransformer(raw);
    }
  }

  public static async FindOwnership(id: Id): Promise<NType<MAssetOwnership>> {
    const raw = await AssetRepository.FindOwnership(id);

    if (raw === null) {
      return raw;
    } else {
      return AssetTransformer.DMAssetOwnershipTransformer(raw);
    }
  }

  public static async Create(
    brandId: NType<Id>,
    categoryId: NType<Id>,
    comment: NString,
    endCurrency: NType<CurrencyCode>,
    endDate: NType<Date>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    newBrand: NString,
    newCategory: NString,
    newEndPlatform: NString,
    newStartPlatform: NString,
    ownerId: Id,
    placeId: Id,
    startCurrency: NType<CurrencyCode>,
    startDate: NType<Date>,
    startMethodId: NType<Id>,
    startPlatformId: NType<Id>,
    startPrice: NType<Price>,
    tags: { connect: Pick<DTag, 'id'>[]; create: { name: string }[] },
  ): Promise<MAsset> {
    const { endForexId, endPriceInBaseCurrency, startPriceInBaseCurrency, startForexId } = await ForexService.Search(
      startCurrency,
      startDate,
      startPrice,
      endCurrency,
      endDate,
      endPrice,
    );

    let _brandId: Id = '';

    if (brandId && !newBrand) {
      _brandId = brandId;
    } else if (!brandId && newBrand) {
      const createBrand = await BrandService.Create(newBrand, BrandConstant.DEFAULT_BRAND.comment);
      _brandId = createBrand.id;
    }

    let _categoryId: Id = '';

    if (categoryId && !newCategory) {
      _categoryId = categoryId;
    } else if (!categoryId && newCategory) {
      const createCategory = await CategoryService.Create(newCategory, CategoryConstant.DEFAULT_CATEGORY.comment);
      _categoryId = createCategory.id;
    }

    let _endPlatformId: NType<Id> = null;
    let _startPlatformId: NType<Id> = null;

    if (endPlatformId && !newEndPlatform) {
      _endPlatformId = endPlatformId;
    }

    if (startPlatformId && !newStartPlatform) {
      _startPlatformId = startPlatformId;
    }

    // same new platform name
    if (
      !endPlatformId &&
      newEndPlatform &&
      !startPlatformId &&
      newStartPlatform &&
      newEndPlatform === newStartPlatform
    ) {
      const createPlatform = await PlatformService.Create(newEndPlatform, PlatformConstant.DEFAULT_PLATFORM.comment);
      _endPlatformId = createPlatform.id;
      _startPlatformId = createPlatform.id;
    } else {
      // different platform
      if (!endPlatformId && newEndPlatform) {
        const createPlatform = await PlatformService.Create(newEndPlatform, PlatformConstant.DEFAULT_PLATFORM.comment);
        _endPlatformId = createPlatform.id;
      }

      if (!startPlatformId && newStartPlatform) {
        const createPlatform = await PlatformService.Create(
          newStartPlatform,
          PlatformConstant.DEFAULT_PLATFORM.comment,
        );
        _startPlatformId = createPlatform.id;
      }
    }

    const createResponse = await AssetRepository.Create(
      _brandId,
      _categoryId,
      comment,
      endDate,
      endForexId,
      endMethodId,
      _endPlatformId,
      endPriceInBaseCurrency,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startDate,
      startForexId,
      startMethodId,
      _startPlatformId,
      startPriceInBaseCurrency,
      tags,
    );

    if (createResponse.owner && createResponse.startDate) {
      const { id, owner, startDate } = createResponse;
      await OwnershipHistoryService.Create(id, owner.id, startDate);
    }

    return AssetTransformer.DMAssetTransformer(createResponse);
  }

  public static async Delete(id: Id): Promise<MAsset> {
    const raw = await AssetRepository.Delete(id);

    return AssetTransformer.DMAssetTransformer(raw[1]);
  }

  public static async Update(
    id: MAsset['id'],
    brandId: NType<Id>,
    categoryId: NType<Id>,
    comment: NString,
    endCurrency: NType<CurrencyCode>,
    endDate: NType<Date>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    newBrand: NString,
    newCategory: NString,
    newEndPlatform: NString,
    newStartPlatform: NString,
    ownerId: Id,
    placeId: Id,
    startCurrency: NType<CurrencyCode>,
    startDate: NType<Date>,
    startMethodId: NType<Id>,
    startPlatformId: NType<Id>,
    startPrice: NType<Price>,
    tags: {
      connect: Pick<DTag, 'id'>[];
      create: { name: string }[];
    },
  ): Promise<MAsset> {
    const { endForexId, endPriceInBaseCurrency, startPriceInBaseCurrency, startForexId } = await ForexService.Search(
      startCurrency,
      startDate,
      startPrice,
      endCurrency,
      endDate,
      endPrice,
    );

    let _brandId: Id = '';

    if (brandId && !newBrand) {
      _brandId = brandId;
    } else if (!brandId && newBrand) {
      const createBrand = await BrandService.Create(newBrand, BrandConstant.DEFAULT_BRAND.comment);
      _brandId = createBrand.id;
    }

    let _categoryId: Id = '';

    if (categoryId && !newCategory) {
      _categoryId = categoryId;
    } else if (!categoryId && newCategory) {
      const createCategory = await CategoryService.Create(newCategory, CategoryConstant.DEFAULT_CATEGORY.comment);
      _categoryId = createCategory.id;
    }

    let _endPlatformId: NType<Id> = null;
    let _startPlatformId: NType<Id> = null;

    if (endPlatformId && !newEndPlatform) {
      _endPlatformId = endPlatformId;
    }

    if (startPlatformId && !newStartPlatform) {
      _startPlatformId = startPlatformId;
    }

    // same new platform name
    if (
      !endPlatformId &&
      newEndPlatform &&
      !startPlatformId &&
      newStartPlatform &&
      newEndPlatform === newStartPlatform
    ) {
      const createPlatform = await PlatformService.Create(newEndPlatform, PlatformConstant.DEFAULT_PLATFORM.comment);
      _endPlatformId = createPlatform.id;
      _startPlatformId = createPlatform.id;
    } else {
      // different platform
      if (!endPlatformId && newEndPlatform) {
        const createPlatform = await PlatformService.Create(newEndPlatform, PlatformConstant.DEFAULT_PLATFORM.comment);
        _endPlatformId = createPlatform.id;
      }

      if (!startPlatformId && newStartPlatform) {
        const createPlatform = await PlatformService.Create(
          newStartPlatform,
          PlatformConstant.DEFAULT_PLATFORM.comment,
        );
        _startPlatformId = createPlatform.id;
      }
    }

    const prevOwnerId = await this.FindOwnership(id);

    const isSameOwner: boolean = prevOwnerId?.ownerId === ownerId;

    if (ownerId && startDate && !isSameOwner) {
      await OwnershipHistoryService.Create(id, ownerId, startDate);
    }

    const raw = await AssetRepository.Update(
      id,
      _brandId,
      _categoryId,
      comment,
      endDate,
      endForexId,
      endMethodId,
      _endPlatformId,
      endPriceInBaseCurrency,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startDate,
      startForexId,
      startMethodId,
      _startPlatformId,
      startPriceInBaseCurrency,
      tags,
    );

    return AssetTransformer.DMAssetTransformer(raw);
  }
}
