'use client';

import { Prisma } from '@prisma/client';

import { backendImplements } from '@/decorator';
import { GeneralResponse, Id, MAsset, PaginationBase, PAsset, PAssetFind, VAsset } from '@/types';

@backendImplements()
export abstract class AssetFetcher {
  public static async FindAll(): Promise<GeneralResponse<VAsset[]>> {
    const res = await fetch('/api/assets');

    const data = (await res.json()) as GeneralResponse<VAsset[]>;

    return data;
  }

  public static async FindMany(payload: PAssetFind): Promise<PaginationBase<MAsset>> {
    const res = await fetch(
      '/api/assets?' +
        new URLSearchParams({ page: String(payload.page), pageSize: String(payload.pageSize) }).toString(),
    );

    const data = (await res.json()) as PaginationBase<MAsset>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/assets/' + id);

    const data = (await res.json()) as GeneralResponse<VAsset>;

    return data;
  }

  public static async Create(payload: PAsset): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/assets', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/assets/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async Update(payload: PAsset, id: MAsset['id']): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/assets/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }
}
