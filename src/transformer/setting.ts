import { MethodType } from '@prisma/client';

import { DSetting, FSettingOptions, MCurrency, MSetting, Name, VSetting } from '@/types';

import { BrandTransformer } from './brand';
import { CategoryTransformer } from './category';
import { CurrencyTransformer } from './currency';
import { MethodTransformer } from './method';
import { OwnerTransformer } from './owner';
import { PlaceTransformer } from './place';

export abstract class SettingTransformer {
  public static DMSettingTransformer(src: DSetting): MSetting {
    return {
      brands: src.brands.map((item) => BrandTransformer.DMBrandTransformer(item)),
      categories: src.categories.map((item) => CategoryTransformer.DMCategoryTransformer(item)),
      currencies: src.currencies.map((item) => CurrencyTransformer.DMCurrencyTransformer(item)),
      methods: src.methods.map((item) => MethodTransformer.DMMethodTransformer(item)),
      owners: src.owners.map((item) => OwnerTransformer.DMOwnerTransformer(item)),
      places: src.places.map((item) => PlaceTransformer.DMPlaceTransformer(item)),
    };
  }

  public static MVSettingTransformer(src: MSetting): VSetting {
    return {
      brands: src.brands,
      categories: src.categories,
      currencies: src.currencies,
      endMethods: src.methods.filter((item) => item.type === MethodType.END),
      owners: src.owners,
      places: src.places,
      startMethods: src.methods.filter((item) => item.type === MethodType.START),
    };
  }

  public static FSettingOptionsTransformer(src: VSetting): FSettingOptions {
    // TODO: need stricter typing
    const parseName = (name: Name): string =>
      Object.values(name)
        .filter((item) => item.length > 0)
        .join('|');

    const parseCurrency = (currency: MCurrency) => `(${currency.display})${currency.symbol}`;

    return {
      brands: src.brands.map((item) => ({ label: parseName(item.name), value: item.id })),
      categories: src.categories.map((item) => ({ label: parseName(item.name), value: item.id })),
      currencies: src.currencies.map((item) => ({ label: parseCurrency(item), value: item.id })),
      endMethods: src.endMethods.map((item) => ({ label: parseName(item.name), value: item.id })),
      owners: src.owners.map((item) => ({ label: parseName(item.name), value: item.id })),
      places: src.places.map((item) => ({ label: parseName(item.name), value: item.id })),
      startMethods: src.startMethods.map((item) => ({ label: parseName(item.name), value: item.id })),
    };
  }
}
