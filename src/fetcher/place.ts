'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer } from '@/transformer';
import { FPlace, GeneralResponse, Id, MPlace, PaginationBase, PFindPagination, VPlace } from '@/types';

@backendImplements()
export abstract class PlaceFetcher {
  public static async FindAll(): Promise<GeneralResponse<VPlace[]>> {
    const res = await fetch('/api/setting/places');

    const data = (await res.json()) as GeneralResponse<VPlace[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places' + id);

    const data = (await res.json()) as GeneralResponse<VPlace>;

    return data;
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<MPlace>> {
    const res = await fetch(
      '/api/setting/places?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MPlace>;

    return data;
  }

  public static async Create(payload: FPlace): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Update(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }
}
