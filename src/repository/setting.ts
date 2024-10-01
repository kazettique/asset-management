import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { DSetting, MSetting, NType } from '@/types';

const queryObj: Prisma.SettingSelect = {
  id: true,
  key: true,
  value: true,
};

const sortObj: Prisma.SettingOrderByWithRelationInput[] = [{ key: Prisma.SortOrder.asc }];

export abstract class SettingRepository {
  public static async FindAll(): Promise<DSetting[]> {
    return await prisma.setting.findMany({
      orderBy: sortObj,
      select: queryObj,
    });
  }

  public static async FindById(id: DSetting['id']): Promise<NType<DSetting>> {
    return await prisma.setting.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindByKey(key: DSetting['key']): Promise<NType<DSetting>> {
    return await prisma.setting.findUnique({
      select: queryObj,
      where: { key },
    });
  }

  public static async Update<T extends MSetting>(id: T['id'], value: T['value']): Promise<DSetting> {
    return await prisma.setting.update({
      data: { value },
      select: queryObj,
      where: { id },
    });
  }
}
