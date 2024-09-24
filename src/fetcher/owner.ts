'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer } from '@/transformer';
import { FOwner, GeneralResponse, Id, MOwner, PaginationBase, PFindPagination, VOwner } from '@/types';

@backendImplements()
export abstract class OwnerFetcher {
  public static async FindAll(): Promise<GeneralResponse<VOwner[]>> {
    const res = await fetch('/api/setting/owners');

    const data = (await res.json()) as GeneralResponse<VOwner[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owners/' + id);

    const data = (await res.json()) as GeneralResponse<VOwner>;

    return data;
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<MOwner>> {
    const res = await fetch(
      '/api/setting/owners?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MOwner>;

    return data;
  }

  public static async Create(payload: FOwner): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owners', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owners/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async Update(payload: FOwner, id: MOwner['id']): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owners/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }
}
