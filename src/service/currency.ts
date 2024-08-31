import { backendImplements } from '@/decorator';
import { CurrencyRepository } from '@/repository';
import { Id, MCurrency, NType, RCurrency } from '@/types';

@backendImplements()
export abstract class CurrencyService {
  public static async FindAll(): Promise<MCurrency[]> {
    return await CurrencyRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MCurrency>> {
    return await CurrencyRepository.Find(id);
  }

  public static async Create(payload: RCurrency): Promise<MCurrency> {
    return await CurrencyRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MCurrency> {
    return await CurrencyRepository.Delete(id);
  }

  public static async Update(payload: RCurrency, id: MCurrency['id']): Promise<MCurrency> {
    return await CurrencyRepository.Update(payload, id);
  }
}
