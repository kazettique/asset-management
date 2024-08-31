import { backendImplements } from '@/decorator';
import { MethodRepository } from '@/repository';
import { Id, MMethod, NType, RMethod } from '@/types';

@backendImplements()
export abstract class MethodService {
  public static async FindAll(): Promise<MMethod[]> {
    return await MethodRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MMethod>> {
    return await MethodRepository.Find(id);
  }

  public static async Create(payload: RMethod): Promise<MMethod> {
    return await MethodRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MMethod> {
    return await MethodRepository.Delete(id);
  }

  public static async Update(payload: RMethod, id: MMethod['id']): Promise<MMethod> {
    return await MethodRepository.Update(payload, id);
  }
}
