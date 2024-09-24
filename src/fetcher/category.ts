'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FCategory, GeneralResponse, Id, MCategory, PaginationBase, PFindPagination, VCategory } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/categories';

@backendImplements()
export abstract class CategoryFetcher {
  public static async FindAll(): Promise<GeneralResponse<VCategory[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VCategory[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VCategory>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VCategory>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VCategory>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VCategory>>(API_URL, fetchOption);
  }

  public static async Create(payload: FCategory): Promise<GeneralResponse<VCategory>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VCategory>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VCategory>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VCategory>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FCategory, id: MCategory['id']): Promise<GeneralResponse<VCategory>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VCategory>>(`${API_URL}/${id}`, fetchOption);
  }
}
