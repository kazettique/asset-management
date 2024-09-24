'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer } from '@/transformer';
import { FCategory, GeneralResponse, Id, MCategory, PaginationBase, PFindPagination, VCategory } from '@/types';

@backendImplements()
export abstract class CategoryFetcher {
  public static async FindAll(): Promise<GeneralResponse<VCategory[]>> {
    const res = await fetch('/api/setting/categories');

    const data = (await res.json()) as GeneralResponse<VCategory[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/categories/' + id);

    const data = (await res.json()) as GeneralResponse<VCategory>;

    return data;
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<MCategory>> {
    const res = await fetch(
      '/api/setting/categories?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MCategory>;

    return data;
  }

  public static async Create(payload: FCategory): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/categories', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/categories/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async Update(payload: FCategory, id: MCategory['id']): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/categories/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }
}
