'use client';

import { backendImplements } from '@/decorator';
import { GeneralResponse, Id, MAsset, RAsset, VAsset } from '@/types';

@backendImplements()
export abstract class AssetFetcher {
  public static async FindAll(): Promise<GeneralResponse<VAsset[]>> {
    const res = await fetch('/api/asset');

    const data = (await res.json()) as GeneralResponse<VAsset[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset/' + id);

    const data = (await res.json()) as GeneralResponse<VAsset>;

    return data;
  }

  public static async Create(payload: RAsset): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }

  public static async Update(payload: RAsset, id: MAsset['id']): Promise<GeneralResponse<VAsset>> {
    const res = await fetch('/api/asset/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VAsset>>;

    return data;
  }
}
