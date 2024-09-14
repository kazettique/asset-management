import { CurrencyRepository } from '@/repository';
import { Id, MCurrency, NString, NType } from '@/types';

export abstract class CurrencyService {
  public static async FindAll(): Promise<MCurrency[]> {
    return await CurrencyRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MCurrency>> {
    return await CurrencyRepository.Find(id);
  }

  public static async Create(name: string, display: string, symbol: string, comment: NString): Promise<MCurrency> {
    return await CurrencyRepository.Create(name, display, symbol, comment);
  }

  public static async Delete(id: Id): Promise<MCurrency> {
    return await CurrencyRepository.Delete(id);
  }

  public static async Update(
    id: MCurrency['id'],
    name: string,
    display: string,
    symbol: string,
    comment: NString,
  ): Promise<MCurrency> {
    return await CurrencyRepository.Update(id, name, display, symbol, comment);
  }
}
