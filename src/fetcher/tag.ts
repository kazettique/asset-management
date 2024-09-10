'use client';

import { backendImplements } from '@/decorator';
import { FTag, GeneralResponse, Id, MTag, VTag } from '@/types';

@backendImplements()
export abstract class TagFetcher {
  public static async FindAll(): Promise<GeneralResponse<VTag[]>> {
    const res = await fetch('/api/setting/tags');

    const data = (await res.json()) as GeneralResponse<VTag[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VTag>> {
    const res = await fetch('/api/setting/tags' + id);

    const data = (await res.json()) as GeneralResponse<VTag>;

    return data;
  }

  public static async Create(payload: FTag): Promise<GeneralResponse<VTag>> {
    const res = await fetch('/api/setting/tags', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VTag>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VTag>> {
    const res = await fetch('/api/setting/tags/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VTag>>;

    return data;
  }

  public static async Update(payload: FTag, id: MTag['id']): Promise<GeneralResponse<VTag>> {
    const res = await fetch('/api/setting/tags/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VTag>>;

    return data;
  }
}
