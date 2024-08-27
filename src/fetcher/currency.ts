'use client';

import { FCurrency, GeneralResponse, Id, MCurrency, VCurrency } from '@/types';

export abstract class CurrencyFetcher {
  public static async getAll(): Promise<GeneralResponse<VCurrency[]>> {
    const res = await fetch('/api/currency');

    const data = (await res.json()) as GeneralResponse<VCurrency[]>;

    return data;
  }

  public static async create(payload: FCurrency): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/currency', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }

  public static async delete(id: Id): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/currency/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }

  public static async update(payload: FCurrency, id: MCurrency['id']): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/currency/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }
}
