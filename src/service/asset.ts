import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { CommonConstant } from '@/constant';
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

import { ForexService } from './forex';
import { OwnershipHistoryService } from './ownershipHistory';

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
    brandId: Id,
    categoryId: Id,
    comment: NString,
    endCurrency: NType<CurrencyCode>,
    endDate: NType<Date>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
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

    const createResponse = await AssetRepository.Create(
      brandId,
      categoryId,
      comment,
      endDate,
      endForexId,
      endMethodId,
      endPlatformId,
      endPriceInBaseCurrency,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startDate,
      startForexId,
      startMethodId,
      startPlatformId,
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
    brandId: Id,
    categoryId: Id,
    comment: NString,
    endCurrency: NType<CurrencyCode>,
    endDate: NType<Date>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
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

    const prevOwnerId = await this.FindOwnership(id);

    const isSameOwner: boolean = prevOwnerId?.ownerId === ownerId;

    if (ownerId && startDate && !isSameOwner) {
      await OwnershipHistoryService.Create(id, ownerId, startDate);
    }

    const raw = await AssetRepository.Update(
      id,
      brandId,
      categoryId,
      comment,
      endDate,
      endForexId,
      endMethodId,
      endPlatformId,
      endPriceInBaseCurrency,
      isCensored,
      meta,
      name,
      ownerId,
      placeId,
      startDate,
      startForexId,
      startMethodId,
      startPlatformId,
      startPriceInBaseCurrency,
      tags,
    );

    return AssetTransformer.DMAssetTransformer(raw);
  }
}
