'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer } from '@/transformer';
import { FPlace, GeneralResponse, Id, MPlace, MPlatform, PaginationBase, PFindPagination, VPlace } from '@/types';

@backendImplements()
export abstract class PlatformFetcher {
  public static async FindAll(): Promise<GeneralResponse<VPlace[]>> {
    const res = await fetch('/api/setting/platforms');

    const data = (await res.json()) as GeneralResponse<VPlace[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/platforms' + id);

    const data = (await res.json()) as GeneralResponse<VPlace>;

    return data;
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<MPlatform>> {
    const res = await fetch(
      '/api/setting/platforms?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MPlatform>;

    return data;
  }

  public static async Create(payload: FPlace): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/platforms', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/platforms/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Update(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/platforms/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }
}
