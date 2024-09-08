'use client';

import { backendImplements } from '@/decorator';
import { FPlace, GeneralResponse, Id, MPlace, VPlace } from '@/types';

@backendImplements()
export abstract class PlaceFetcher {
  public static async FindAll(): Promise<GeneralResponse<VPlace[]>> {
    const res = await fetch('/api/setting/place');

    const data = (await res.json()) as GeneralResponse<VPlace[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places' + id);

    const data = (await res.json()) as GeneralResponse<VPlace>;

    return data;
  }

  public static async Create(payload: FPlace): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/place', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async Update(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/setting/places' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }
}
