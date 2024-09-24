import { CommonConstant } from '@/constant';
import { QuoteRepository } from '@/repository';
import { QuoteTransformer } from '@/transformer';
import { Id, MQuote, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class QuoteService {
  public static async FindAll(): Promise<MQuote[]> {
    const raw = await QuoteRepository.FindAll();

    return raw.map((quote) => QuoteTransformer.DMQuoteTransformer(quote));
  }

  public static async Find(id: Id): Promise<NType<MQuote>> {
    const raw = await QuoteRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return QuoteTransformer.DMQuoteTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MQuote>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await QuoteRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return { data: rawData.map((quote) => QuoteTransformer.DMQuoteTransformer(quote)), page, totalCount, totalPage };
  }

  public static async FindRandom(): Promise<NType<MQuote>> {
    const raw = await QuoteRepository.FindRandom();

    if (raw === null) {
      return raw;
    } else {
      return QuoteTransformer.DMQuoteTransformer(raw);
    }
  }

  public static async Create(quote: string, author: string): Promise<MQuote> {
    const raw = await QuoteRepository.Create(quote, author);

    return QuoteTransformer.DMQuoteTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MQuote> {
    const raw = await QuoteRepository.Delete(id);

    return QuoteTransformer.DMQuoteTransformer(raw);
  }

  public static async Update(id: MQuote['id'], quote: string, author: string): Promise<MQuote> {
    const raw = await QuoteRepository.Update(id, quote, author);

    return QuoteTransformer.DMQuoteTransformer(raw);
  }
}
