import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { ForexRepository } from '@/repository';
import { Id, MForex, NType, Price } from '@/types';

import { ExternalForexService } from './externalForex';

export abstract class ForexService {
  public static async FindAll(): Promise<MForex[]> {
    return await ForexRepository.FindAll();
  }

  // TODO: add find many later (with pagination)

  public static async Find(date: Date, targetCurrency: CurrencyCode): Promise<NType<MForex>> {
    return await ForexRepository.Find(date, targetCurrency);
  }

  public static async Create(date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    return await ForexRepository.Create(date, targetCurrency, rate);
  }

  public static async Delete(id: Id): Promise<MForex> {
    return await ForexRepository.Delete(id);
  }

  public static async Update(id: MForex['id'], date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    return await ForexRepository.Update(id, date, targetCurrency, rate);
  }

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
    if (startCurrency && startDate && startPrice && startCurrency !== CommonConstant.BASE_CURRENCY) {
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
    if (endCurrency && endDate && endPrice && endCurrency !== CommonConstant.BASE_CURRENCY) {
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
}
