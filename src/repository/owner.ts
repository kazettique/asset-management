import { db } from '@/lib/db';
import { OwnerTransformer } from '@/transformer';
import { DOwner, Id, MOwner, NType, ROwner } from '@/types';

export abstract class OwnerRepository {
  public static async getAll(): Promise<MOwner[]> {
    const rawData: DOwner[] = await db.owner.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    const parsedData = rawData.map((owner) => OwnerTransformer.DOwnerTransformer(owner));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MOwner>> {
    const rawData: NType<DOwner> = await db.owner.findUnique({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return OwnerTransformer.DOwnerTransformer(rawData);
    }
  }

  public static async create(payload: ROwner): Promise<MOwner> {
    const rawData = await db.owner.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    return OwnerTransformer.DOwnerTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MOwner> {
    const rawData = await db.owner.delete({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return OwnerTransformer.DOwnerTransformer(rawData);
  }

  public static async update(payload: ROwner, id: MOwner['id']): Promise<MOwner> {
    const rawData = await db.owner.update({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return OwnerTransformer.DOwnerTransformer(rawData);
  }
}
