'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { FBrand, GeneralResponse, Id, MBrand, PaginationBase, PFindPagination, VBrand } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting/brands';

@backendImplements()
export abstract class BrandFetcher {
  public static async FindAll(): Promise<GeneralResponse<VBrand[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VBrand[]>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VBrand>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VBrand>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<VBrand>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: payload,
    });

    return await ofetch<PaginationBase<VBrand>>(API_URL, fetchOption);
  }

  public static async Create(payload: FBrand): Promise<GeneralResponse<VBrand>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VBrand>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VBrand>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VBrand>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: FBrand, id: MBrand['id']): Promise<GeneralResponse<VBrand>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VBrand>>(`${API_URL}/${id}`, fetchOption);
  }
}
