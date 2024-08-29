'use client';

import { GeneralResponse, Id, MAsset, RAsset, VAsset } from '@/types';

export abstract class AssetFetcher {
  public static async getAll(): Promise<GeneralResponse<VAsset[]>> {
    const res = await fetch('/api/asset');

    const data = (await res.json()) as GeneralResponse<VAsset[]>;

    return data;
  }

  public static async create(payload: RAsset): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async delete(id: Id): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async update(payload: RAsset, id: MAsset['id']): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }
}
