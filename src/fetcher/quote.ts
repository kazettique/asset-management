'use client';

import { backendImplements } from '@/decorator';
import { QuoteTransformer } from '@/transformer';
import { GeneralResponse, Id, MQuote, PaginationBase, PQuote, PQuoteFind, VQuote } from '@/types';

@backendImplements()
export abstract class QuoteFetcher {
  public static async FindAll(): Promise<GeneralResponse<VQuote[]>> {
    const res = await fetch('/api/setting/quotes');

    const data = (await res.json()) as GeneralResponse<VQuote[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VQuote>> {
    const res = await fetch('/api/setting/quotes/' + id);

    const data = (await res.json()) as GeneralResponse<VQuote>;

    return data;
  }

  public static async FindMany(payload: PQuoteFind): Promise<PaginationBase<MQuote>> {
    const res = await fetch(
      '/api/setting/quotes?' +
        new URLSearchParams(QuoteTransformer.PQuoteFindQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MQuote>;

    return data;
  }

  public static async FindRandom(): Promise<GeneralResponse<VQuote>> {
    const res = await fetch('/api/setting/quotes/random');

    const data = (await res.json()) as GeneralResponse<VQuote>;

    return data;
  }

  public static async Create(payload: PQuote): Promise<GeneralResponse<VQuote>> {
    const res = await fetch('/api/setting/quotes', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VQuote>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VQuote>> {
    const res = await fetch('/api/setting/quotes/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VQuote>>;

    return data;
  }

  public static async Update(payload: PQuote, id: MQuote['id']): Promise<GeneralResponse<VQuote>> {
    const res = await fetch('/api/setting/quotes/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VQuote>>;

    return data;
  }
}
