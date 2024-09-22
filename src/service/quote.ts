import { QuoteRepository } from '@/repository';
import { Id, MQuote, NType } from '@/types';

export abstract class QuoteService {
  public static async FindAll(): Promise<MQuote[]> {
    return await QuoteRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MQuote>> {
    return await QuoteRepository.Find(id);
  }

  public static async FindRandom(): Promise<MQuote> {
    return await QuoteRepository.FindRandom();
  }

  public static async Create(quote: string, author: string): Promise<MQuote> {
    return await QuoteRepository.Create(quote, author);
  }

  public static async Delete(id: Id): Promise<MQuote> {
    return await QuoteRepository.Delete(id);
  }

  public static async Update(id: MQuote['id'], quote: string, author: string): Promise<MQuote> {
    return await QuoteRepository.Update(id, quote, author);
  }
}
