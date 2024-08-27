'use client';

import { FPlace, GeneralResponse, Id, MPlace, VPlace } from '@/types';

export abstract class PlaceFetcher {
  public static async getAllPlace(): Promise<GeneralResponse<VPlace[]>> {
    const res = await fetch('/api/place');

    const data = (await res.json()) as GeneralResponse<VPlace[]>;

    return data;
  }

  public static async createPlace(payload: FPlace): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/place', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async deletePlace(id: Id): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/place/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }

  public static async updatePlace(payload: FPlace, id: MPlace['id']): Promise<GeneralResponse<VPlace>> {
    const res = await fetch('/api/place/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VPlace>>;

    return data;
  }
}
