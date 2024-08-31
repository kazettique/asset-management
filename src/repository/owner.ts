import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { OwnerTransformer } from '@/transformer';
import { DOwner, Id, MOwner, NType, POwner } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class OwnerRepository {
  public static async FindAll(): Promise<MOwner[]> {
    const rawData: DOwner[] = await db.owner.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((owner) => OwnerTransformer.DMOwnerTransformer(owner));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    const rawData: NType<DOwner> = await db.owner.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return OwnerTransformer.DMOwnerTransformer(rawData);
    }
  }

  public static async Create(payload: POwner): Promise<MOwner> {
    const rawData = await db.owner.create({
      data: payload,
      select: queryObj,
    });

    return OwnerTransformer.DMOwnerTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    const rawData = await db.owner.delete({
      select: queryObj,
      where: { id },
    });

    return OwnerTransformer.DMOwnerTransformer(rawData);
  }

  public static async Update(payload: POwner, id: MOwner['id']): Promise<MOwner> {
    const rawData = await db.owner.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return OwnerTransformer.DMOwnerTransformer(rawData);
  }
}
