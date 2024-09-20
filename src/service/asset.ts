import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { AssetRepository } from '@/repository';
import { AssetMeta, DTag, Id, MAsset, Name, NString, NType, PaginationBase, PAssetFind, Price } from '@/types';

import { ForexService } from './forex';

export abstract class AssetService {
  public static async FindAll(): Promise<MAsset[]> {
    return await AssetRepository.FindAll();
  }

  public static async FindMany(payload: PAssetFind): Promise<PaginationBase<MAsset>> {
    return await AssetRepository.FindMany(payload);
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    return await AssetRepository.Find(id);
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
    ownerId: NType<Id>,
    placeId: NType<Id>,
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

    return await AssetRepository.Create(
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
  }

  public static async Delete(id: Id): Promise<MAsset> {
    return await AssetRepository.Delete(id);
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
    ownerId: NType<Id>,
    placeId: NType<Id>,
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

    return await AssetRepository.Update(
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
  }
}
