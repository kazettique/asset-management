'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FPlace, GeneralResponse, Id, MPlace, PaginationBase, PFindPagination, VPlatform } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/platforms';

@backendImplements()
export abstract class PlatformFetcher {
  public static async FindAll(): Promise<GeneralResponse<VPlatform[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VPlatform[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VPlatform>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VPlatform>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VPlatform>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VPlatform>>(API_URL, fetchOption);
  }

  public static async Create(payload: FPlace): Promise<GeneralResponse<VPlatform>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VPlatform>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VPlatform>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VPlatform>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlatform>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VPlatform>>(`${API_URL}/${id}`, fetchOption);
  }
}
