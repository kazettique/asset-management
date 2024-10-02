import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { ForexRepository } from '@/repository';
import { ForexTransformer } from '@/transformer';
import { Id, MForex, NType, PaginationBase, Price } from '@/types';
import { Utils } from '@/utils';

import { ExternalForexService } from './externalForex';

export abstract class ForexService {
  public static async FindAll(): Promise<MForex[]> {
    const raw = await ForexRepository.FindAll();

    return raw.map((forex) => ForexTransformer.DMForexTransformer(forex));
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MForex>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await ForexRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => ForexTransformer.DMForexTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Find(date: Date, targetCurrency: CurrencyCode): Promise<NType<MForex>> {
    const raw = await ForexRepository.Find(date, targetCurrency);

    if (raw === null) {
      return raw;
    } else {
      return ForexTransformer.DMForexTransformer(raw);
    }
  }

  public static async Create(date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    const raw = await ForexRepository.Create(date, targetCurrency, rate);

    return ForexTransformer.DMForexTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MForex> {
    const raw = await ForexRepository.Delete(id);

    return ForexTransformer.DMForexTransformer(raw);
  }

  public static async Update(id: MForex['id'], date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    const raw = await ForexRepository.Update(id, date, targetCurrency, rate);

    return ForexTransformer.DMForexTransformer(raw);
  }

  // TODO: need refactor
  public static async Search(
    startCurrency: NType<CurrencyCode>,
    startDate: NType<Date>,
    startPrice: NType<Price>,
    endCurrency: NType<CurrencyCode>,
    endDate: NType<Date>,
    endPrice: NType<Price>,
  ): Promise<{
    endForexId: NType<Id>;
    endPriceInBaseCurrency: NType<Price>;
    startForexId: NType<Id>;
    startPriceInBaseCurrency: NType<Price>;
  }> {
    let startForexId: NType<Id> = null;
    let endForexId: NType<Id> = null;
    let startPriceInBaseCurrency: NType<Price> = startPrice;
    let endPriceInBaseCurrency: NType<Price> = endPrice;

    // start
    if (startCurrency && startDate && startPrice !== null && startCurrency !== CommonConstant.BASE_CURRENCY) {
      // step 1: check if forex existed in database
      const findForexData = await this.Find(startDate, startCurrency);

      // step 2.1: if forex existed, calculate price & update startForexId
      if (findForexData) {
        startPriceInBaseCurrency = startPrice / findForexData.rate;
        startForexId = findForexData.id;
      } else {
        // step 2.2: otherwise, get forex from external API
        const externalForexData = await ExternalForexService.Find(startCurrency, dayjs(startDate));

        if (externalForexData && externalForexData.rate) {
          const { updatedDate, rate } = externalForexData;
          // step 3: create forex into db
          const createResponse = await this.Create(updatedDate, startCurrency, rate.rate);

          // step 4: calculate price
          startPriceInBaseCurrency = startPrice / createResponse.rate;

          // step 5: update startForexId
          startForexId = createResponse.id;
        }
      }
    }

    // end
    if (endCurrency && endDate && endPrice !== null && endCurrency !== CommonConstant.BASE_CURRENCY) {
      // step 1: check if forex existed in database
      const findForexData = await this.Find(endDate, endCurrency);

      // step 2.1: if forex existed, calculate price & update endForexId
      if (findForexData) {
        endPriceInBaseCurrency = endPrice / findForexData.rate;
        endForexId = findForexData.id;
      } else {
        // step 2.2: otherwise, get forex from external API
        const externalForexData = await ExternalForexService.Find(endCurrency, dayjs(endDate));

        if (externalForexData && externalForexData.rate) {
          const { updatedDate, rate } = externalForexData;
          // step 3: create forex into db
          const createResponse = await this.Create(updatedDate, endCurrency, rate.rate);

          // step 4: calculate price
          endPriceInBaseCurrency = endPrice / createResponse.rate;

          // step 5: update endForexId
          endForexId = createResponse.id;
        }
      }
    }

    return {
      endForexId,
      endPriceInBaseCurrency,
      startForexId,
      startPriceInBaseCurrency,
    };
  }

  public static async FindOrCreate(currency: CurrencyCode, date: Date = new Date()): Promise<NType<MForex>> {
    if (currency === 'USD') return null;

    const findForexData = await this.Find(date, currency);

    if (findForexData !== null) {
      return findForexData;
    } else {
      const externalForexData = await ExternalForexService.Find(currency, dayjs(date));

      if (externalForexData && externalForexData.rate) {
        const { updatedDate, rate } = externalForexData;

        return await this.Create(updatedDate, currency, rate.rate);
      } else {
        return null;
      }
    }
  }
}
