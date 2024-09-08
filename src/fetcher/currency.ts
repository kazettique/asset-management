'use client';

import { Prisma } from '@prisma/client';

import { backendImplements } from '@/decorator';
import { FCurrency, GeneralResponse, Id, MCurrency, VCurrency } from '@/types';

@backendImplements()
export abstract class CurrencyFetcher {
  public static async FindAll(): Promise<GeneralResponse<VCurrency[]>> {
    const res = await fetch('/api/setting/currencies');

    const data = (await res.json()) as GeneralResponse<VCurrency[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/setting/currencies/' + id);

    const data = (await res.json()) as GeneralResponse<VCurrency>;

    return data;
  }

  public static async Create(payload: FCurrency): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/setting/currencies', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/setting/currencies/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }

  public static async Update(payload: FCurrency, id: MCurrency['id']): Promise<GeneralResponse<VCurrency>> {
    const res = await fetch('/api/setting/currencies/' + id, {
      body: JSON.stringify(payload),
      method: 'PUT',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VCurrency>>;

    return data;
  }
}
