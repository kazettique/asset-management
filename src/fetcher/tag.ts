'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FTag, GeneralResponse, Id, MTag, PaginationBase, PFindPagination, VTag } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/tags';

@backendImplements()
export abstract class TagFetcher {
  public static async FindAll(): Promise<GeneralResponse<VTag[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VTag[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VTag>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VTag>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VTag>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VTag>>(API_URL, fetchOption);
  }

  public static async Create(payload: FTag): Promise<GeneralResponse<VTag>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VTag>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VTag>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VTag>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FTag, id: MTag['id']): Promise<GeneralResponse<VTag>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VTag>>(`${API_URL}/${id}`, fetchOption);
  }
}
