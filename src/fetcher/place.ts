'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FPlace, GeneralResponse, Id, MPlace, PaginationBase, PFindPagination, VPlace } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/places';

@backendImplements()
export abstract class PlaceFetcher {
  public static async FindAll(): Promise<GeneralResponse<VPlace[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VPlace[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VPlace>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VPlace>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VPlace>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VPlace>>(API_URL, fetchOption);
  }

  public static async Create(payload: FPlace): Promise<GeneralResponse<VPlace>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VPlace>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VPlace>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VPlace>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlace>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VPlace>>(`${API_URL}/${id}`, fetchOption);
  }
}
