'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { GeneralResponse, Id, MQuote, PaginationBase, PFindPagination, PQuote, VQuote } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/quotes';

@backendImplements()
export abstract class QuoteFetcher {
  public static async FindAll(): Promise<GeneralResponse<VQuote[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VQuote[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VQuote>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VQuote>>(API_URL, fetchOption);
  }

  public static async FindRandom(): Promise<GeneralResponse<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindRandom.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VQuote>>(API_URL, fetchOption);
  }

  public static async Create(payload: PQuote): Promise<GeneralResponse<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VQuote>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VQuote>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: PQuote, id: MQuote['id']): Promise<GeneralResponse<VQuote>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VQuote>>(`${API_URL}/${id}`, fetchOption);
  }
}
