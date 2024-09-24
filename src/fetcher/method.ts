'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FMethod, GeneralResponse, Id, MMethod, PaginationBase, PFindPagination, VMethod } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/methods';

@backendImplements()
export abstract class MethodFetcher {
  public static async FindAll(): Promise<GeneralResponse<VMethod[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VMethod[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VMethod>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VMethod>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VMethod>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VMethod>>(API_URL, fetchOption);
  }

  public static async Create(payload: FMethod): Promise<GeneralResponse<VMethod>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VMethod>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VMethod>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VMethod>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FMethod, id: MMethod['id']): Promise<GeneralResponse<VMethod>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VMethod>>(`${API_URL}/${id}`, fetchOption);
  }
}
