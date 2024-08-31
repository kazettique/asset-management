import { CurrencyRepository } from '@/repository';
import { Id, MCurrency, NType, RCurrency } from '@/types';

export abstract class CurrencyService {
  public static async getAll(): Promise<MCurrency[]> {
    return await CurrencyRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MCurrency>> {
    return await CurrencyRepository.get(id);
  }

  public static async create(payload: RCurrency): Promise<MCurrency> {
    return await CurrencyRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MCurrency> {
    return await CurrencyRepository.delete(id);
  }

  public static async update(payload: RCurrency, id: MCurrency['id']): Promise<MCurrency> {
    return await CurrencyRepository.update(payload, id);
  }
}
