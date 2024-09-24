'use client';

import { backendImplements } from '@/decorator';
import { CommonTransformer, MethodTransformer } from '@/transformer';
import { FMethod, GeneralResponse, Id, MMethod, PaginationBase, PMethodFind, VMethod } from '@/types';

@backendImplements()
export abstract class MethodFetcher {
  public static async FindAll(): Promise<GeneralResponse<VMethod[]>> {
    const res = await fetch('/api/setting/methods');

    const data = (await res.json()) as GeneralResponse<VMethod[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/methods/' + id);

    const data = (await res.json()) as GeneralResponse<VMethod>;

    return data;
  }

  public static async FindMany(payload: PMethodFind): Promise<PaginationBase<MMethod>> {
    const res = await fetch(
      '/api/setting/methods?' +
        new URLSearchParams(CommonTransformer.PFindPaginationQueryStringTransformer(payload)).toString(),
    );

    const data = (await res.json()) as PaginationBase<MMethod>;

    return data;
  }

  public static async Create(payload: FMethod): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/methods', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/methods/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async Update(payload: FMethod, id: MMethod['id']): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/methods/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }
}
