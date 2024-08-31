import { backendImplements } from '@/decorator';
import { TagRepository } from '@/repository';
import { Id, MTag, NType, PTag } from '@/types';

@backendImplements()
export abstract class TagService {
  public static async FindAll(): Promise<MTag[]> {
    return await TagRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MTag>> {
    return await TagRepository.Find(id);
  }

  public static async Create(payload: PTag): Promise<MTag> {
    return await TagRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MTag> {
    return await TagRepository.Delete(id);
  }

  public static async Update(payload: PTag, id: MTag['id']): Promise<MTag> {
    return await TagRepository.Update(payload, id);
  }
}
