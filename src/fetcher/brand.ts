'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer } from '@/transformer';
import { FBrand, GeneralResponse, Id, MBrand, PaginationBase, PFindPagination, VBrand } from '@/types';

@backendImplements()
export abstract class BrandFetcher {
  public static async FindAll(): Promise<GeneralResponse<VBrand[]>> {
    const res = await fetch('/api/setting/brands');

    const data = (await res.json()) as GeneralResponse<VBrand[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brands' + id);

    const data = (await res.json()) as GeneralResponse<VBrand>;

    return data;
  }

  public static async FindMany(payload: PFindPagination): Promise<PaginationBase<MBrand>> {
    const res = await fetch(
      '/api/setting/brands?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MBrand>;

    return data;
  }

  public static async Create(payload: FBrand): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brands', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brands/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async Update(payload: FBrand, id: MBrand['id']): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brands/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }
}
