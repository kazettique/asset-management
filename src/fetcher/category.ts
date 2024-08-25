'use client';

import { GeneralResponse, MCategory, RCreateCategory, VCategory } from '@/type';

export abstract class CategoryFetcher {
  public static async getAllCategory(): Promise<GeneralResponse<VCategory[]>> {
    const res = await fetch('/api/category');

    const data = (await res.json()) as GeneralResponse<VCategory[]>;

    return data;
  }

  public static async createCategory(payload: RCreateCategory): Promise<GeneralResponse<any>> {
    const res = await fetch('/api/category', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<any>>;

    return data;
  }
}
