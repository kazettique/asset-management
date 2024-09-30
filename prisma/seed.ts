import { PrismaClient } from '@prisma/client';

import {
  BrandConstant,
  CategoryConstant,
  MethodConstant,
  OwnerConstant,
  PlaceConstant,
  PlatformConstant,
  SettingConstant,
} from '@/constant';
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.brand.upsert({
      create: BrandConstant.DEFAULT_BRAND,
      update: {},
      where: {
        name: BrandConstant.DEFAULT_BRAND.name,
      },
    }),
    prisma.category.upsert({
      create: CategoryConstant.DEFAULT_CATEGORY,
      update: {},
      where: {
        name: CategoryConstant.DEFAULT_CATEGORY.name,
      },
    }),
    prisma.method.upsert({
      create: MethodConstant.DEFAULT_METHOD,
      update: {},
      where: {
        name: MethodConstant.DEFAULT_METHOD.name,
      },
    }),
    prisma.owner.upsert({
      create: OwnerConstant.DEFAULT_OWNER,
      update: {},
      where: {
        name: OwnerConstant.DEFAULT_OWNER.name,
      },
    }),
    prisma.place.upsert({
      create: PlaceConstant.DEFAULT_PLACE,
      update: {},
      where: {
        name: PlaceConstant.DEFAULT_PLACE.name,
      },
    }),
    prisma.platform.upsert({
      create: PlatformConstant.DEFAULT_PLATFORM,
      update: {},
      where: {
        name: PlatformConstant.DEFAULT_PLATFORM.name,
      },
    }),
    prisma.setting.upsert({
      create: SettingConstant.DEFAULT_M_SETTING_DISPLAY_FOREX,
      update: {},
      where: {
        key: SettingConstant.DEFAULT_M_SETTING_DISPLAY_FOREX.key,
      },
    }),
    prisma.setting.upsert({
      create: SettingConstant.DEFAULT_M_SETTING_CURRENCY_OPTION_LIST,
      update: {},
      where: {
        key: SettingConstant.DEFAULT_M_SETTING_CURRENCY_OPTION_LIST.key,
      },
    }),
    prisma.setting.upsert({
      create: SettingConstant.DEFAULT_M_SETTING_SHOW_CENSOR_ASSET,
      update: {},
      where: {
        key: SettingConstant.DEFAULT_M_SETTING_SHOW_CENSOR_ASSET.key,
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
