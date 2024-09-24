'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FOwner, GeneralResponse, Id, MOwner, PaginationBase, PFindPagination, VOwner } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/owners';

@backendImplements()
export abstract class OwnerFetcher {
  public static async FindAll(): Promise<GeneralResponse<VOwner[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VOwner[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VOwner>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VOwner>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VOwner>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VOwner>>(API_URL, fetchOption);
  }

  public static async Create(payload: FOwner): Promise<GeneralResponse<VOwner>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VOwner>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VOwner>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VOwner>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FOwner, id: MOwner['id']): Promise<GeneralResponse<VOwner>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VOwner>>(`${API_URL}/${id}`, fetchOption);
  }
}
