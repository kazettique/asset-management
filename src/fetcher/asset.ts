'use client';

import { ofetch } from 'ofetch';

import { backendImplements } from '@/decorator';
import { AssetTransformer } from '@/transformer';
import { GeneralResponse, Id, MAsset, PaginationBase, PAsset, PAssetFind, VAsset } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'assets';

@backendImplements()
export abstract class AssetFetcher {
  public static async FindAll(): Promise<GeneralResponse<VAsset[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VAsset[]>>(API_URL, fetchOption);
  }

  public static async FindMany(payload: PAssetFind): Promise<PaginationBase<VAsset>> {
    const parseQueryString = AssetTransformer.PAssetFindQueryStringTransformer(payload);

    const fetchOption = new FetchOptionFactory({
      apiName: this.FindMany.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: parseQueryString,
    });

    return await ofetch<PaginationBase<VAsset>>(API_URL, fetchOption);
  }

  public static async Find(id: Id): Promise<GeneralResponse<VAsset>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VAsset>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Create(payload: PAsset): Promise<GeneralResponse<VAsset>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Create.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'POST',
    });

    return await ofetch<GeneralResponse<VAsset>>(API_URL, fetchOption);
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VAsset>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Delete.name,
      apiType: 'INTERNAL',
      method: 'DELETE',
    });

    return await ofetch<GeneralResponse<VAsset>>(`${API_URL}/${id}`, fetchOption);
  }

  public static async Update(payload: PAsset, id: MAsset['id']): Promise<GeneralResponse<VAsset>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VAsset>>(`${API_URL}/${id}`, fetchOption);
  }
}
